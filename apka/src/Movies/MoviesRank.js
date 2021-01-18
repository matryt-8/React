import React, { Component } from "react";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Table.css";
import "../Styles/RankButton.css";
import PropTypes, {  } from 'prop-types';

axios.defaults.baseURL = "http://localhost:7777/";

class MoviesRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      SortedNewMoviesList: []
    };
  }

  async componentDidMount () {
    this.setState({
        date: this.props.date
    })
    let MoviesList = await this.getMovies();
    let ScreeningsList = await this.getScreenings();
    let date = this.state.date;
    ScreeningsList = ScreeningsList.filter(function(screening) {return screening.date===date});
    
    MoviesList.forEach(movie => {
        movie.Active = "soldTickets";
        movie.soldTickets = 0;
        ScreeningsList.forEach(screening =>{

            
            if (movie.id === screening.movie)
            {
                movie.soldTickets += screening.taken_seats.length;
            }

            
        })
    })
    let SortedNewMoviesList = MoviesList.sort(({soldTickets: a}, {soldTickets:b})=>b-a);
    SortedNewMoviesList = SortedNewMoviesList.filter( movie=>movie.soldTickets!==0);

    this.setState({
      SortedNewMoviesList: SortedNewMoviesList
    })
  }

  async getMovies() {
    let movies = [];
    await axios.get("/movies")
    .then((response)=>{
      movies = response.data;
    })
    .catch((error)=>{
      console.log("error", error)
    })
    return movies; 
  }

  async getScreenings() {
    let screenings = [];
    await axios.get("/screenings")
    .then((response)=>{
        screenings = response.data;
    })
    .catch((error)=>{
        console.log("error", error);
    })
    return screenings;
  }


  render(){
    let SortedNewMoviesList = this.state.SortedNewMoviesList;
    if (SortedNewMoviesList.length!==0)
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
    else
    {
      return(
        <div className="App">
          <h2>Nie zakupiono jeszcze biletów na żaden seans dnia {this.state.date}</h2>
        </div>
      )

    }
  }
}
export default MoviesRank;
MoviesRank.propTypes = {
  date: PropTypes.string.isRequired
};