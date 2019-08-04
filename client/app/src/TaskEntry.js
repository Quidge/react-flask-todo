import React from 'react';

export default class TaskEntry extends React.Component {
  // static propTypes = {
  //   name: React.PropTypes.string,
  // };
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.task
    }
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this)
  }
  toggleTaskComplete(e) {
    e.preventDefault();
    this.setState((prevState, _) => ({task_complete: !prevState.task_complete})
    )
  }
  async changeTitle() {

  }
  async changeDesc() {

  }

  render() {
    // let task = this.props.task
    // let textDec = task.task_complete ? `line-through`: `none`
    let completeStyles = this.state.task_complete ? {textDecoration: `line-through`, color: `#4E5D71`} : {}

    return (
      <div onClick={this.toggleTaskComplete} style={completeStyles}>
      {this.state.task_title}
      </div>
    );
  }
}
