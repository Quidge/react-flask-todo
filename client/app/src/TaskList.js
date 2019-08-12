import React from 'react';
import styled from 'styled-components'

const StyledTaskList = styled.ul`
  min-height: 300px;
  display: block;
  margin: 0;
  padding: 0;
`

const TaskList = (props) => {
  return (
    <StyledTaskList>{props.children}</StyledTaskList>
  )
}

export default TaskList;