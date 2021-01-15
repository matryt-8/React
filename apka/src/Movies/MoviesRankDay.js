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


  setDate = (event) => {
    this.setState({
      date: event.target.value
    })
  }

  submit = () => {
    if (this.state.date!=null)
    this.setState({
      redirect: true
    })
    else alert("Musisz wybrać datę")
  }


  render(){
    if (this.state.redirect!==true)
    return(
      <div className="App">
        <h1>Wybierz dzień dla wygenerowania rankingu filmów</h1>
        <input type="date" required onChange={this.setDate}/>
        <p> <button className="button" onClick={this.submit}>Przejdź do rankingu</button> </p>
      </div>
    )
    else
    return (
      <Redirect to={"/moviesrank/"+this.state.date}/>
    )
  }
}
export default MoviesRankDay;