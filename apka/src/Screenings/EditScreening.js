import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "../Styles/Screenings.css";

axios.defaults.baseURL = "http://localhost:7777/";

class EditScreening extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            screening: [],
            date: new Date(),
            hour: new Date().getHours(),
            movie: 0,
            room: 0,
            RoomsList: [],
            MoviesList: []
        };
        // bindowanie funkcji asynchronicznych
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount () {
        await axios.get("/screening/"+this.props.id)
            .then((response)=>{
                console.log("response",response.data);
                this.setState({
                    screening: response.data,
                    date: response.data.date,
                    hour: response.data.hour,
                    movie: response.data.movie,
                    room: response.data.room
                })
            })
            .catch((error)=>{
                console.log("error",error);
            })

        await axios.get("/rooms")
        .then((response)=>{
        this.setState({
            RoomsList: response.data
        })
        })
        .catch((error)=>{
        console.log("error",error)
        })

        await axios.get("/movies")
            .then((response)=>{
                this.setState({
                    MoviesList: response.data
                })
            })
            .catch((error)=>{
                console.log("error",error)
        })

        this.setDefaultValues();
    }

    setDefaultValues = () =>{
        document.getElementById("date").value = this.state.date;
        document.getElementById("hour").value = this.state.hour;
        document.getElementById("movie").value = this.state.movie;
        document.getElementById("room").value = this.state.room;
    }

    async onClick() {
        var data={
            date: this.state.date,
            hour: this.state.hour,
            movie: parseInt(this.state.movie),
            room: parseInt(this.state.room)
        }
        await this.props.onSubmit(this.state.screening,data);
        this.setState({
            redirect: true
        });
    }

    onChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    render(){
        if(this.state.redirect === true)
        {
            return <Redirect to="/screenings"/>
        }
        let rooms = this.state.RoomsList;
        let movies = this.state.MoviesList;
        return(
            <div className="s-div">
                <h1>Edycja seansu</h1>
                <p><label className="s-label">Data</label></p>
                <p><input className="s-input" id="date" type="date" onChange={this.onChange}/></p>
                <p><label className="s-label">Godzina</label></p>
                <p><input className="s-input" id="hour" type="time" onChange={this.onChange}/></p>
                <p><label className="s-label">Film</label></p>
                <p>
                    <select className="s-input" id="movie" onChange={this.onChange}>
                        {movies.map((e)=>{
                            return(
                                <option key={e.id} value={e.id}>{e.title}</option>
                            )}
                        )}
                    </select>
                </p>
                <p><label className="s-label">Sala</label></p>
                <p>
                    <select className="s-input" id="room" onChange={this.onChange}>
                        {rooms.map((e)=>{
                            return(
                                <option key={e.nr} value={e.nr}>{e.nr +" ("+e.capacity+")"}</option>
                            )}
                        )}
                    </select>
                </p>
                <button className="App-button" onClick={this.onClick}>Zatwierdź</button>
            </div>
        );
    }
}
export default EditScreening;

EditScreening.propTypes ={
    id: PropTypes.number.isRequired
}