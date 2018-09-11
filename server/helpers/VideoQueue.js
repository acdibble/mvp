const VideoQueue = () => {
  const storage = [];

  return {
    nextVideo() {
      return storage.shift();
    },
    addVideo(video) {
      storage.push(video);
    },
  };
};

export default VideoQueue;
