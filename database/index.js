const mongoose = require('mongoose');
const MLAB_URI = require('./config');

mongoose.connect(MLAB_URI || 'mongodb://localhost/videos');

const videoSchema = mongoose.Schema({  
  id: { type: String, required: true, unique: true },
  title: String,
  tUrl: String
});

const Video = mongoose.model('Video', videoSchema);

const save = (params, callback) => {
  const { id, title, tUrl } = params;
  
  new Video({
    id: id,
    title: title,
    tUrl: tUrl
  })
    .save((err, product) => {
    if (err) {
      callback(err, null); 
    }
    callback(null, product);
  });
}

module.exports = {
  save: save
}
