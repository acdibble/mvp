import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = (props) => {
    return (
      <div>
        {props.url ? (
          <ReactPlayer
            url={props.url}
            onPlay={console.log('play')}
            onEnded={props.end}
            playing
          />
        ) : (
          <h2>waiting for video...</h2>
        )}
        </div>
    );
}

export default VideoPlayer;
