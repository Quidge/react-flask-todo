import React from 'react';

const ArchiveIcon = (props) => {
  return (
    <button onClick={props.archiveTask}>
      <i className="fas fa-archive"/>
    </button>
  )
}

export default ArchiveIcon;