import React, { Component } from "react";
import axios from "axios";
import "../Styles/Table.css";
import "../Styles/Button.css";

axios.defaults.baseURL = "http://localhost:7777/";

class EditMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: null,
            title: "",
            duration: 0,
            description: ""
        }
    }

    componentDidMount = () => {
        let id = this.props.id; //.id //const {id} 
        console.log(id);
        axios.get("movie/"+id)  //movies/+id //`movies/${id}`
          .then((response)=>{
            console.log("response",response.data);
            this.setState({
              id: id,
              title: response.data.title,
              duration: response.data.duration,
              description: "brak"
            })
          })
          .catch((error)=>{
            console.log("error",error)
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
                                <input type="text" id="title" value={this.state.title} placeholder="Write title... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="number" id="duration" value={this.state.duration} placeholder="Write duration... " onChange={this.onChange} />
                                </td>
                                <td>
                                <input type="text" id="description" value={this.state.description} placeholder="Write description... " onChange={this.onChange} />
                                </td>

                            </tr>
                            
                        </tbody>
                    </table>
                    
                    
                    <button class="button button" onClick={this.editMovie}>Zatwierdź nowe dane filmu</button>
                    
                </div>
            </div>
        )
    }
}

export default EditMovie;