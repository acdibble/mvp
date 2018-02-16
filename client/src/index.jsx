import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos: [],
      currentVideo: null
    }
  }

  componentDidMount() {
    // TODO
  }

  render () {
    return (
      // TODO
      <div />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));