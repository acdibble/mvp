const sockets = {};

const init = ({ id }) => {
  console.log('user connected:', id);
  sockets[id] = { lastPlayed: Date.now() };
};

const end = ({ id }) => () => {
  console.log('user disconnected:', id);
  delete sockets[id];
};

const addVideo = socket => (video) => {
  console.log(video);
  if (Date.now() - sockets[socket.id].lastPlayed >= 0) {
    sockets[socket.id].lastPlayed = Date.now() + 3600000;
    socket.emit('video:response', 'added');
  } else {
    socket.emit('video:response', 'must wait');
  }
};

module.exports = {
  init,
  end,
  addVideo,
};
