import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      currentVideo: null,
      searchQuery: 'Bob Seger',
      selected: null,
      addById: '',
      globalQueue: [
        
      ],
      playing: {
        'id': '-xKM3mGt2pE',
        'title': 'a-ha - Take On Me [ Live From MTV Unplugged, Giske / 2017 ]',
        'turl': 'https://i.ytimg.com/vi/O3rXmViAcHc/default.jpg'
      },
      url: 'https://www.youtube.com/embed/-xKM3mGt2pE'
    }
  }

  componentDidMount() {
    this.fetchVideos();
    this.setState({
      searchQuery: ''
    })
  }
  
  fetchVideos() {
    if (this.state.searchQuery !== '') {
      axios.get('/search', {
        params: {
          q: this.state.searchQuery
        }
      })
        .then((res) => {
          this.setState({
            videos: res.data.items
          });
        });
      }
    }
    
  addToQueue() {
    if (this.state.addById !== '') {
      axios.post('/add', { video: this.state.selected })
      .then(res => {
        if (res.data === 'already exists') {
          alert('This song cannot be played as it already has been played recently');
        } else {
          if (this.state.playing === null) {
            const url = `https://www.youtube.com/embed/${res.data.id}`
            this.setState({
                playing: res.data,
                url: url
              });
            } else {
              const queue = this.state.globalQueue.slice();
              queue.push(res.data);
              this.setState({
                globalQueue: queue
              });
            }
          }
      });
    }
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  videoEntryClickHandler(e) {
    let selected;

    for (const video of this.state.videos) {
       if (video.id.videoId === e.target.id) {
        selected = video;
      }
    }

    this.setState({
      selected: selected,
      addById: e.target.id
    })
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
        url: null
      });
    } else {
      const playing = queue.pop();
      this.setState({
        playing: playing,
        url: `https://www.youtube.com/embed/${playing.id.videoId}`,
        globalQueue: queue
      })
    }
  }

  render () {
    const styles = {
      queueList: {
        'float': 'right'
      },
    }

    return (
      <div>
        <h1>Welcome to uMTV</h1>
        <div name="videoplayer">
          <VideoPlayer
            url={this.state.url}
            end={this.handleEnd.bind(this)}
          />
        </div>
        <div name="addByIdBox">
          <input
            type="text"
            name="addById"
            value={this.state.addById}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.enterKeyHandler.bind(this)}
            disabled
          />
          <button
            onClick={this.addToQueue.bind(this)}
          >
            Add Video By ID
          </button>
        </div>
        <div
        name="queueList"
        style={styles.queueList}
        >
          <List
            videos={this.state.globalQueue}
            queue
            count
          />
        </div>
        <div name="searchBox">
          <input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.enterKeyHandler.bind(this)}
          />
          <button
            onClick={this.fetchVideos.bind(this)}
          >
            Search
          </button>
        </div>
        <div name="searchList">
          <List
            videos={this.state.videos}
            clickHandler={this.videoEntryClickHandler.bind(this)}
          />
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
