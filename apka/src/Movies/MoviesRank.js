import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css";
import "../Styles/Button.css";
import { Redirect } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:7777/";

class MoviesRank extends Component {
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
        <h1>Ranking filmów dla wybranego dnia</h1>
        <table className="t-table">
            <tbody>
                <tr>
                    <th>Tytuł</th>
                    <th>Zakupione bilety</th>
                </tr>
            </tbody>

        </table>
      </div>
    )
    else
    return (
      <Redirect to="/moviesrank"/>
    )
  }
}
export default MoviesRank;