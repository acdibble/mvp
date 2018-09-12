import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Header from './components/Header';
import Body from './components/Body';

const socket = io();

class App extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      currentVid: '',
      queue: [],
      loggedIn: true,
      results: [],
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    socket.on('init', ({ currentVid, queue }) => this.setState({ currentVid, queue }));
    socket.on('video:response', res => console.log(res));
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  search() {
    const { query } = this.state;
    if (query) {
      fetch(`/youtube/search?query=${query}`)
        .then(data => data.json())
        .then(results => this.setState({ results }));
    }
  }

  render() {
    const {
      query,
      currentVid,
      queue,
      loggedIn,
      results,
    } = this.state;
    return (
      <div>
        <Header
          query={query}
          handleChange={this.handleChange}
          search={this.search}
          loggedIn={loggedIn}
        />
        <Body videoId={currentVid} queue={queue} results={results} />
      </div>
    );
  }
}

ReactDOM.render(<App style={{ body: { margin: '0' } }} />, document.getElementById('app'));
