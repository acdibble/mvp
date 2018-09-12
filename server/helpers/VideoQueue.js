const VideoQueue = () => {
  const storage = [
    {
      id: 'GONmFCkCGCc',
      title: 'Bob Seger - Turn The Page (1973 Radio Version)',
      thumbnail: 'https://i.ytimg.com/vi/GONmFCkCGCc/mqdefault.jpg',
    },
    {
      id: 'BFRVegQZ_r0',
      title: 'Bob Seger ~ Night Moves (1976) ° .. *.☾°*. ●°*. ♫',
      thumbnail: 'https://i.ytimg.com/vi/BFRVegQZ_r0/mqdefault.jpg',
    },
    {
      id: 'PBJRD1VkxmI',
      title: 'Against the Wind - Bob Seger & The Silver Bullet Band',
      thumbnail: 'https://i.ytimg.com/vi/PBJRD1VkxmI/mqdefault.jpg',
    },
    {
      id: 'BgQCigNFvbY',
      title: 'Bob Seger - Greatest Hits Full Album',
      thumbnail: 'https://i.ytimg.com/vi/BgQCigNFvbY/mqdefault.jpg',
    },
    {
      id: 'Ld1l4Ud7jp8',
      title: 'Fire Lake - Bob Seger & The Silver Bullet Band',
      thumbnail: 'https://i.ytimg.com/vi/Ld1l4Ud7jp8/mqdefault.jpg',
    },
  ];

  let currentVid = {
    id: 'O3rXmViAcHc',
    title: 'Bob Seger Greatest Hits  -   The Best Of Bob Seger   |  HD/HQ',
    thumbnail: 'https://i.ytimg.com/vi/O3rXmViAcHc/default.jpg',
  };

  return {
    nextVideo() {
      currentVid = storage.shift();
      return currentVid;
    },
    addVideo(video) {
      storage.push(video);
    },
    get currentVid() {
      return currentVid;
    },
    get storage() {
      return storage;
    },
  };
};

module.exports = VideoQueue();
