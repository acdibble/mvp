import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: this.props.playing
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };

    return (
      <div>
        {this.props.playing ? (
          <YouTube
            videoId={this.state.playing}
            opts={opts}
            onReady={this._onReady}
          />
        ) : (
          <h2>waiting for video...</h2>
        )}
      </div>
    );

    
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default VideoPlayer;
