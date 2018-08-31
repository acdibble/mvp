const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static(`${__dirname}/../dist`));

io.on('connection', (socket) => {
  console.log('user connected');
  socket.emit('init', 'BFRVegQZ_r0');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000.');
});
