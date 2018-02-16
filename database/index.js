const mongoose = require('mongoose');
const MLAB_URI = require('./config');
const autoIncrement = require('mongoose-auto-increment');

const connection = mongoose.createConnection(MLAB_URI || 'mongodb://localhost/videos');
autoIncrement.initialize(connection);

const videoSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
});
videoSchema.plugin(autoIncrement.plugin, 'Video')

const Video = connection.model('Video', videoSchema);

const save = (params) => {
  // TODO
}

module.exports = {

}
