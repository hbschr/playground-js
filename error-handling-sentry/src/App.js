import React from 'react';
import logo from './logo.svg';
import './App.css';
import ErrorBoundary from './ErrorBoundary.js';
import TroubleMaker from './TroubleMaker';
import { staticInit, staticCapture, SentryLogger } from './sentry';

function App() {

  const error = new Error("test error");

  // // static
  // staticInit();
  // // manually
  // staticCapture(error);
  // // catchall
  // new Promise(() => {
  //   throw error;
  // });

  // client
  const logger = new SentryLogger();
  const clientLogger = logger.captureException.bind(logger)
  // // manually
  // clientLogger(error);
  // // no catchall
  // new Promise(() => {
  //   throw error;
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ErrorBoundary capture={clientLogger}>
        <TroubleMaker suffix="inside" probability={0} />
      </ErrorBoundary>
      <TroubleMaker suffix="outside" probability={0} />
    </div>
  );
}

export default App;
