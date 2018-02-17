import React from 'react';

const VideoPlayer = (props) => {
    return (
      <div>
        {props.url ? (
          <iframe
            id="ytplayer"
            type="text/html"
            width="720"
            height="405"
            src={props.url}
            frameBorder="0"
          />
        ) : (
          <h2>waiting for video...</h2>
        )}
        </div>
    );
}

export default VideoPlayer;
