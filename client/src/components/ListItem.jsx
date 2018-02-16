import React from 'react';

const ListItem = (props) => (
  <div
    id={props.id}
    onClick={props.clickHandler}
  >
    <img src={props.video.snippet.thumbnails.default.url} />{ props.video.snippet.title }
  </div>
)

export default ListItem;