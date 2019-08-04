import React from 'react';
import TaskEntry from './TaskEntry';

export default class TaskList extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };

  // markCompleted = (task_uri) => {

  // }

  render() {
    let tasks = this.props.tasks.tasks
    console.log(this.props.tasks)
    console.log(tasks)
    return (
      <div>
        {tasks.map(task => (
          <TaskEntry key={task.task.task_uri} task={task.task}/>
          ))}
      </div>
    );
  }
}
