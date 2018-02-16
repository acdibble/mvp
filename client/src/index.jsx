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
      searchQuery: ''
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

  render () {
    return (
      <div>
        <h1>Welcome to uMTV</h1>
        <input
          type="text"
          value={this.state.searchQuery}
          onChange={this.updateSeachQuery.bind(this)}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));