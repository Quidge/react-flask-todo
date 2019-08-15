# React-Flask-Todo

This is a toy Todo project. The create-react-app frontend connects to a Flask REST API.

<img src="/exampleuse2019-08-15.gif?raw=true" width="450">

### More information specific to the client and server can be found at `react-flask-todo/client/readme.md` and `react-flask-todo/server/readme.md` respectively.

### The app uses the following concepts/technologies:
- a REST API with vanilla Flask routing
- styled-components (I appreciate CSS super close to JS)
- basic create-react-app


### To install:
```shell
git clone https://github.com/Quidge/react-flask-todo.git
cd react-flask-todo
bash setup.sh
```
This will:
- Create a Python virtual environment at `react-flask-todo/venv`.
- Install the Python modules used by the server into the virtual environment.
- (Create and) populate a sqlite database with 5 randomly generated tasks.
- Install the npm packages used by the frontend.
- Leave you in the `react-flask-todo` directory.

### Starting the React and Flask servers:
**(Be sure to have two separate shells available. One for the React server and the other for the Flask API)**

#### To start the API server
**(Make sure to start in the project directory: `react-flask-todo`)**
```shell
cd server
source venv/bin/activate
env FLASK_APP=application flask run
```
This will start the Flask server running in your current shell. It is listening (and waiting!) for requests on `http://localhost:5000/api/tasks`

#### To start the React app:
**(In a separate shell, starting from `react-flask-todo`)**
```shell
cd client/app
npm start
```
This will start the React server running in your (other) shell. The client site runs at `http://localhost:3000/` It will (probably) automatically open a browser window or tab to that url. You can manually paste that url into your browser otherwise.


