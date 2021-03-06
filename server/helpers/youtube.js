const axios = require('axios');

const search = query => axios.get('https://www.googleapis.com/youtube/v3/search', {
  params: {
    maxResults: 5,
    part: 'snippet',
    q: query,
    type: 'video',
    videoEmbeddable: true,
    key: process.env.YOUTUBE_API_KEY,
  },
});

module.exports = {
  search,
};
