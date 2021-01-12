import React, { Component } from "react";
import axios from "axios";
import "../Styles/Table.css";
import "../Styles/Button.css";
import { Redirect } from "react-router-dom";
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
        const addMovieOnServer = this.props.addMovie;
        addMovieOnServer(this.state);
        this.redirection();
    }

    async redirection(){
        this.setState({
            redirect: true
        })
    }

    onChange = (event) =>
    {
        let value = event.target.value;
        let name = event.target.id;
        
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
                                <input type="number" id="duration" placeholder="Write duration... " onChange={this.onChange} />
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