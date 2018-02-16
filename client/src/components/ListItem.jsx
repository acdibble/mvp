import React from 'react';

const ListItem = (props) => (
  <div
    id={props.id}
    onClick={props.clickHandler}
  >
    { props.video.snippet.title }
  </div>
)

export default ListItem;