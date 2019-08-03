import json
import sqlite3

from flask import jsonify, request, url_for, abort

from . import bp
from ..db import get_db
from .errors import InvalidUsage, InvalidMediaType, MissingParam


def make_public_task(task):
  new_task = {}
  for field in task:
    if field == 'task_id':
      new_task['uri'] = url_for(
        '.get_task', task_id=task['task_id'], _external=True)
    else:
      new_task[field] = task[field]

  return new_task


# Register error handlers
@bp.errorhandler(InvalidMediaType)
@bp.errorhandler(MissingParam)
@bp.errorhandler(InvalidUsage)
def handle_invalid_usage(err):
  return jsonify(err.to_dict())


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
  # print(request.is_json)
  # print(request.get_json(force=False, silent=False, cache=False))

  # print(request.data)
  # print(request.headers)
  if not request.is_json or 'title' not in request.get_json():
    abort(400)

  r_payload = request.get_json()

  conn = get_db()
  c = conn.cursor()

  c.execute("""
    INSERT INTO task (task_title, task_description, task_complete)
    VALUES ("{title}", "{desc}", {complete})""".format(
      title=r_payload['title'],
      desc=r_payload.get('description', ''),
      complete=False
      )
  )

  conn.commit()

  # Get the task ID to pass back for a Location header resp
  db_res = c.execute('SELECT task_id, task_title, task_description, task_complete FROM task WHERE task_title="%s"' % (r_payload['title']))
  res = db_res.fetchone()
  task_dict = dict(zip([h[0] for h in db_res.description], res))
  public_task_dict = make_public_task(task_dict)
  return jsonify(public_task_dict)


@bp.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
  conn = get_db()
  c = conn.cursor()
  task = c.execute('SELECT * FROM task WHERE task_id=%s' % (task_id,))
  keys = [col_header[0] for col_header in task.description]
  res = task.fetchone()
  if res is None:
    raise InvalidUsage('Cannot locate task with ID=%s.' % (task_id,), status_code=404)
  else:
    return jsonify({'task': dict(zip(keys, [col for col in res]))})


@bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
  if not request.is_json:
    raise InvalidMediaType

  if 'id' not in request.get_json():
    raise MissingParam(missing_param='id')
  try:
    int(request.get_json()['id'])
  except ValueError:
    raise InvalidUsage('Invalid \'id\'')

    # return jsonify(InvalidUsage(message='Invalid \'id\'.').to_dict())



  # conn = get_db()
  # c = conn.cursor()
  # try:
  #   c.execute()



