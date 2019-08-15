# React-Flask-Todo

This is a toy Todo project. The create-react-app frontend connects to a Flask REST API.

### To install:
```shell
git clone https://github.com/Quidge/react-flask-todo.git
cd react-flask-todo
bash setup.sh
```
This will:
- Install the python modules used in the server.
- Create a venv at `react-flask-todo/venv`.
- (Create and) populate a sqlite database with 5 randomly generated tasks.
- Install the npm packages used in the frontend

### Starting the React and Flask servers:
**(Be sure to have two separate shells available. One for the React server and the other for the Flask API)**

#### To start the API server
**(Make sure to start in the project directory: `react-flask-todo`)**
```shell
cd server
source venv/bin/activate
env FLASK_APP=application
flask run
```
This will start the Flask server running in your current shell.

#### To start the React app:
**(In a separate shell, starting from `react-flask-todo`)**
```shell
cd client/app
npm start
```
This will start the React server running in your (other) shell.


