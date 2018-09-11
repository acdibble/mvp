import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Header from './components/Header';
import Body from './components/Body';

const socket = io();

class App extends Component {
  static enqueue(video) {
    socket.emit('video:add', video || 'hi');
  }

  constructor() {
    super();

    this.state = {
      query: '',
      videoId: '',
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    socket.on('init', videoId => this.setState({ videoId }));
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
        .then(res => console.log(res));
    }
  }

  render() {
    const { query, videoId } = this.state;
    return (
      <div>
        <Header query={query} handleChange={this.handleChange} search={this.search} />
        <Body videoId={videoId} enqueue={App.enqueue} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
