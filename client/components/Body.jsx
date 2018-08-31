import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import YouTubePlayer from '../youtube/YouTubePlayer';

class Body extends Component {
  constructor() {
    super();

    this.playVideo = this.playVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
    this.describePlayer = this.describePlayer.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on('init', (videoId) => {
      console.log(videoId);
      this.player = new YouTubePlayer('iframe', videoId);
      console.log(this.player);
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
      <div className="container">
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

Body.propTypes = {
  socket() {
    return null;
  },
};

Body.defaultProps = {
  socket: null,
};

export default Body;
