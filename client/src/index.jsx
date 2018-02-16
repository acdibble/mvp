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

  videoEntryClickHandler(e) {
    this.setState({
      addById: e.target.id
    })
  }

  enterKeyHandler(e) {
    if (e.key === 'Enter') {
      if (e.target.name === 'addById') {
        // TODO
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