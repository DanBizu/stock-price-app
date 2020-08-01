import './App.css';
import { Homepage } from './homepage/homepage';
import { Homepage2 } from './homepage2/homepage2';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' render={() => <Homepage />} />

          <Route path='/home2' render={() => <Homepage2 />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
