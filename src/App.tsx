import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Play from './components/play';
import Final from './components/final';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/game" exact component={Play} />
      <Route path="/final" exact component={Final} />
    </Switch>
  );
}

export default App;
