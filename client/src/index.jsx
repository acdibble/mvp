import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Button, Col, FormControl, FormGroup, Grid, Navbar, Row } from 'react-bootstrap';

import List from './components/List.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      searchQuery: '',
      selected: null,
      addById: '',
      globalQueue: [

      ],
      playing: {
        id: '-xKM3mGt2pE',
        title: 'a-ha - Take On Me [ Live From MTV Unplugged, Giske / 2017 ]',
        turl: 'https://i.ytimg.com/vi/O3rXmViAcHc/default.jpg',
      },
      url: 'https://www.youtube.com/embed/-xKM3mGt2pE',
    };

    this.handleEnd = this.handleEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterKeyHandler = this.enterKeyHandler.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.fetchVideos = this.fetchVideos.bind(this);
    this.videoEntryClickHandler = this.videoEntryClickHandler.bind(this);
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    if (this.state.searchQuery !== '') {
      axios.get('/search', {
        params: {
          q: this.state.searchQuery,
        },
      })
        .then((res) => {
          this.setState({
            videos: res.data.items,
          });
        });
    }
  }

  addToQueue() {
    if (this.state.addById !== '') {
      axios.post('/add', { video: this.state.selected })
        .then((res) => {
          if (res.data === 'already exists') {
            window.alert('This song cannot be played as it already has been played recently');
          } else if (this.state.playing === null) {
            const url = `https://www.youtube.com/embed/${res.data.id}`;
            this.setState({
              playing: res.data,
              url,
            });
          } else {
            const queue = this.state.globalQueue.slice();
            queue.push(res.data);
            this.setState({
              globalQueue: queue,
            });
          }
        });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  videoEntryClickHandler(e) {
    e.preventDefault();
    let selected;

    this.state.videos.forEach((video) => {
      if (video.id.videoId === e.target.id) {
        selected = video;
      }
    });

    this.setState({
      selected,
      addById: e.target.id,
    });
  }

  enterKeyHandler(e) {
    if (e.key === 'Enter') {
      if (e.target.name === 'addById') {
        this.addToQueue();
      } else if (e.target.name === 'searchQuery') {
        this.fetchVideos();
      }
    }
  }

  handleEnd() {
    const queue = this.state.globalQueue.slice();
    if (!queue.length) {
      this.setState({
        playing: null,
        url: null,
      });
    } else {
      const playing = queue.pop();
      this.setState({
        playing,
        url: `https://www.youtube.com/embed/${playing.id.videoId}`,
        globalQueue: queue,
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a>Welcome to uMTV</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullRight name="searchBox">
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  onChange={this.handleChange}
                  onKeyPress={this.enterKeyHandler}
                />
              </FormGroup>
              <Button
                type="submit"
                onClick={this.fetchVideos}
              >
                Submit
              </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          <Row>
            <Col name="videoplayer" xs={12} md={8}>
              <VideoPlayer
                url={this.state.url}
                end={this.handleEnd}
              />
              <div
                bsStyle="pull-left"
                name="queueList"
              >
                <List
                  videos={this.state.globalQueue}
                  queue
                  count
                />
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div name="addByIdBox">
                <FormGroup>
                  <FormControl
                    placeholder="Click Video Title to Add ID"
                    type="text"
                    name="addById"
                    value={this.state.addById}
                    onChange={this.handleChange}
                    disabled
                  />
                </FormGroup>
                <Button
                  onClick={this.addToQueue}
                >
                  Add Video
                </Button>
              </div>
              <div name="searchList">
                <List
                  videos={this.state.videos}
                  clickHandler={this.videoEntryClickHandler}
                />
              </div>

            </Col>
          </Row>
          <Row>
            <Col name="videoplayer" xs={12} md={8} />
          </Row>

        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
