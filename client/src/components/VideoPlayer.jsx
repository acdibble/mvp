import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = props => (
  <div>
    {props.url ? (
      <ReactPlayer
        url={props.url}
        onEnded={props.end}
        playing
      />
        ) : (
          <h2>waiting for video...</h2>
        )}
  </div>
);

export default VideoPlayer;
