# reference: http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

# Pattern stolen from https://flask.palletsprojects.com/en/1.1.x/patterns/apierrors/?highlight=error

from . import bp


class InvalidUsage(Exception):
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
        self.status_code = status_code
    self.payload = payload

  def to_dict(self):
    rv = dict(self.payload or ())
    rv['message'] = self.message
    rv['status_code'] = self.status_code
    return {"error": rv}


class InvalidMediaType(InvalidUsage):
  status_code = 415
  default_message = 'Unsupported Media Type'

  def __init__(self, message=default_message, payload=None):
    self.message = message
    super().__init__(
      self.message, status_code=InvalidMediaType.status_code, payload=payload)

  # def __init__(self, message=None, status_code=None, payload=None):
  #   InvalidUsage.__init__(self, message=self.message, status_code=self.status_code, payload=self.payload)
  #   if self.message is 

# class NotFound(Exception):
#   status_code

