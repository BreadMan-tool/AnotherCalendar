import React, {Component} from 'react'
import axios from "axios";
import $ from 'jquery'
class DateSide extends Component{
    render() {
        return (
            <div className="RCA-manage-date-side">
                <h3 className="RCA-manage-title">
                    {this.props.selected} 강사 현황
                </h3>
            </div>
        )
    }
}

class ScheduleList extends Component{
    componentDidUpdate() {
        this.resetAllschedule();
        this.DrawAllschedule()
    }
    componentWillUpdate(){
    }
    resetAllschedule(){

    }
    DrawAllschedule(){

    }
    render() {
        return (
            <div className="RCA-manage-schedule-list" id="lili">

            </div>
        )
    }
}

export default class Manage extends Component {

    render() {
        if(localStorage.getItem("manager")==1) {
            return (
                <div className="RCA-manage-container">
                    <DateSide selected={this.props.selected}/>
                    <ScheduleList selected={this.props.selected}/>
                </div>
            )
        }else{
        return (

            <div className="RCA-manage-container">

            </div>
        )
        }
    }
}