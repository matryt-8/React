import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"
import "../Styles/Button.css"

axios.defaults.baseURL = "http://localhost:7777/";

class MoviesRankDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null//new Date(null)
    };
  }

  componentDidMount = () => {
    //
  }


  render(){
    return(
      <div className="App">
        <h1>Wybierz dzień dla wygenerowania rankingu filmów</h1>
        <input type="date"/>
        <p> <button className="button">Przejdź do rankingu</button> </p>
      </div>
    );
  }
}
export default MoviesRankDay;