import React, { useCallback } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';

const App=()=>{



  // todo, add more pages!
  return (
    <div>
      <nav>
      <Link to="/"> Home </Link>
      <Link to="/view"> View </Link>
      

      </nav>
      <Switch>
      
      
        <Route path="/view">
          <View />
        </Route>
        <Route path="/">
          <Home />
        </Route>
       
      </Switch>
    </div>
  );
  }

export default App;