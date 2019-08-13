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
    min-height: 2.5em;
    margin: .3em .5em;
    width: 100%
    border-radius: 7px;
    border: none;
    box-sizing: content-box;
    font-size: 1.5em;

    input,
    button {
      // margin: 0 1em;
      font-size: 20px
    }

    input[type=text] {
      flex: 0 1 100%;
      border: none;
      border-bottom: 3px solid #dfe1e6;
      margin-left: 1em;
      font-size: 16px;
      transition: border-bottom 0.30s ease-in-out;
    }
    input[type=text]:focus {
      border-bottom: 3px solid #BADCAB;
    }

    button {
      background-color: white;
      color: #090F17;
      border: none;
      cursor: pointer;
      margin-right: 1em;
      margin-left: .5em;

      &:disabled {
        color: lightgrey;
      }
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
        <button
          type="submit"
          name="submit"
          value="Create Task"
          disabled={props.disabled}>
          <i className="fas fa-plus"/>
        </button>
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