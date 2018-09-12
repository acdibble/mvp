import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Youtube from './Video/Youtube';
import VideoList from './Video/VideoList';

const Body = (props) => {
  const {
    videoId,
    queue,
    results,
  } = props;

  return (
    <Grid className="container">
      <Col xs={12} md={8}>
        <Row>
          {videoId ? (<Youtube videoId={videoId} />) : <div>Loading...</div>}
        </Row>
        <Row>
          <h2>Coming up...</h2>
          <VideoList videos={queue} />
        </Row>
      </Col>
      <Col xs={6} md={4}>
        <h2>Search results:</h2>
        <VideoList videos={results} />
      </Col>

    </Grid>
  );
};

Body.propTypes = {
  videoId: PropTypes.string.isRequired,
  queue: PropTypes.arrayOf(PropTypes.object).isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Body;
