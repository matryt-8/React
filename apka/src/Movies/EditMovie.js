import React, { Component } from "react";
import axios from "axios";
import "../Styles/Table.css";
import "../Styles/Button.css";
import PropTypes, {  } from 'prop-types';
import { Redirect } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:7777/";

class EditMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            title: "",
            duration: 0,
            description: "",
            redirect: false
        }
    }

    componentDidMount = () => {
        let id = this.props.id;
        console.log(id);
        axios.get("movie/"+id)
          .then((response)=>{
            console.log("response",response.data);
            this.setState({
              id: id,
              title: response.data.title,
              duration: response.data.duration,
              description: "brak" ////
            })
          })
          .catch((error)=>{
            console.log("error",error)
          })
      }

    editMovie = () => {
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
        state.title = String(state.title);
        state.duration = parseFloat(state.duration);
        state.redirect = true;
        
        this.editMovieOnServer(state);
    }

     async editMovieOnServer(newState) {
        const editMovieOnServer = this.props.editMovie;
        await editMovieOnServer(newState);
        this.setState({
            redirect: newState.redirect
          });
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
                                <input type="string" id="title" value={this.state.title} placeholder="Write title... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="number" step="0.1" id="duration" value={this.state.duration} placeholder="Write duration... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="string" id="description" value={this.state.description} placeholder="Write description... " onChange={this.onChange} />
                                </td>

                            </tr>
                            
                        </tbody>
                    </table>
                    
                    
                    <button class="button button" onClick={this.editMovie}>Zatwierdź nowe dane filmu</button>
                    
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

export default EditMovie;

EditMovie.propTypes = {
    id: PropTypes.number.isRequired
};