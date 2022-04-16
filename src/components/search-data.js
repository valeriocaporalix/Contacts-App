import React, {Component} from "react";
import axios from "axios";
import People from "./contacts"

export default class SearchData extends Component {
    constructor(props){
        super(props)

        this.state = {
            search: "",
            selected: "name",
            dataRaw: [],
            dataFound: [],
            enableDelete : "OFF",
            errorMessage: "",
            styleDELETE: "enable-delete",

        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSelected = this.onChangeSelected.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.sortArray = this.sortArray.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then((res) => {
                this.setState({ 
                    dataRaw: res.data
                 })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteContact(id) {
        if(this.state.enableDelete === "ON") {
            axios.delete('http://localhost:5000/'+id)
                .then(response => console.log(response.data));
            this.setState({
                dataFound: this.state.dataFound.filter(el => el._id !== id)
            })
            window.location = '/';
        } else {this.setState({ 
            errorMessage : "Unable to delete contact."
            })
            window.scrollTo(0, 0);
            console.log("Unable to delete contact.")
            }
    }

    onChangeSearch = (e) => {
        this.setState({
            search: e.target.value,
            errorMessage: ""
        })
    }
    onChangeSelected = (e) => {
        this.setState({
            selected: e.target.value,
            dataFound: [],
            errorMessage: ""
        })
    }

    placeholderInteractive () {
       return "Search by " + 
       this.state.selected
        .toString()
        .charAt(0)
        .toUpperCase() + 
       this.state.selected.toString()
        .slice(1)
    }

    sortArray = (x, y) => {
        if (x[this.state.selected] < y[this.state.selected]) {return -1;}
        if (x[this.state.selected] > y[this.state.selected]) {return 1;}
        return 0;
    }


    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.search === "CONTACTS") {
            this.setState({
                dataFound : this.state.dataRaw.sort(this.sortArray),
                errorMessage: ""
            })
            console.log("Searching all contacts sorted by " + this.state.selected)
        } else {
        this.setState({
            dataFound: this.state.dataRaw
                .filter(find => 
                    find[this.state.selected].toLowerCase() === this.state.search.toLowerCase())
        })
        console.log("Searching " + this.state.selected + " : " +this.state.search)
    }}

    dataNotFound() {
        if(this.state.dataFound.length === 0) {
            return (
            <tr className="no-data-found">
                <td className="no-data-found-td">No Data Found</td>
            </tr>
            )
        }
    }
    dataFoundArray() {
        return this.state.dataFound.map(i => {
            return <People data={i} 
            deleteContact={this.deleteContact} 
            key={i._id} />;
        })
    }

    title() {
        if(this.state.dataFound.length === 0 ) {
            if(this.state.search === "") {
            return "Type CONTACTS to get all data submitted,\nsorted by search criteria.\nOr select a search criteria and type search\nparameter to get a filtered research.\nIf you want to delete contacts,\nclick Enable Delete and then choose\nwhich contact do you want to delete."
            } else if(this.state.search === "CONTACTS") {
                return "Click \"Search\" button to start research sorted by " + this.state.selected
                .charAt(0)
                .toUpperCase() + 
            this.state.selected
                .slice(1) + "."
            } else if(this.state.search !== "") {
                return "Select search criteria and type research parameter.\nThen start research by clicking \"Search\" button."
            }
        } else {
            return "Enjoy your research!\nIf you missed someone,\nyou can add a contact's card\nthrough the left page section."
        }
    }

    switchDelete = () => {
        if(this.state.enableDelete === "OFF") {
            this.setState({
                enableDelete : "ON",
                styleDELETE: "enable-delete-puls"
            })
        } else if(this.state.enableDelete === "ON") {
            this.setState({
                enableDelete : "OFF",
                styleDELETE: "enable-delete"
            })
        }
    }


    render() {
        return(
            <div className="column-B">
                <h1 className="title-search">Contacts
                <span id="title-span" title={this.title()}>&#9432;</span>
                </h1>
                <form className="search-form" onSubmit={this.onSubmit}>
                    <select
                        className="search-select"
                        required
                        value={this.state.selected}
                        onChange={this.onChangeSelected}>
                            <option value="name">Name</option>
                            <option value="surname">Surname</option>
                            <option value="address">Address</option>
                            <option value="phone">Phone</option>
                            <option value="email">Email</option>
                        </select>
                    <div>
                        <input id="search-input-txt" 
                            type="text"
                            required
                            placeholder={this.placeholderInteractive()}
                            value={this.state.search}
                            onChange={this.onChangeSearch} />
                    </div>
                    <input id="search-input-btn" type="submit" value="Search"></input>
                </form> 
                <div className="delete-section">
                <button id={this.state.styleDELETE} onClick={this.switchDelete}>Delete</button>
                        <p id="delete-par">{this.state.errorMessage}</p>   
                </div>   
                <table>
                    <tbody>
                        {this.dataFoundArray()}
                        {this.dataNotFound()}
                    </tbody>
                </table>
            </div>
        )
    }
}