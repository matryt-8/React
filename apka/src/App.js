import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import './App.css';

axios.defaults.baseURL = "http://localhost:7777/";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return (
      <div>
        {/* <nav>Navbar</nav> */}
        <Router>
          <Route exact path="/" render={() => <h1 className="App">Home</h1>} />
        </Router>
      </div>
    );
  }
}

export default App;
