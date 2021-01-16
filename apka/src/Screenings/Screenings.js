import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"

axios.defaults.baseURL = "http://localhost:7777/";

class Screenings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ScreeningsList: [],
      MoviesList: []
    };
  }

  componentDidMount = () => {
    console.log("componentDidMount");
    axios.get("/screenings")
      .then((response)=>{
        this.setState({
          ScreeningsList: response.data
        })
      })
      .catch((error)=>{
        console.log("error",error)
      })

      axios.get("/movies")
      .then((response)=>{
        this.setState({
            MoviesList: response.data
        })
      })
      .catch((error)=>{
        console.log("error",error)
      })
  }

  onDelete = (id) =>{
    this.props.delete(id);
  }

  render(){
    let screenings = this.state.ScreeningsList;
    let movies = this.state.MoviesList;
    return(
      <div className="App">
        <h1>Seanse</h1>
        <table className="t-table">
          <tbody>
          <tr>
            <th>Data</th>
            <th>Godzina</th>
            <th>Film</th>
            <th>Sala</th>
            <th>Dostępne bilety</th>
            <th>Zajęte miejsca</th>
            <th></th>
            <th></th>
          </tr>
          {screenings.map((x,key)=>{
            return(
              <tr key={key}>
                <td>{x.date}</td>
                <td>{x.hour}</td>
                {movies.map((e)=>{
                  if(x.movie === e.id)
                    return(<td key={e.id}>{e.title}</td>);
                  return null;
                })}
                <td>{x.room}</td>
                <td>{x.free_tickets}</td>
                <td>{x.taken_seats.map((nr,key)=>{
                  if(nr === x.taken_seats[x.taken_seats.length-1])
                    return(<p key={key} className="t-p">{nr}</p>)
                  else
                    return(<p key={key} className="t-p">{nr +", "}</p>)
                  })}
                </td>
                <td><a href={"/editscreening/"+x.id}>Edytuj</a></td>
                <td><a href={"/screenings"} onClick={this.onDelete.bind(this, x.id)}> Usuń</a></td>
              </tr>
            )})
          }
          </tbody>
        </table>
        <a href="/addscreening">
          <button className="App-button">Dodaj</button>
        </a>
      </div>
    );
  }
}
export default Screenings;