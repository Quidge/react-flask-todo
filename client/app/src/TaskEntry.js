import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ArchiveIcon from './ArchiveIcon';

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
      <ArchiveIcon task={props.task} archiveTask={props.archiveTask}/>
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