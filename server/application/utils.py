# from sqlite3 import Row
from faker import Faker
from random import randint


def create_n_tasks(qty):
  """Returns a list of :qty: Tasks.
  Task title, description, and completion status are randomized."""
  tasks = []
  for i in range(qty):

    # Get the title
    faked = Faker().text().split()
    while len(faked) < 5:
      faked = Faker().text().split()

    num_words_in_title = randint(2, 5)
    f_title = " ".join(faked[:num_words_in_title])

    # Get the description
    faked = Faker().text().split()
    while len(faked) < 15:
      faked = Faker().text().split()

    num_words_in_description = randint(6, 15)
    f_desc = " ".join(faked[:num_words_in_description])
    t = {
      "task_title":f_title,
      "task_description": f_desc,
      "task_order": i+1,
      "task_complete": bool(randint(0, 1))
    }
    tasks.append(t)

  return tasks