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
import BuyTicket from "./Others/BuyTicket";
import './Styles/App.css';
import Home from "./Others/TodayScreenings";
import MoviesRankDay from "./Movies/MoviesRankDay";
import MoviesRank from "./Movies/MoviesRank";
axios.defaults.baseURL = "http://localhost:7777/";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
    // bindowanie funkcji asynchronicznych
    this.addScreening = this.addScreening.bind(this);
    this.editScreening = this.editScreening.bind(this);
    this.buyTicket = this.buyTicket.bind(this);
  }

   addMovie = (data)=>{
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

  async deleteMovie (id){

    axios.delete("movies/"+id)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }

  async addScreening (data){
    var body = {
      "id": 0,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "free_tickets": data.free_tickets,
      "taken_seats": []
    }

    await axios.post("screenings", body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  async editScreening(screening, data){
    var body = {
      "id": screening.id,
      "date": data.date,
      "hour": data.hour,
      "movie": data.movie,
      "room": data.room,
      "free_tickets": screening.free_tickets,
      "taken_seats": screening.taken_seats
    }

    await axios.put("screenings/"+ body.id, body)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  deleteScreening = (id) =>{
    axios.delete("screenings/"+id)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  }

  async buyTicket(screening,data){
    var body = {
      "id": screening.id,
      "date": screening.date,
      "hour": screening.hour,
      "movie": screening.movie,
      "room": screening.room,
      "free_tickets": data.free_tickets,
      "taken_seats": data.taken_seats
    }

    await axios.put("screenings/"+ body.id, body)
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
          <Route exact path="/editmovie/:id" render={({match}) => <EditMovie id={parseInt(match.params.id)} editMovie={this.editMovie}/>}/>
          <Route exact path="/addmovie" render={() => <AddMovie addMovie={this.addMovie}/>}/>
          <Route exact path="/screenings" render={() => <Screenings delete={this.deleteScreening}/>}/>
          <Route exact path="/addscreening" render={() => <AddScreening onSubmit={this.addScreening}/>}/>
          <Route exact path="/editscreening/:id" render={({match}) => <EditScreening id={parseInt(match.params.id)} onSubmit={this.editScreening}/>}/>
          <Route exact path="/buyticket/:id" render={({match}) => <BuyTicket id={parseInt(match.params.id)} onSubmit={this.buyTicket}/>}/>
          <Route exact path="/choosedaytorank" render={()=> <MoviesRankDay />}/>
          <Route exact path="/moviesrank/:date" render={(props)=> <MoviesRank date={props.match.params.date} />}/>
        </Router>
      </div>
    );
  }
}

export default App;
