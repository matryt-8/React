import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"

axios.defaults.baseURL = "http://localhost:7777/";

class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        MoviesList: [],
        ScreeningsList: [],
        date: new Date(),
      };
    }

    componentDidMount = () => {
      this.getMovies();
      this.getScreenings();;
      document.getElementById("date").valueAsDate = new Date();
    }
  
      async getMovies () {
        axios.get("/movies")
        .then((response)=>{
          console.log("response",response.data);
          this.setState({
            MoviesList: response.data
          })
        })
        .catch((error)=>{
          console.log("error",error)
        })
    }

    async getScreenings () {
      axios.get("/screenings")
        .then((response)=>{
          console.log("response",response.data);
          this.setState({
            ScreeningsList: response.data
          })
        })
        .catch((error)=>{
          console.log("error",error)
        })
    }

    isDateTheSame = (date1, date2) =>
    {
      var selectedDate = new Date(date1);
      var currentDate = new Date(date2);
      if(selectedDate.getFullYear() === currentDate.getFullYear() &&
          selectedDate.getMonth() === currentDate.getMonth() &&
          selectedDate.getDate() === currentDate.getDate()){
            return true;
          }
      return false;
    }

    onChange = (e) =>{
      this.setState({
          [e.target.id] : e.target.value
      })
    }

    isAnyFilmThisDay = () =>{
      let found = false;
      this.state.ScreeningsList.forEach(x => {
        if(this.isDateTheSame(this.state.date, x.date)){
          found = true;
          return;
        };
      })
      return found;
    }

     render(){
        let screenings = this.state.ScreeningsList;
        let movies = this.state.MoviesList;
        let content;

        if(this.isAnyFilmThisDay()){
          content = 
          <table className="t-table">
              <tbody>
                <tr>
                  <th>Film</th>
                  <th>Sala</th>
                  <th>Data</th>
                  <th>Godzina</th>
                  <th></th>
                </tr>
                {screenings.map((x,key)=>{
                  if(this.isDateTheSame(this.state.date, x.date)){
                    return(
                      <tr key={key}>
                        {movies.map((e)=>{
                          if(x.movie === e.id)
                            return(<td key={e.id}>{e.title}</td>);
                          return null;
                        })}
                        <td>{x.room}</td>
                        <td>{x.date}</td>
                        <td>{x.hour}</td>
                        <td><a href = {"/buyTicket/" + x.id}>Kup bilet</a></td>
                      </tr>
                    )}
                  return null;
                  })
                }
              </tbody>
            </table>
        }
        else{
          content = <h2>Brak seansów w dzisiejszym dniu</h2>
        }
        return(
          <div className="App">
            <h1>Seanse w dzisiejszym dniu</h1>
            <p><input className="s-input" id="date" type="date" onChange={this.onChange} defaultValue = {new Date()}/></p>
            {content}
          </div>
        );
    }
}

export default Home;