import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {
  const {
    videos,
    clickHandler
  } = props;

  return (
    <div>
      <h4> List Component </h4>
      There are { videos.length } videos.
      { videos.map(video =>
        <ListItem
          key={video.id.videoId}
          id={video.id.videoId}
          video={video}
          clickHandler={clickHandler}
        />
      )}
    </div>
  )
};

export default List;
