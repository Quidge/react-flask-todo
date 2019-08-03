# Questions:

### API:
- For a `PUT`, what should be returned if the user provides an ID that _doesn't_ exist and the ID isn't valid?
  - I return a new resource that's created, but the URI for that resource uses my db's autoimcrement scheme; it won't take the arbitrary ID that's given the PUT
    - EX: There are only 15 tasks in the DB, and the task_id is set to autoincrement and is currently only at 15. Client sends `UPDATE` to a task resource of `/api/tasks/200` (doesn't exist but all other fields are valid). ATM I create a new resource with those fields except for using the 200 task_id. The task_id for that resource will be 16 (because of autoincrementing) and the URI generated will be `/api/tasks/16`.
- What is a good return json for a task?
  - `{ "task": { "task_title": "true", ... } }`
  - or flatter?: `{ "task_title": "true", ... }`
  - The former gets repetitive with /tasks
    - `{ "tasks": { "task": { ... }, "task": { ... } } }`

### General:
- Is `application.utils.validate_bool()` a good idea? Is it a good implementation?
