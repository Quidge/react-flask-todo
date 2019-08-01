from flask import jsonify

from . import bp
from ..db import get_db
from .errors import InvalidUsage


@bp.errorhandler(InvalidUsage)
def handle_invalid_usage(err):
  res = jsonify(err.to_dict())
  res.status_code = err.status_code
  return res


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
    res_dict_list.append(dict(zip(keys, row_vals)))
  return jsonify({"tasks": res_dict_list})


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




