import React from 'react';
import logo from './logo.svg';
import './App.css';
import { startSocket, closeSocket } from './services/test/Socket.js';
import { useEffect, useState } from 'react';

function App() {
  //Example of the use of socket.io to update the state of the component
  const [mesg, setMesg] = useState('React');
  
  useEffect(() => {
    startSocket(setMesg);
    return () => {
      closeSocket();
    }
  }, []);

  //----------------------------------------------

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
