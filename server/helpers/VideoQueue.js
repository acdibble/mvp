class VideoQueue {
  constructor() {
    this.storage = [];
  }

  nextVideo() {
    return this.storage.shift();
  }

  addVideo(video) {
    this.storage.push(video);
  }
}

export default VideoQueue;
