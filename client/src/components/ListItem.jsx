import React from 'react';

const ListItem = props => (
  <div>
    <img src={props.video.snippet.thumbnails.default.url} alt="video thumbnail" />
    <a href="" onClick={props.clickHandler} id={props.id}>{props.video.snippet.title}</a>
  </div>
);

export default ListItem;
