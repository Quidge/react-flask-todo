import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  align-items: center

  background-color: white;
  border-bottom: 2px solid lightgrey;
  border-radius: 7px 7px 0 0;
  padding: .3em;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 2.5em;
    width: 100%
    border-radius: 7px;
    border: none;
    box-sizing: content-box;
    font-size: 16px;

    input[type=text] {
      font-size: 1.5em;
      flex: 0 1 75%;
      border: none;
      border-bottom: 3px solid #dfe1e6;
      transition: border-bottom 0.30s ease-in-out;
      margin: .5em auto;
    }
    input[type=text]:focus {
      border-bottom: 3px solid #BADCAB;
    }
  }
`

const Header = (props) => {
  return (
    <StyledHeader>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="task_title"
          value={props.taskTitle}
          onChange={props.handleChange}
          autocomplete={false}/>
      </form>
    </StyledHeader>
  )
}

Header.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  taskTitle: PropTypes.string.isRequired
}

export default Header;