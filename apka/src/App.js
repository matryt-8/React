import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Movies from "./Movies/Movies";
import AddMovie from "./Movies/AddMovie";
import EditMovie from "./Movies/EditMovie";
import Screenings from "./Screenings/Screenings";
import AddScreening from "./Screenings/AddScreening";
import EditScreening from "./Screenings/EditScreening";
import './Styles/App.css';
import Home from "./Others/TodayScreenings";

axios.defaults.baseURL = "http://localhost:7777/";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addMovie = (data) =>{
    var body = {
      "id": 0,
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
      "id": 0,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "sold_tickets": 0,
      "free_tickets": 0,
      "taken_seats": []
    }

    axios.post("screenings", body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  editScreening = (screening, data) =>{
    var body = {
      "id": screening.id,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "sold_tickets": screening.sold_tickets,
      "free_tickets": screening.free_tickets,
      "taken_seats": screening.taken_seats
    }

    axios.put("screenings/"+ body.id, body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  deleteScreening = (id) =>{
    axios.delete("screenings/"+id)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }

  render(){
    return (
      <div>
        <Nav/>
        <Router>
          <Route exact path="/" render={() => <Home home={this.home}/>} />
          <Route exact path="/movies" render={() => <Movies deleteMovie={this.deleteMovie}/>}/>
          <Route exact path="/editmovie/:id" render={({match}) => <EditMovie id={match.params.id} editMovie={this.editMovie}/>}/>
          <Route exact path="/addmovie" render={() => <AddMovie addMovie={this.addMovie}/>}/>
          <Route exact path="/screenings" render={() => <Screenings delete={this.deleteScreening}/>}/>
          <Route exact path="/addscreening" render={() => <AddScreening onSubmit={this.addScreening}/>}/>
          <Route exact path="/editscreening/:id" render={({match}) => <EditScreening id={match.params.id} onSubmit={this.editScreening}/>}/>
        </Router>
      </div>
    );
  }
}

export default App;
