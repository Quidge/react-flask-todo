from sqlite3 import OperationalError
from flask import jsonify, request, url_for

from . import bp
from ..db import get_db
from .errors import InvalidUsage, InvalidMediaType, MissingParam
from ..utils import validate_bool


def make_public_task(task_dict):
  """Creates a public version of a task_dict. task_id is replace with an appropriate URI and task_complete is coerced from a number to a python boolean"""
  new_task = {}
  for key, value in task_dict.items():
    # Switch task_id to task_uri
    if key == 'task_id':
      new_task['task_uri'] = url_for(
        '.get_task', task_id=task_dict['task_id'], _external=True)
    # Switch task_complete from numeric 0/1 to bool True/False
    elif key == 'task_complete':
      new_task['task_complete'] = bool(value)
    elif key == 'task_archived':
      new_task['task_archived'] = bool(value)
    else:
      new_task[key] = task_dict[key]

  return {"task": new_task}


# Register error handlers
@bp.errorhandler(InvalidMediaType)
@bp.errorhandler(MissingParam)
@bp.errorhandler(InvalidUsage)
def handle_invalid_usage(err):
  return jsonify(err.to_dict()), err.status_code


@bp.route('/')
def hello():
  return 'Hello, world!'


@bp.route('/tasks', methods=['GET'])
def get_tasks():
  conn = get_db()
  c = conn.cursor()
  tasks = c.execute('SELECT * FROM task')
  res = tasks.fetchall()
  # Backwards compat means that cursor.description returns a 7-tuple for each col
  # https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.description
  keys = [col_header[0] for col_header in tasks.description]
  res_dict_list = []
  for row_vals in res:
    res_dict_list.append(make_public_task(dict(zip(keys, row_vals))))
  return jsonify({"tasks": res_dict_list})


@bp.route('/tasks', methods=['POST'])
def create_task():
  if not request.is_json:
    raise InvalidMediaType
  if 'task_title' not in request.get_json():
    raise MissingParam(missing_param='task_title')

  r_payload = request.get_json()

  conn = get_db()
  c = conn.cursor()

  c.execute("""
    INSERT INTO task (task_title, task_description, task_complete)
    VALUES ("{title}", "{desc}", {complete})""".format(
      title=r_payload['task_title'],
      desc=r_payload.get('task_description', ''),
      complete=0
      )
  )

  conn.commit()

  # Get the task ID of the Task that was just created; autoincrement will cause the MAX task_id to be the one just created
  db_res = c.execute("""
    SELECT task_id, task_title, task_description, task_complete 
    FROM task WHERE task_id=(
      SELECT MAX(task_id) FROM task
    )"""
  )
  res = db_res.fetchone()
  task_dict = dict(zip([h[0] for h in db_res.description], res))
  return jsonify(make_public_task(task_dict))


@bp.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
  print(task_id)

  conn = get_db()
  c = conn.cursor()
  task = c.execute('SELECT * FROM task WHERE task_id=%s' % (task_id,))
  keys = [col_header[0] for col_header in task.description]
  res = task.fetchone()
  if res is None:
    raise InvalidUsage('Cannot locate task with ID=%s.' % (task_id,), status_code=404)
  else:
    return jsonify(make_public_task(dict(zip(keys, [col for col in res]))))


@bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task_PUT(task_id):
  if not request.is_json:
    raise InvalidMediaType

  # PUT requests should provide ALL attrs, else it should be a PATCH
  source = request.get_json()
  try:
    updated_task = {
      'task_title': source['task_title'],
      'task_description': source['task_description'],
      'task_complete': source['task_complete'],
      'task_archived': source['task_archived'],
    }
  except KeyError as e:
    raise MissingParam(missing_param=str(e))

  # Attempt to validate and cooerce the request value to the correct int
  try:
    updated_task['task_complete'] = int(validate_bool(source['task_complete']))
  except ValueError:
    raise InvalidUsage('Invalid task_complete value')
  try:
    updated_task['task_archived'] = int(validate_bool(source['task_archived']))
  except ValueError:
    raise InvalidUsage('Invalid task_archived value')

  conn = get_db()
  c = conn.cursor()
  task = c.execute('SELECT * FROM task WHERE task_id=%s' % (task_id,))
  if task.fetchone() is None:
    # Create the task that would be updated. PUT should be idempotent.
    return create_task()


  # If we're here, this Task already exists and the request has passed all validation. Push an UPDATE to the Task present in db using values from updated_task.
  try:
    c.execute("""
      UPDATE task
      SET task_title='{title}', task_description='{desc}', task_complete={complete}, task_archived={archived}
      WHERE task_id={id}
      """.format(
        title=updated_task['task_title'],
        desc=updated_task['task_description'],
        complete=updated_task['task_complete'],
        archived=updated_task['task_archived'],
        id=task_id
        )
      )
    conn.commit()
  except OperationalError as e:
    raise InvalidUsage(e.msg)

  return get_task(task_id)


@bp.route('/tasks/<int:task_id>', methods=['PATCH'])
def update_task_PATCH(task_id):
  if not request.is_json:
    raise InvalidMediaType

  source = request.get_json()
  updated_task = {
      'task_title': source.get('task_title', None),
      'task_description': source.get('task_description', None),
      'task_complete': source.get('task_complete', None),
      'task_archived': source.get('task_archived', None),
    }

  if updated_task['task_complete'] is not None:
    # Validate and coerce the task_complete value
    try:
      updated_task['task_complete'] = int(validate_bool(source['task_complete']))
    except ValueError:
      raise InvalidUsage('Invalid task_complete value')

  if updated_task['task_archived'] is not None:
    # Validate and coerce the task_archived value
    try:
      updated_task['task_archived'] = int(validate_bool(source['task_archived']))
    except ValueError:
      raise InvalidUsage('Invalid task_archived value')

  # Determine if this resource exists in the db
  conn = get_db()
  c = conn.cursor()
  task = c.execute('SELECT * FROM task WHERE task_id=%s' % (task_id,))
  res = task.fetchone()

  # Task does not exist so a new one will be created.
  if res is None:
    return create_task()
  else:
    # Yes, this would probably be better as an executemany()
    for key, new_value in updated_task.items():
      try:
        if new_value is not None:
            c.execute(
              """UPDATE task SET '{key}'='{new_value}'
              WHERE task_id={task_id}""".format(
                key=key, new_value=new_value, task_id=task_id))
      except OperationalError:
        raise InvalidUsage

    conn.commit()

  return get_task(task_id)

