import React, { Component } from "react";
import axios from "axios";
import "../Styles/Table.css";
import "../Styles/Button.css";
import { Redirect } from "react-router-dom";
//import {withRouter} from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:7777/";
class AddMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            duration: 0,
            description: "",
            redirect: false
        }
    }

    addMovie = () => {
        if (this.state.title.length<=0)
        {
            alert('Title of movie must contains at least one character');
            return;
        }
        if (this.state.duration<=0 || typeof(this.state.duration)!=="number")
        {
            alert('Duration of movie must be a number greater than 0h');
            return;
        }
        var regExp = /[a-zA-Z]/g;
        if (this.state.description.length<4 || !regExp.test(this.state.description))
        {
            alert('Description of movie must contains at least four characters and contains at least one letter');
            return;
        }
        let state = this.state;
        state.title = String(state.title);//
        state.duration = parseFloat(state.duration);//
        //state.redirect = true;
        
        this.addMovieBeforeReload(state);
        

    }


      async addMovieBeforeReload(newState) {
        //const addMovieOnServer = this.props.addMovie;
        await this.props.addMovie(newState);

            this.setState({
                redirect:true});

        
    }

    onChange = (event) =>
    {
        let value = event.target.value;
        let name = event.target.id;

        if (name==="duration")
        {
             if(/\d/.test(value)) //działa tylko wtedy jak wszystko jest liczbą..
             {
                 value = parseFloat(value); //only digits; number type
                 
             }
        }
        this.setState({
            [name]: value
        })
    }

    

    render() {
        if (this.state.redirect!==true)
        return (
            <div>
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                            <th>Tytuł</th>
                            <th>Czas trwania (h)</th>
                            <th>Opis</th>
                            </tr>

                            <tr>
                                <td>
                                <input type="text" id="title" placeholder="Write title... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="number" step="0.1" id="duration" placeholder="Write duration... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="text" id="description" placeholder="Write description... " onChange={this.onChange} />
                                </td>

                            </tr>
                            
                        </tbody>
                    </table>
                    
                    
                    <button class="button button" onClick={this.addMovie}>Zatwierdź dane nowego filmu</button>
                    
                </div>
            </div>
        )
        else
        {
            return (
                <Redirect to="/movies"/>
            )
        }
        
    }
}

export default AddMovie;