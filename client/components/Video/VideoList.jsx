import React from 'react';
import PropTypes from 'prop-types';

const VideoList = (props) => {
  const { videos } = props;

  return (
    <div>
      {videos.map(vid => (
        <div>
          <img src={vid.thumbnail} alt="video thumbnail" />
          <div>{vid.title}</div>
        </div>
      ))}
    </div>
  );
};

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoList;
