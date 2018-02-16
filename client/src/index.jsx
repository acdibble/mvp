import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      currentVideo: null
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

  render () {
    return (
      <h1>Welcome to uMTV</h1>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));