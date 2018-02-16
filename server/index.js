import express from 'express';
import bodyParser from 'body-parser';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


app.get('/items', function (req, res) {
  // TODO
});

app.listen(port, function() {
  console.log('listening on port 3000!');
});

