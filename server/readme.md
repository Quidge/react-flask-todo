# Flask API

### API
#### REST design
I decided to forego a `DELETE` method for `/tasks` or `/tasks/id`. Instead, tasks can be archived and all tasks, archived or not, are still provided upon `GET`s. The client decides what to do with the archived tasks. I took this approach after noticing that Trello doesn't seem to encourage task deletion and even goes as far to offer an Undo for nearly everything (which I'd like to look into replicating!).

As closely as possible, I tried to emulate the table of method responsibilities [described in this Microsoft article](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design#define-operations-in-terms-of-http-methods). Likewise, I try to have all endpoints returning appropriate error messages for methods used.
#### `/tasks`
- Modeled as a collection
#### `/tasks/<task_id>`
- Modeled as a resource

#### Blueprints
I decided to register the all API related functionality in a blueprint. I think this makes the most sense because it's easily namespaced. Were I more forward thinking, I would version the blueprint name and containing `api` package to something like `apiV1` to avoid future headaches.

### Schema
- A `task_description` field exists on each task but is unused by the client.

### Scripts
- `init-db` wipes the old db and reapplies the schema in `schema.sql`.
- `fill-db <qty>` runs `init-db` and uses [Faker](https://pypi.org/project/Faker/) to generate `<qty>` tasks with randomized completion status, titles, and descriptions (they are all unarchived, however).

### Else
- `make_public_task(task)` returns a dict of the task that's presentable for responses. This entails boolean coercion from the integer 1s and 0s in the db (sqlite uses integers for bool values) and converting `task_id` to a unique URI keyed as `task_uri`. In the future `make_public_task()` may mask certain attributes that shouldn't be given to the client.
