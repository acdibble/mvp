import load from 'load-script';
import Promise from 'bluebird';

load('https://www.youtube.com/iframe_api');

class YouTubePlayer {
  constructor(elementId) {
    new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    }).then((YT) => {
      this.player = new YT.Player(elementId, {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
          color: 'white',
          playlist: 'taJ60kskkns,FG0fTKAqZ5g',
        },
      });
    });
  }

  start() {
    this.player.playVideo();
  }

  stop() {
    this.player.stopVideo();
  }

  get self() {
    return this.player;
  }
}

export default YouTubePlayer;
