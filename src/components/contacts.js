import React, {Component} from "react";

export default class People extends Component {
    constructor(props) {
        super(props)

        this.state = {
            default: ""
        }
    }
  
    render() {
        return (
    <tr className="responsive-table">
        <td>
            <button className="delete-btn" href='/' onClick={() => {this.props.deleteContact(this.props.data._id)}}>&#10006;</button>
        </td>
        <td className="td-props">Name: &nbsp; {this.props.data.name}</td>
        <td className="td-props">Surname: &nbsp; {this.props.data.surname}</td>
        <td className="td-props">Address: &nbsp; {this.props.data.address}</td>
        <td className="td-props">Phone: &nbsp; {this.props.data.phone}</td>
        <td className="td-props">Email: &nbsp; {this.props.data.email}</td>
    </tr>
        )
    }
} 