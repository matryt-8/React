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
      };
    }

    componentDidMount = () => {
        this.getMovies();
        this.getScreenings();
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

     isDateToday = (date) =>
     {
         var selectedDate = new Date(date);
         var currentDate = new Date();
         if(selectedDate.getFullYear() === currentDate.getFullYear() &&
             selectedDate.getMonth() === currentDate.getMonth() &&
             selectedDate.getDay() === currentDate.getDay())
             return true;
         return false;
     }

     render(){
        let screenings = this.state.ScreeningsList;
        let movies = this.state.MoviesList;
        return(
          <div className="App">
            <h1>Seanse</h1>
            <h2>{new Date().toLocaleDateString()}</h2>
            <table className="t-table">
              <tbody>
                <tr>
                  <th>Film</th>
                  <th>Sala</th>
                  <th>Data</th>
                  <th>Godzina</th>
                </tr>
                {screenings.map((x,key)=>{
                  if(this.isDateToday(x.date)){
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
                      </tr>
                    )}
                  return null;
                  })
                }
              </tbody>
            </table>
          </div>
        );
    }
}

export default Home;