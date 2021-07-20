import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import OptionsGenerator from './containers/OptionsGenerator';

export default function App() {
  return (  
    <div className="bg-gray-100 ">     
      <Router>
        <Navbar />        
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/generator">
            <OptionsGenerator />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


