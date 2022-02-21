import './App.css';
import React from "react";
import { Route} from "react-router-dom";
import LandingPage from "./components/LandingPage.js"
import Home from "./components/Home.js"
import NavBar from "./components/NavBar.js"
import Game from './components/Game';
import Form from './components/Form';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/home" component={NavBar}/>
      <Route exact path="/home" component={Home}/>
      <Route  path="/videogame/:id" component={Game}/>
      <Route  path="/home/create" component={Form}/>
      
    </div>
  );
}

export default App;
