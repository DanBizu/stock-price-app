import './App.css';
import { ComponentTestPage } from './component-test-page/component-test-page';
import { Homepage } from './homepage/homepage';
import { Homepage2 } from './homepage2/homepage2';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
  } from 'react-router-dom';
// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/home2">Homepage 2</Link>
          </li>
          <li>
            <Link to="/component-test-page">Component test page</Link>
          </li>
        </ul>
      </nav>

      <div className="App">
        <Switch>
          <Route path='/' exact={true}><Homepage /></Route>

          <Route path='/home2' exact={true }><Homepage2 /></Route>

          <Route path='/component-test-page' exact={true}><ComponentTestPage /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
