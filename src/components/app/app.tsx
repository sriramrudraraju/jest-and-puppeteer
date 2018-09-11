import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import './app.css';

import Routing from '../routing/routing';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Testing React app with Jest Puppeteer</h1>
        </header>
        <BrowserRouter>
          <div>
            <div className="nav">
              <Link className="navLinks" to="/">Form</Link>
              <Link className="navLinks" to="/api">Api</Link>
            </div>
            <Routing />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
