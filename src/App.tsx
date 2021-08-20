import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from "./routes/history";

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}

export default App;
