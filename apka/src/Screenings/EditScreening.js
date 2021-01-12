import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
        };
    }

    componentDidMount = () => {
        axios.get("/screening/"+this.props.id)
            .then((response)=>{
                console.log("response",response.data);
                this.setState({
                    screening: response.data,
                    date: response.data.date,
                    hour: response.data.hour,
                    movie: response.data.movie,
                    room: response.data.room
                })
                document.getElementById("date").value = response.data.date;
                document.getElementById("hour").value = response.data.hour;
                document.getElementById("movie").value = response.data.movie;
                document.getElementById("room").value = response.data.room;
            })
            .catch((error)=>{
                console.log("error",error);
            })
    }

    onClick = () =>
    {
        var data={
            date: this.state.date,
            hour: this.state.hour,
            movie: parseInt(this.state.movie),
            room: parseInt(this.state.room)
        }
        this.props.onSubmit(this.state.screening,data);
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
        return(
            <div className="s-div">
                <h1>Dodawanie seansu</h1>
                <p><label className="s-label">Data</label></p>
                <p><input className="s-input" id="date" type="date" onChange={this.onChange}/></p>
                <p><label className="s-label">Godzina</label></p>
                <p><input className="s-input" id="hour" type="time" onChange={this.onChange}/></p>
                <p><label className="s-label">Film</label></p>
                <p><input className="s-input" id="movie" onChange={this.onChange}/></p>
                <p><label className="s-label">Sala</label></p>
                <p><input className="s-input" id="room" onChange={this.onChange}/></p>
                <button className="button" onClick={this.onClick}>Zatwierdź</button>
            </div>
        );
    }
}
export default EditScreening;