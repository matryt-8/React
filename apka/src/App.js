import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Movies from "./Movies/Movies";
import Screenings from "./Screenings/Screenings";
import EditMovie from "./Movies/EditMovie";
import './Styles/App.css';

axios.defaults.baseURL = "http://localhost:7777/";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addMovie = (data) =>{
    var body = {
      "id": data.id,
      "title": data.title,
      "duration": data.duration
    }

    axios.post("movies", body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  editMovie = (data) =>{
    var body = {
      "id": data.id,
      "title": data.title,
      "duration": data.duration
    }

    axios.put("movies/" + body.id, body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  deleteMovie = (id) =>{

    axios.delete("movies/"+id)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }

  addScreening = (data) =>{
    var body = {
      "id": data.id,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "sold tickets": data.soldtickets,
      "free tickets": data.freetickets,
      "taken seats": data.takenseats
    }

    axios.post("screenings", body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  editScreening = (data) =>{
    var body = {
      "id": data.id,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "sold tickets": data.soldtickets,
      "free tickets": data.freetickets,
      "taken seats": data.takenseats
    }

    axios.put("screenings"+ body.id, body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  render(){
    return (
      <div>
        <Nav/>
        <Router>
          <Route exact path="/" render={() => <h1 className="App">Home</h1>} />
          <Route exact path="/movies" render={() => <Movies deleteMovie={this.deleteMovie}/>}/>
          <Route exact path="/screenings" render={() => <Screenings/>}/>
          <Route exact path="/editmovie/:id" render={({match}) => <EditMovie id={match.params.id} editMovie={this.editMovie}/>}/>
        </Router>
      </div>
    );
  }
}

export default App;
