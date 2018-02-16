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
      searchQuery: '',
      globalQueue: [],
      addById: ''
    }
  }

  componentDidMount() {
    axios.get('/search', {
      params: {
        q: 'Bob Seger'
      }
    })
      .then((res) => {
        this.setState({
          videos: res.data.items
      });
    });
  }

  updateSeachQuery(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  updateAddById(e) {
    this.setState({
      addById: e.target.value
    });
  }

  fetchVideos() {
    axios.post('/fetch', { q: this.state.searchQuery })
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

  render () {
    return (
      <div>
        <h1>Welcome to uMTV</h1>
        <div>
          <input
          type="text"
          name="searchBar"
          value={this.state.searchQuery}
          onChange={this.updateSeachQuery.bind(this)}
          />
          <button
            name="search"
            onClick={this.fetchVideos.bind(this)}
          >
            Search
          </button>
        </div>
        <div>
          <input
            type="text"
            name="addByIdBar"
            value={this.state.addById}
            onChange={this.updateAddById.bind(this)}
          />
          <button
            name="addById"
            onClick={this.fetchVideos.bind(this)}
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