import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './ErrorBoundary.js';
import TroubleMaker from './TroubleMaker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ErrorBoundary>
        <TroubleMaker suffix="inside" probability={0} />
      </ErrorBoundary>
      <TroubleMaker suffix="outside" probability={0} />
    </div>
  );
}

export default App;
