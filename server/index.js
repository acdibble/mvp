require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const youtube = require('./helpers/youtube');
const { init, addVideo, end } = require('./helpers/callbacks');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

app.use(express.static(`${__dirname}/../dist`));
app.use(bodyParser.json());

app.get('/youtube/search', (req, res) => {
  const { query } = req.query;
  youtube.search(query)
    .then(({ data: { items } }) => {
      res.json(items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      })));
    });
});

io.on('connection', (socket) => {
  init(socket);

  socket.on('video:add', addVideo(io, socket));

  socket.on('disconnect', end(socket));
});

server.listen(3000, () => {
  console.log('Listening on port 3000.');
});
