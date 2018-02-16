const express = require('express');
const bodyParser = require('body-parser');
const youtube = require('../helpers/youtube');
const db = require('../database/index');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


app.get('/search', (req, res) => {
  const query = req.query.q;

  youtube.search(query).then(data => {
    res.send(data.data);
  });
});

app.post('/add', (req, res) => {
  const params = {
    id: req.body.video.id.videoId,
    title: req.body.video.snippet.title,
    tUrls: req.body.video.snippet.thumbnails.default.url
  }

  db.save(params);
  res.send(req.body.video);
})

app.listen(port);
