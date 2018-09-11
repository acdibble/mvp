import React from 'react';
import PropTypes from 'prop-types';
import Youtube from './Youtube';

const Body = (props) => {
  const { videoId, enqueue } = props;

  return (
    <div className="container">
      {videoId ? (<Youtube videoId={videoId} enqueue={enqueue} />) : <div>Loading...</div>}
    </div>
  );
};

Body.propTypes = {
  videoId: PropTypes.string.isRequired,
  enqueue: PropTypes.func.isRequired,
};

export default Body;
