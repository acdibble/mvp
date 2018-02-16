import React from 'react';

const ListItem = (props) => (
  <div>
    { props.video.snippet.title }
  </div>
)

export default ListItem;