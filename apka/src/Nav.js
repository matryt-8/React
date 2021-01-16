import React, { Component } from "react";
import './Styles/Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
      <div>
        <nav className="Nav-class">
        <a href="/">
            <button className="Nav-button">Home</button>
        </a>
        <a href="/movies">
            <button className="Nav-button">Filmy</button>
        </a>
        <a href="/screenings">
            <button className="Nav-button">Seanse</button>
        </a>
        <a href="/choosedaytorank">
            <button className="Nav-button">Rankingi popularności</button>
        </a>
        </nav>
        
      <hr className="Nav-hr"/>
      </div>
    );
  }
}
export default Nav;