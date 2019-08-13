import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArchiveIcon from './ArchiveIcon';

const StyledTaskEntry = styled.li`
  display: flex;
  align-items: center;
  margin: .3em .75em;

  border-radius: 7px;
  font-size: 1.5em;
  background-color: white;
  min-height: 2.5em;
  border-bottom: 2px solid lightgrey;
  
  input.taskComplete,
  button {
    margin: 0 1em;
    border: none;
    background-color: white;
    font-size: 20px;
  }
  label.taskTitle {
    flex: 0 1 100%;
  }
  button {
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, color 0.2s ease-in-out;
    color: lightgrey;
    &:hover {
      color: #090F17
    }
  }
  &:hover button {
    opacity: 1
  }

`

const TaskEntry = (props) => {
  let t = props.task
  return (
    <StyledTaskEntry>
      <input
        type="checkbox"
        className="taskComplete"
        checked={t.task_complete}
        onChange={() => props.toggleTaskComplete(t)}
        />
      <label className="taskTitle">{t.task_title}</label>
      <ArchiveIcon
        task={props.task}
        archiveTask={props.archiveTask}
        className="archiveIcon"/>
    </StyledTaskEntry>
  )
}

TaskEntry.propTypes = {
  task: PropTypes.shape({
    task_complete: PropTypes.bool.isRequired,
    task_title: PropTypes.string.isRequired,
    task_uri: PropTypes.string.isRequired,
  }),
  toggleTaskComplete: PropTypes.func.isRequired,
  archiveTask: PropTypes.func.isRequired,
}

export default TaskEntry;