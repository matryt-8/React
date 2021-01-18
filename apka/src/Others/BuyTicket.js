import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "../Styles/App.css";
import "../Styles/Cinema.css";

axios.defaults.baseURL = "http://localhost:7777/";

class BuyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            Screening: [],
            CinemaSeats: [],
            selected_seats: []
        };
        // bindowanie funkcji asynchronicznych
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount() {
        let id = this.props.id
        let room_id = 0;
        await axios.get("/screening/" + id)
            .then((response)=>{
                //console.log("screening",response.data);
                room_id = response.data.room;
                this.setState({
                    Screening: response.data,
                    taken_seats: response.data.taken_seats
                })
            })
            .catch((error)=>{
                console.log("error",error)
            })

        await axios.get("/room/"+room_id)
            .then((response)=>{
                //console.log("room",response.data);
                let numberOfSeats = response.data.capacity;
                let CinemaSeats = [];
                let tmp = [];
                for(let i = 0; i<numberOfSeats; i++)
                {
                    tmp.push((i % 10));
                    if(i !== 0 && i%10 === 9)
                    {
                        if(i<10)
                            CinemaSeats.push({"row":0,"seats":tmp});
                        else if(i<100)
                            CinemaSeats.push({"row":Math.trunc((i % 100) / 10),"seats":tmp});
                        else
                            CinemaSeats.push({"row":Math.trunc((i % 1000) / 10),"seats":tmp});
                        tmp = [];
                    }
                }
                //console.log("CinemaSeats",CinemaSeats)
                this.setState({
                    CinemaSeats: CinemaSeats
                })
            })
            .catch((error)=>{
                console.log("error",error)
            })
    }

    async onClick() {
        let Screening = this.state.Screening;
        let taken_seats = Screening.taken_seats;
        let selected_seats = this.state.selected_seats;
        console.log("Screening.free_tickets",Screening.free_tickets)
        let free_tickets = Screening.free_tickets - selected_seats.length;
        taken_seats = taken_seats.concat(selected_seats);
        taken_seats.sort((a, b) => a - b);
        var data = {
            taken_seats: taken_seats,
            free_tickets: free_tickets
        }
        console.log("data",data);
        await this.props.onSubmit(Screening,data);

        window.alert("Zakup biletów dokonany!"); // potwierdzenie

        this.setState({
            redirect: true
        });
    }

    onChange = (e) =>{
        let seats = this.state.selected_seats;
        let value = parseInt(e.target.value);
        if(e.target.checked){
            seats.push(value);
        }
        else{
            let index = seats.indexOf(value);
            seats.splice(index,1);
        }
        seats.sort((a, b) => a - b);
        //console.log("seats",seats);
        this.setState({
            selected_seats: seats
        })
    }

    render(){
        if(this.state.redirect === true){
            return <Redirect to="/"/>
        }
        const CinemaSeats = this.state.CinemaSeats;
        const taken_seats = this.state.taken_seats;
        return(
            <div className="App">
                <h1>Kupowanie biletów</h1>
                <p className="c-gray">
                    <input className="c-legend_input" type="checkbox" disabled/>
                    <label className="c-legend_label">Wolne miejsce</label>
                </p>
                <p className="c-red">
                    <input className="c-legend_input" type="checkbox" disabled/>
                    <label className="c-legend_label">Zajęte miejsce</label>
                </p>
                <p className="c-green">
                    <input className="c-legend_input" type="checkbox" disabled/>
                    <label className="c-legend_label">Wybrane miejsce</label>
                </p>
                <table className="c-table">
                    <tbody>
                        <tr>
                            <th className="c-th"></th>
                            <th className="c-th">1</th>
                            <th className="c-th">2</th>
                            <th className="c-th">3</th>
                            <th className="c-th">4</th>
                            <th className="c-th">5</th>
                            <th className="c-th">6</th>
                            <th className="c-th">7</th>
                            <th className="c-th">8</th>
                            <th className="c-th">9</th>
                            <th className="c-th">10</th>
                        </tr>
                        {CinemaSeats.map((row)=>{
                            return(<tr key={row.row}>
                                        <th className="c-th">{row.row}</th>
                                        {row.seats.map((seat,key)=>{
                                            // jezeli miejsce jest zarerwowane to na czerwono
                                            if( taken_seats.includes(parseInt((row.row).toString()+(seat).toString())) ){
                                                return(<td key={key} className="c-td-red">
                                                        <input type="checkbox" disabled/>
                                                    </td>)
                                            }
                                            else{
                                                return(<td key={key} className="c-td">
                                                        <input type="checkbox" value={(parseInt((row.row).toString()+(seat).toString()))} onChange={this.onChange}/>
                                                    </td>)
                                            }
                                        })}
                                    </tr>)
                        })}
                    </tbody>
                </table>
                <br/>
                <button className="App-button" onClick={this.onClick}>Zatwierdź</button>
            </div>
        );
    }
}
export default BuyTicket;

BuyTicket.propTypes ={
    id: PropTypes.number.isRequired
}