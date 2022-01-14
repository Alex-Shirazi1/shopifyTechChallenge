import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
const App=()=>{



  // todo, add more pages!
  return (
    <div>
      <nav>
      <Link to="/"> Home </Link>
     

      </nav>
   
        <Route path="/">
          <Home />
        </Route>

    </div>
  );
  }

export default App;