import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      currentVideo: null,
      searchQuery: 'Bob Seger',
      globalQueue: [],
      selected: null,
      addById: ''
    }
  }

  componentDidMount() {
    this.fetchVideos();
    this.setState({
      searchQuery: ''
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fetchVideos() {
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

  addToQueue() {
    axios.post('/add', { video: this.state.selected })
      .then(res => {
        const queue = this.state.globalQueue.slice();
        queue.push(res.data);
        this.setState({
          globalQueue: queue
        });
    });
  }

  videoEntryClickHandler(e) {
    let selected = null;

    while (selected === null) {
      for (const video of this.state.videos) {
        if (video.id.videoId === e.target.id) {
          selected = video;
        }
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

  render () {
    return (
      <div>
        <h1>Welcome to uMTV</h1>
        <div>
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
        <div>
          <input
            type="text"
            name="addById"
            value={this.state.addById}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.enterKeyHandler.bind(this)}
          />
          <button
            onClick={this.addToQueue.bind(this)}
          >
            Add Video By ID
          </button>
        </div>
        <div>
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