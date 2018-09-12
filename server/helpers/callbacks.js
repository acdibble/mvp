const queue = require('./VideoQueue');

const sockets = {};

const init = (socket) => {
  console.log('user connected:', socket.id);
  sockets[socket.id] = { lastPlayed: Date.now() };
  socket.emit('init', {
    currentVid: queue.currentVid.id,
    queue: queue.storage,
  });
};

const end = ({ id }) => () => {
  console.log('user disconnected:', id);
  delete sockets[id];
};

const addVideo = (io, socket) => (video) => {
  console.log(video);
  if (Date.now() - sockets[socket.id].lastPlayed >= 0) {
    sockets[socket.id].lastPlayed = Date.now() + 3600000;
    queue.addVideo(video);
    socket.emit('video:response', 'added');
    io.emit('queue:update', video);
  } else {
    socket.emit('video:response', 'must wait');
  }
};

module.exports = {
  init,
  end,
  addVideo,
};
