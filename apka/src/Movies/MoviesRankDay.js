import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css";
import "../Styles/Button.css";
import { Redirect } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:7777/";

class MoviesRankDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,//new Date(null)
      redirect: false
    };
  }

  componentDidMount = () => {
    //
  }


  render(){
    if (this.state.redirect!==true)
    return(
      <div className="App">
        <h1>Wybierz dzień dla wygenerowania rankingu filmów</h1>
        <input type="date"/>
        <p> <button className="button">Przejdź do rankingu</button> </p>
      </div>
    )
    else
    return (
      <Redirect to="/moviesrank"/>
    )
  }
}
export default MoviesRankDay;