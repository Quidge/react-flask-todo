# reference: http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml

# Pattern stolen from https://flask.palletsprojects.com/en/1.1.x/patterns/apierrors/?highlight=error


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


class MissingParam(InvalidUsage):
  status_code = 422
  default_message = 'Unprocessable Entity'

  def __init__(self, message=default_message, missing_param=None, payload=None):
    self.message = message
    if payload is None:
      self.payload = {}

    if missing_param is not None:
      self.payload['missing parameter'] = missing_param

    super().__init__(
      self.message, status_code=MissingParam.status_code, payload=self.payload)
