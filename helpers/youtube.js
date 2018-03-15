const axios = require('axios');
const config = require('../config');

function search(query) {
  return axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      maxResults: 5,
      part: 'snippet',
      q: query,
      type: 'video',
      videoEmbeddable: true,
      key: config.YOUTUBE_API_KEY,
    },
  });
}

module.exports = {
  search,
};
