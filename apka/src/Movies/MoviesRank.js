import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css";
import "../Styles/Button.css";

axios.defaults.baseURL = "http://localhost:7777/";

class MoviesRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      MoviesList: [],
      ScreeningsList:[]
    };
  }

  componentDidMount = () => {
    this.setState({
        date: this.props.date
    })
    this.getMovies();
    this.getScreenings();
  }

  getMovies() {
    axios.get("/movies")
    .then((response)=>{
      console.log("response", response.data);
      this.setState({
          MoviesList: response.data
      })
    })
    .catch((error)=>{
      console.log("error", error)
    })
  }

  getScreenings() {
    axios.get("/screenings")
    .then((response)=>{
        console.log("response", response.data);
        this.setState({
            ScreeningsList: response.data
        })
    })
    .catch((error)=>{
        console.log("error", error);
    })

  }


  render(){
    let MoviesList = this.state.MoviesList;
    let ScreeningsList = this.state.ScreeningsList;
    for (let i = 0; i<ScreeningsList.length;i++)
    {
      console.log(typeof(ScreeningsList[i].date))
      if (ScreeningsList[i].date!==this.state.date)
      {
        ScreeningsList.splice(i,1);
      }
    }
    console.log(ScreeningsList);
    
    MoviesList.forEach(movie => {
        movie.Active = "soldTickets";
        movie.soldTickets = 0;
        ScreeningsList.forEach(screening =>{

            
            if (movie.id === screening.movie)
            {
                console.log(movie.title+"ZNALEZIONY")
                console.log(screening.taken_seats.length+"DoDodania")
                movie.soldTickets += screening.taken_seats.length;
            }

            
        })
        console.log(movie.soldTickets+"Ostatecznie")
    })
    
    console.log(MoviesList)

    let SortedNewMoviesList = MoviesList.sort(({soldTickets: a}, {soldTickets:b})=>b-a);
    console.log(SortedNewMoviesList)

    
    return(
      <div className="App">
        <h1>Ranking filmów dla {this.state.date}</h1>
        <table className="t-table">
            <tbody>
                <tr>
                    <th>L.p.</th>
                    <th>Tytuł</th>
                    <th>Zakupione bilety</th>
                </tr>
                {SortedNewMoviesList.map((x,index)=>{
                    return(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{x.title}</td>
                        <td>{x.soldTickets}</td>
                      </tr>
                    )})
                }
 
            </tbody>

        </table>
      </div>
    )
  }
}
export default MoviesRank;