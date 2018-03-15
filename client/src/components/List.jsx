import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {
  const {
    videos,
    clickHandler,
    count,
    queue,
  } = props;

  if (queue) {
    videos.forEach((video) => {
      const temp = video.id;
      delete video.id;
      video.id = {
        videoId: temp,
      };
      video.snippet = {
        thumbnails: {
          default: {
            url: video.tUrl,
          },
        },
        title: video.title,
      };
    });
  }

  return (
    <div>
      {count && `There are ${videos.length} videos.`}
      { videos.map(video =>
        (<ListItem
          id={video.id.videoId}
          video={video}
          clickHandler={clickHandler}
        />))}
    </div>
  );
};

export default List;
