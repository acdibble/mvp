const express = require('express');
const bodyParser = require('body-parser');
const youtube = require('../helpers/youtube')

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

app.post('/fetch', (req, res) => {
  const query = req.body.q;

  youtube.search(query).then(data => {
    res.send(data.data);
  });
})

app.listen(port);
