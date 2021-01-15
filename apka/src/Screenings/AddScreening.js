import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../Styles/Screenings.css";

axios.defaults.baseURL = "http://localhost:7777/";

class AddScreening extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            date: new Date(null),
            hour: new Date(null),
            movie: 0,
            room: 0,
            RoomsList: [],
            MoviesList: []
        };
        // bindowanie funkcji asynchronicznych
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount = () =>{
        axios.get("/rooms")
            .then((response)=>{
            this.setState({
                RoomsList: response.data
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

    validateInputs = () => {
        let flag = true;
        var date = document.getElementById("date").value;
        if(date === ''){
            flag = false;
            document.getElementById("date-alert").innerHTML = "musisz podać datę";
        }
        else if( !this.isDateOK(date) )
        {
            flag = false;
            document.getElementById("date-alert").innerHTML = "data nie może odnosić się do przeszłości";
        }
        var hour = document.getElementById("hour").value;
        if(hour === ''){
            flag = false;
            document.getElementById("hour-alert").innerHTML = "musisz podać godzinę";
        }
        else if( this.isDateToday(date) && !this.isHourOk(hour)){
            flag = false;
            document.getElementById("hour-alert").innerHTML = "data nie może odnosić się do przeszłości";
        }
        if(this.state.movie === 0){
            flag = false;
            document.getElementById("movie-alert").innerHTML = "musisz wybrać film";
        }
        if(this.state.room === 0){
            flag = false;
            document.getElementById("room-alert").innerHTML = "musisz wybrać salę";
        }
        return flag;
    }

    isDateOK = (date) =>{
        var selectedDate = new Date(date);
        var currentDate = new Date();
        if(selectedDate.getFullYear() < currentDate.getFullYear())
            return false;
        else if(selectedDate.getFullYear() === currentDate.getFullYear())
        {
            if(selectedDate.getMonth() < currentDate.getMonth())
            {
                return false;
            }
            else if(selectedDate.getMonth() === currentDate.getMonth())
            {
                if(selectedDate.getDate() < currentDate.getDate())
                {
                    return false;
                }
            }
        }
        return true;
    }

    isDateToday = (date) =>
    {
        var selectedDate = new Date(date);
        var currentDate = new Date();
        if(selectedDate.getFullYear() === currentDate.getFullYear() &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getDate() === currentDate.getDate())
            return true;
        return false;
    }

    isHourOk = (hour) =>{
        var selectedHour = parseInt(hour.substring(0,2));
        var selectedMinute = parseInt(hour.substring(3));
        var currentHour = new Date().getHours();
        var currentMinute = new Date().getMinutes();
        if(selectedHour < currentHour)
            return false;
        if(selectedHour === currentHour && selectedMinute <= currentMinute)
            return false;
        return true;
    }

    async onClick() {
        if(this.validateInputs() === false)
        {
            return;
        }
        
        var data={
            date: this.state.date,
            hour: this.state.hour,
            movie: parseInt(this.state.movie),
            room: parseInt(this.state.room)
        }
        console.log("data",data);
        await this.props.onSubmit(data);
        this.setState({
            redirect: true
        });
    }

    onChange = (e) =>{
        document.getElementById([e.target.id]+"-alert").innerHTML= null;
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    render(){
        if(this.state.redirect === true){
            return <Redirect to="/screenings"/>
        }
        let rooms = this.state.RoomsList;
        let movies = this.state.MoviesList;
        return(
            <div className="s-div">
                <h1>Dodawanie seansu</h1>
                <p><label className="s-label">Data</label></p>
                <p><input className="s-input" id="date" type="date" onChange={this.onChange}/></p>
                <label className="s-alert" id="date-alert"></label>
                <p><label className="s-label">Godzina</label></p>
                <p><input className="s-input" id="hour" type="time" onChange={this.onChange}/></p>
                <label className="s-alert" id="hour-alert"></label>
                <p><label className="s-label">Film</label></p>
                <p>
                    <select className="s-input" id="movie" defaultValue={'0'} onChange={this.onChange}>
                        <option disabled value="0"> -- wybierz opcję -- </option>
                        {movies.map((e)=>{
                            return(
                                <option key={e.id} value={e.id}>{e.title}</option>
                            )}
                        )}
                    </select>
                </p>
                <label className="s-alert" id="movie-alert"></label>
                <p><label className="s-label">Sala</label></p>
                <p>
                    <select className="s-input" id="room" defaultValue={'0'} onChange={this.onChange}>
                        <option disabled value="0"> -- wybierz opcję -- </option>
                        {rooms.map((e)=>{
                            return(
                                <option key={e.nr} value={e.nr}>{e.nr +" ("+e.capacity+")"}</option>
                            )}
                        )}
                    </select>
                </p>
                <label className="s-alert" id="room-alert"></label><br/>
                <button className="App-button" onClick={this.onClick}>Zatwierdź</button>
            </div>
        );
    }
}
export default AddScreening;