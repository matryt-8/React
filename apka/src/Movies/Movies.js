import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"

axios.defaults.baseURL = "http://localhost:7777/";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MoviesList: []
    };
  }

  componentDidMount = () => {
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

  render(){
    let movies = this.state.MoviesList;
    return(
      <div className="App">
        <h1>Filmy</h1>
        <table className="table">
          <tbody>
          <tr>
            <th>Tytuł</th>
            <th>Czas trwania</th>
            <th>Opis</th>
            <th></th>
            <th></th>
          </tr>
          {movies.map((x,key)=>{
            return(
              <tr key={key}>
                <td>{x.title}</td>
                <td>{x.duration}</td>
                <td>brak opisu</td>
                <td>Edytuj</td>
                <td>Usuń</td>
              </tr>
            )})
          }
          </tbody>
        </table>
      </div>
    );
  }
}
export default Movies;