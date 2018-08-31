import load from 'load-script';
import Promise from 'bluebird';

load('https://www.youtube.com/iframe_api');

class YouTubePlayer {
  constructor(elementId, videoId) {
    new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    }).then((YT) => {
      this.player = new YT.Player(elementId, {
        width: 600,
        height: 400,
        videoId,
      });
    });
  }

  play() {
    this.player.playVideo();
  }

  pause() {
    this.player.pauseVideo();
  }

  stop() {
    this.player.stopVideo();
  }

  get self() {
    return this.player;
  }

  get playlist() {
    return this.player.getPlaylist();
  }
}

export default YouTubePlayer;
