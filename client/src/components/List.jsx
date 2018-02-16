import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.videos.length } videos.
    { props.videos.map(video => <ListItem video={video}/>)}
  </div>
)

export default List;