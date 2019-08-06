import React from 'react';
import TaskEntry from './TaskEntry';

export default class TaskList extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };
  state = {
    tasks: []
  }
  componentDidMount() {
    this.getTasks()
  }

  getTasks = async () => {
    let res = await fetch('/api/tasks')
    let { tasks } = await res.json()
    console.log(tasks)
    this.setState({tasks: tasks})
  }

  render() {
    return (
      <div>
        {this.state.tasks.map(task => (
          <TaskEntry key={task.task.task_uri} task={task.task}/>
          ))}
      </div>
    );
  }
}
