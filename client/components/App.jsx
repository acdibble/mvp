import React, { Component } from 'react';
import YouTubePlayer from '../YouTubePlayer';

class App extends Component {
  constructor() {
    super();
    this.player = new YouTubePlayer('iframe');

    this.startVideo = this.startVideo.bind(this);
    this.describePlayer = this.describePlayer.bind(this);
  }

  startVideo() {
    this.player.start();
  }

  describePlayer() {
    console.log(this.player);
  }

  render() {
    return (
      <div>
        <div id="iframe">Howdy.</div>
        <input type="button" value="Start" onClick={this.startVideo} />
        <input type="button" value="Player" onClick={this.describePlayer} />
      </div>
    );
  }
}

export default App;
