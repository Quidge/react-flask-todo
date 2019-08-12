import React from 'react';
import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import TaskEntry from './TaskEntry'

// working with this palette: http://paletton.com/#uid=13E0u0ka-cw7dx8aNlygu83lZ4u
const StyledContainer = styled.div`
  max-width: 500px;
  min-height: 300px;
  max-height: 65vh;
  margin: 100px auto;
  background-color: #dfe1e6;
  color: #090F17;
  box-shadow: 0px 39px 57px -4px black;
`
// box shadow properties:
// [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color];

function clipLocalHost(url) {
  return url.match(/localhost:[0-9]+(.*)/)[1]
}

class App extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };
  constructor(props) {
    super(props)
    this.getTaskDict = this.getTaskDict.bind(this)
    this.state = {
      tasks: {},
      newTaskTitle: ''
    }
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this)
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this)
    this.createNewTask = this.createNewTask.bind(this)
    this.archiveTask = this.archiveTask.bind(this)
  }

  componentDidMount() {
    this.getTaskDict().then(taskDict => this.setState({tasks: taskDict}))
  }

  async getTaskDict() {
    let res = await fetch('/api/tasks')
    let { tasks } = await res.json()
    // turn the tasks array into a dict keyed to each task's task_uri
    let taskDict = tasks.reduce((dict, item) => {
      dict[clipLocalHost(item.task.task_uri)] = item
      return dict
    }, this.state.tasks)
    return taskDict
  }

  handleTaskTitleChange(event) {
    this.setState({newTaskTitle: event.target.value})
  }

  archiveTask(task) {
    // set the fetch payload
    const payload = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify({
        task_archived: !task.task_archived
      })
    }
    // get the key
    const key = clipLocalHost(task.task_uri)
    
    // Fire off to the api
    fetch(key, payload)
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
      })
      .catch(e => {
        // this is an attempt to return early before state updates if
        // the api fails. it doesn't work though.
        alert(e)
        return;
      })

    // making a copy updatedTask is only necessary to prevent further
    // nesting madness. it's possible to continue the ... spread pattern
    // all the way down to task_complete
    let updatedTask = this.state.tasks[key]
    updatedTask.task.task_archived = !updatedTask.task.task_archived
    this.setState(prevState => ({
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [key]: updatedTask
      }
    }))
  }

  toggleTaskComplete(task) {
    // set the fetch payload
    const payload = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify({
        task_complete: !task.task_complete
      })
    }
    // get the key
    const key = clipLocalHost(task.task_uri)
    
    // Fire off to the api
    fetch(key, payload)
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
      })
      .catch(e => {
        // this is an attempt to return early before state updates if
        // the api fails. it doesn't work though.
        alert(e)
        return;
      })

    // making a copy updatedTask is only necessary to prevent further
    // nesting madness. it's possible to continue the ... spread pattern
    // all the way down to task_complete
    let updatedTask = this.state.tasks[key]
    updatedTask.task.task_complete = !updatedTask.task.task_complete
    this.setState(prevState => ({
      ...prevState,
      tasks: {
        ...prevState.tasks,
        [key]: updatedTask
      }
    }))
  }

  createNewTask(event) {
    event.preventDefault()

    // prefill in everything about the task that can be known before the fetch
    const newTask = {
      task: {
        task_title: event.target.children.task_title.value,
        task_complete: false
      }
    }

    // in addition to firing off the task, this will get the URI back
    // from the server
    const payload = {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({
        task_title: newTask.task.task_title
      })
    }
    fetch('/api/tasks', payload)
      .then(res => res.json())
      .then(res => {
        const uri = clipLocalHost(res.task.task_uri)
        newTask.task['task_uri'] = uri
        // add the new task to tasks + reset the newTaskTitle
        this.setState(prevState => ({
          ...prevState,
          tasks: {
            ...prevState.tasks,
            [uri]: newTask
          },
          newTaskTitle: ''
        }))
      })

    alert('A task was created')
  }


  render() {
    let taskEntries = []
    const unarchived = (Object.entries(this.state.tasks)).filter(
      ([_, task]) => {
        return !task.task.task_archived
      })
    for (let [key, task] of unarchived) {
      let entry = (
        <TaskEntry
          task={task.task}
          key={key}
          toggleTaskComplete={this.toggleTaskComplete}
          archiveTask={this.archiveTask}
        />
      )
      taskEntries.push(entry)
    }

    return (
      <StyledContainer>
        <Header
          taskTitle={this.state.newTaskTitle}
          handleSubmit={this.createNewTask}
          handleChange={this.handleTaskTitleChange}
          disabled={!(this.state.newTaskTitle.length > 0)}
        />
        {taskEntries}
        <Footer/>
      </StyledContainer>
    );
  }
}

export default App;
