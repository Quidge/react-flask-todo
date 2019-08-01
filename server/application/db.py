import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext

from .utils import create_n_tasks


def get_db():
  if 'db' not in g:
    g.db = sqlite3.connect(
      current_app.config['DATABASE'],
      detect_types=sqlite3.PARSE_DECLTYPES
    )
    g.db.row_factory = sqlite3.Row

  return g.db


# I don't understand what the purpose of e=None is here
# I get a TypeError: close_db() takes 0 positional arguments but 1 was given
# error msg if I don't have it, but as written the function never uses `e` anyways
def close_db(e=None):
  db = g.pop('db', None)

  if db is not None:
    db.close()


def init_db():
  db = get_db()

  # open resource works relative to the current instance. handy.
  with current_app.open_resource('schema.sql') as f:
    db.executescript(f.read().decode('utf8'))


@click.command('init-db')
@with_appcontext
def init_db_command():
  """Clear the existing data and create new tables."""
  init_db()
  click.echo('Initialized the database.')


@click.command('fill-db')
@click.argument('qty')
@with_appcontext
def fill_db(qty):
  qty = int(qty)
  click.echo('Wiping old db')
  init_db()
  click.echo('Initialized the db.')
  click.echo('Inserting {} random tasks into db.'.format(qty))
  conn = get_db()
  c = conn.cursor()
  for t in create_n_tasks(qty):
    c.execute('''
      INSERT INTO task (task_title, task_description, task_order, task_complete)
      VALUES ('{title}', '{desc}', '{order}', '{complete}')'''.format(
        title=t["task_title"],
        desc=t["task_description"],
        order=t["task_order"],
        complete=t["task_complete"])
    )
  conn.commit()
  click.echo('Tasks inserted.')


def init_app(app):
  app.teardown_appcontext(close_db)
  app.cli.add_command(init_db_command)
  app.cli.add_command(fill_db)
