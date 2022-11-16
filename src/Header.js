import React, {Component} from 'react'
import Select from 'react-select'
import axios from "axios";

class UserSelect extends Component{

    users =[
    ]
    componentWillMount(){
        this.getAllUsers();
    }
    getAllUsers(){
        var users=[];
       //axios.get('http://3.134.81.24:5000/api/getAlluser',{
       axios.get('http://localhost:3000/api/getAlluser',{
       })
           .then(res =>
               [].forEach.call(res.data,function (item,index){
                   users.push({value: res.data[index].name, label:res.data[index].name});
               })
           );
       this.users = users;
    }
    userChange =(value)=>{
        localStorage.setItem("username", value);
        window.location.reload()

    }

    render() {
        return(
            <div className="RCA-header-select">
                <Select placeholder={localStorage.getItem("username")}
                        onChange={(value)=>{
                        this.userChange(value.value);
                        }}
                        options={this.users}>

                </Select>
            </div>
        )
    }

}

export default class Header extends Component {
    render() {
        return (
            <div className="RCA-header-container">
                <UserSelect/>
                <h2 id="select-name"></h2>
                <h2 className="RCA-header-calendarYM RCA-header-middle">
                    {this.props.calendarYM}
                </h2>

                <h3 className="RCA-header-today RCA-header-middle">
                    {this.props.today}
                </h3>

                <ul className="RCA-header-buttons RCA-header-middle">

                    <li>
                        <i className="move-button left-img icon" onClick={()=>{this.props.moveMonth(-1)}}>
                        </i>
                    </li>
                    <li>
                        이동
                    </li>
                    <li>
                        <i className="move-button right-img icon" onClick={()=>{this.props.moveMonth(1)}}>
                        </i>
                    </li>
                </ul>
                <button className="logout-button" onClick={()=>{localStorage.setItem("manager", 0)}}>
                    logout
                </button>
            </div>
        )
    }
}