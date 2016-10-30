import React, { Component } from 'react';
import './App.css';
import CircleOfFifths from './CircleOfFifths.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Circle of Fifths</h2>
        </div>
        <CircleOfFifths />
        <div className="helpText">
          Enter to submit answer<br />
          Type 'F' for flat <br />
          Type 'S' for sharp
        </div>
      </div>
    );
  }
}

export default App;
