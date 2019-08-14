import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 0 0 7px 7px;
  padding: 1em;
  border-bottom: solid 2px lightgrey;
  font-size: 14px;
  font-weight: 300;

  .clearCompleted {
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;

    opacity: 0;

    &.active {
      opacity: 1;
      cursor: pointer;
    }
    &[disabled] {
      cursor: auto;
    }
  }
`

const Footer = (props) => {
  let allTasks = Object.entries(props.tasks)
  let unarchivedTasks = allTasks
    .filter(([key, value]) => {
      return !value.task.task_archived
    })
    .map(([_, value]) => value)
  let unfinishedUnarchivedTasks = unarchivedTasks.filter(({task}) => !task.task_complete)
  let completedUnarchivedTasks = unarchivedTasks.filter(({task}) => task.task_complete)
  let buttonVisible = (
    (unarchivedTasks.length - unfinishedUnarchivedTasks.length) > 0 ? 'active' : ''
  )
  let buttonClasses = `clearCompleted ${buttonVisible}`
  return (
    <StyledFooter>
      <span className="remaining-tasks">
        {unfinishedUnarchivedTasks.length} tasks left
      </span>
      <button
        className={buttonClasses}
        disabled={!Boolean(buttonVisible)}
        onClick={(e) => {
          e.preventDefault();
          return props.archiveCompletedTasks(completedUnarchivedTasks)
        }}>
        Archive completed
      </button>
    </StyledFooter>
  )
}

export default Footer;