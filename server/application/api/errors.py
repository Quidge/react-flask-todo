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
    return {"error": rv}


# class NotFound(Exception):
#   status_code