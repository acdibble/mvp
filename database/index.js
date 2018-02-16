import mongoose from 'mongoose';
import { MLAB_URI } from './config';

mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/videos');

module.exports = {

}
