import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Header from './components/Header';
import Body from './components/Body';

const socket = io();

ReactDOM.render(
  <div>
    <Header />
    <Body socket={socket} />
  </div>,
  document.getElementById('app'),
);
