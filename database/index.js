const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MLAB_URI);

const videoSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  tUrl: String,
});

const Video = mongoose.model('Video', videoSchema);

const save = (params, callback) => {
  const { id, title, tUrl } = params;

  new Video({
    id,
    title,
    tUrl,
  })
    .save((err, product) => {
      if (err) {
        callback(err, null);
      }
      callback(null, product);
    });
};

module.exports = {
  save,
};
