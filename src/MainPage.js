import React, { Component } from 'react'
import Header from './Header'
import Calendar from './Calendar'
import MyButton from "./MyButton";
import moment from 'moment'
import Manage from "./Manage";
import Board from "./Board";
import './style/RCA.css'
export default class MainPage extends Component {


    state = {
        calendarYM : moment(),
        today : moment(),
        selected : moment().format("YYYY-MM-DD")
    }

    static defaultProps = {
        clickFn : ()=>{}
    }


    //달(momth) 이동
    moveMonth = (month) => {
        this.setState({
            calendarYM : this.state.calendarYM.add(month,'M')
        })
    }
    //manage용 클릭한 날짜 지정
    setDay = (day) => {
        this.setState({
            setDay : day
        })
    }

    setUser = (user) =>{
        this.setState({
            setUser : user
        })
    }

    //Manage draw
    drawManage = (clickedDate) =>{

        if(moment(clickedDate).isSame(this.state.selected,'day')){
            this.props.clickFn(clickedDate);
            return;
        }

        this.setState({
            clickedDate : clickedDate
        })

        this.props.clickFn(clickedDate)

        if(moment(clickedDate).isSame(this.state.calendarYM,'day')){
            this.setDay(clickedDate);
        }
    }

    changeSelected = (clickedDate) =>{
        if(moment(clickedDate).isSame(this.state.selected,'day')){
            this.props.clickFn(clickedDate);

            return;
        }

        this.setState({
            selected : clickedDate
        })

        this.props.clickFn(clickedDate)

        if(moment(clickedDate).isBefore(this.state.calendarYM,'month')){
            this.moveMonth(-1)
        }else if(moment(clickedDate).isAfter(this.state.calendarYM,'month')){
            this.moveMonth(1)
        }

    }



    render() {
        return (
            <div className="RCA-app-container">
                <MyButton/>
                <Board/>
                <Header calendarYM={this.state.calendarYM.format("YYYY년 MM월")}
                        today={this.state.today.format("현재 YYYY - MM - DD")}
                        moveMonth={this.moveMonth}
                />
                <Calendar YM={this.state.calendarYM.format("YYYY-MM-DD")}
                          selected={this.state.selected}
                          changeSelected={this.changeSelected}
                />
                <Manage selected={this.state.selected}
                        setDay={this.drawManage}/>

            </div>
        )
    }
}