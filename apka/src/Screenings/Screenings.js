import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css"

axios.defaults.baseURL = "http://localhost:7777/";

class Screenings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ScreeningsList: []
    };
  }

  componentDidMount = () => {
    axios.get("/screenings")
      .then((response)=>{
        this.setState({
          ScreeningsList: response.data
        })
      })
      .catch((error)=>{
        console.log("error",error)
      })
  }

  render(){
    let screenings = this.state.ScreeningsList;
    return(
      <div className="App">
        <h1>Seanse</h1>
        <table className="table">
          <tbody>
          <tr>
            <th>Data</th>
            <th>Godzina</th>
            <th>Film</th>
            <th>Sala</th>
            <th>Ilość biletów</th>
            <th>Zajęte miejsca</th>
            <th></th>
            <th></th>
          </tr>
          {screenings.map((x,key)=>{
            return(
              <tr key={key}>
                <td>{x.date}</td>
                <td>{x.hour}</td>
                <td>{x.movie}</td>
                <td>{x.room}</td>
                <td>{x.free_tickets}</td>
                <td>{x.taken_seats.map((nr,key)=>{
                  if(nr === x.taken_seats[x.taken_seats.length-1])
                    return(<p key={key} className="p">{nr}</p>)
                  else
                    return(<p key={key} className="p">{nr +", "}</p>)
                  })}
                </td>
                <td><a href={"/editscreening/"+x.id}>Edytuj</a></td>
                <td>Usuń</td>
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