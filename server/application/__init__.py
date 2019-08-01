import os
from flask import Flask


def create_app(test_config=None):
  application = Flask(__name__, instance_relative_config=True)
  application.config.from_mapping(
    SECRET_KEY='dev',
    DATABASE=os.path.join(application.instance_path, 'application.sqlite')
  )

  if test_config is None:
    application.config.from_pyfile('config.py', silent=True)
  else:
    application.config.from_mapping(test_config)

  # ensure the instance folder exists
  try:
    os.makedirs(application.instance_path)
  except OSError:
    # already exists
    pass

  from . import db
  db.init_app(application)

  from .api import bp as api_bp
  application.register_blueprint(api_bp, url_prefix='/api')


  return application
