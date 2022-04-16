import React, { Component } from 'react';
import axios from "axios";

export default class CreateData extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: "",
            surname: "",
            address: "",
            phone: "",
            email: "",
            dataToMatch: [],
            exists: ""
        }
        this.handlerName = this.handlerName.bind(this);
        this.handlerSurname = this.handlerSurname.bind(this);
        this.handlerAddress = this.handlerAddress.bind(this);
        this.handlerPhone = this.handlerPhone.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then((res) => {
                this.setState({ 
                    dataToMatch: res.data
                 })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handlerName = (e) => {
        this.setState({
            name: e.target.value,
            exists: ""
        })
    }

    handlerSurname = (e) => {
        this.setState({
            surname: e.target.value,
            exists: ""
        })
    }

    handlerAddress = (e) => {
        this.setState({
            address: e.target.value,
            exists: ""
        })
    }

    handlerPhone = (e) => {
        this.setState({
            phone: e.target.value,
            exists: ""
        })
    }

    handlerEmail = (e) => {
        this.setState({
            email: e.target.value,
            exists: ""
        })
    }

    alreadyExists = (ex) => {
        return ex.name.toLowerCase() === this.state.name.toLowerCase() && ex.surname.toLowerCase() === this.state.surname.toLowerCase() && ex.address.toLowerCase() === this.state.address.toLowerCase();
      }

    handlerSubmit = (e) => {
        e.preventDefault();

        const dataIncoming = {
            name: this.state.name,
            surname: this.state.surname,
            address: this.state.address,
            phone: this.state.phone,
            email: this.state.email
        }
        if(this.state.dataToMatch.find(this.alreadyExists) == null) {
        axios.post('http://localhost:5000/add', dataIncoming)
            .then(res => console.log(res))

            window.location = '/';
        } else {
            this.setState({
                exists: "Contact Already Exists"
            })
            console.log("Contact Already Exists")
        }
    }

    render () {
        return(
            <div className='column-A'>
                <form  onSubmit={this.handlerSubmit}>
                    <div className='form-group'>
                        <label>Name: </label>
                        <input className='input-group' 
                            type="text"
                            required
                            placeholder="Insert your name"
                            value={this.state.name}
                            onChange={this.handlerName}/>
                    </div>

                    <div className='form-group'>
                        <label>Surname: </label>
                        <input className='input-group'
                            type="text"
                            required
                            placeholder="Insert your surname"
                            value={this.state.surname}
                            onChange={this.handlerSurname} />
                    </div>

                    <div className='form-group'>
                        <label>Address: </label>
                        <input className='input-group'
                            type='text'
                            required
                            placeholder="Insert your address"
                            value={this.state.address}
                            onChange={this.handlerAddress} />
                    </div>

                    <div className='form-group'>
                        <label>Phone: </label>
                        <input className='input-group'
                            type='number'
                            required 
                            placeholder="Insert your phone number"
                            value={this.state.phone} 
                            onChange={this.handlerPhone} />
                    </div>

                    <div className='form-group'>
                        <label>Email: </label>
                        <input className='input-group'
                            type='text'
                            required 
                            placeholder="Insert your email address"
                            value={this.state.email}
                            onChange={this.handlerEmail} />
                    </div>
                    <br/>
                    <div className='form-group'>
                        <input id="create-data" type="submit" value="Create Data" className="form-btn" />
                    </div>
                    <p className='exists-popup'>{this.state.exists}</p>
                </form>
            </div>
        )
    }
}
