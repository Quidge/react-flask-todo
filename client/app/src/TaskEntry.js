import React from 'react';
import styled from 'styled-components'

const StyledTaskEntry = styled.div`
  font-size: 1.5em;
  display: flex;
  align-items: center;
  background-color: white;
  min-height: 2.5em;
  // margin-bottom: 8px;
  border-bottom: 1px solid #161F2A;
  border-top: 1px solid #4E5D71;
`

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
    this.setState({
      task_complete: e.target.checked
    })
  }
  async changeTitle() {}
  async changeDesc() {}

  render() {
    return (
      <StyledTaskEntry>
        <input
          type="checkbox"
          className="taskComplete"
          checked={this.state.task_complete}
          onChange={this.toggleTaskComplete}
          />
        <label class="taskTitle"
        >{this.state.task_title}</label>
      </StyledTaskEntry>
    )
  }
}
