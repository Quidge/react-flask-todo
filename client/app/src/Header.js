import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="task_title"
        value={props.taskTitle}
        onChange={props.handleChange}/>
      <input
        type="submit"
        name="submit"
        value="Create Task"
        disabled={props.disabled}/>
    </form>
  )
}

Header.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  taskTitle: PropTypes.string.isRequired
}

export default Header;