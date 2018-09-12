import React, { Component } from 'react';
import PropTypes from 'prop-types';
import load from 'load-script';
import { Button, ButtonGroup } from 'react-bootstrap';


class Youtube extends Component {
  constructor(props) {
    super(props);

    const { videoId } = props;

    load('https://www.youtube.com/iframe_api', () => {
      window.onYouTubeIframeAPIReady = () => {
        this.player = new window.YT.Player('iframe', {
          width: 600,
          height: 400,
          videoId,
        });
      };
    });
  }

  getPlaylist() {
    console.log(this.player.playlist);
  }

  describePlayer() {
    console.log(this.player.self);
  }

  pauseVideo() {
    this.player.pause();
  }

  playVideo() {
    this.player.play();
  }

  stopVideo() {
    this.player.stop();
  }

  render() {
    return (
      <div>
        <div id="iframe" />
        <br />
        <ButtonGroup>
          <Button onClick={this.playVideo}>Play</Button>
          <Button onClick={this.pauseVideo}>Pause</Button>
          <Button onClick={this.stopVideo}>Stop</Button>
          <Button onClick={this.getPlaylist}>Playlist</Button>
          <Button onClick={this.describePlayer}>Player</Button>
        </ButtonGroup>
      </div>
    );
  }
}

Youtube.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default Youtube;
