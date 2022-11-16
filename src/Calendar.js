import React, { Component } from 'react'
import moment from 'moment'
import axios from "axios";

class DateHeader extends Component {

    dateToArray = (dates) => {
        if(Array.isArray(dates)){
            return dates
        }else if(typeof dates === "string"){
            return dates.split(',')
        }else{
            return ["일", "월", "화", "수", "목", "금", "토"]
        }
    }

    mapArrayToDate = (dateArray) => {
        try{
            if(dateArray.length !== 7){
                console.log(new Error("dates props must be had 7 date"))
                dateArray = ["일", "월", "화", "수", "목", "금", "토"]
            }

            return dateArray.map((date, index) => {
                const className = ()=>{
                    let className = "RCA-calendar-date-component";
                    if(index === 0){
                        return className + " date-sun"
                    }else if(index === 6){
                        return className + " date-sat"
                    }else{
                        return className + " date-weekday"
                    }
                }
                return (
                    <div className={className()} key={"RCA-header-"+date}>
                        {date}
                    </div>
                )
            })
        }catch{
            throw new Error ("date must be string or component")
        }
    }

    render() {
        return (
            <div className="RCA-calendar-date-header">
                {this.mapArrayToDate(this.dateToArray(this.props.dates))}
            </div>
        )
    }
}

class Week extends Component {

    componentDidMount() {
        this.getscheduleByName();
    }
    getscheduleByName(){
        var name=localStorage.getItem("username");
        //axios.get('http://3.134.81.24:5000/api/getschedule/'+name,{
        axios.get('http://localhost:3000/api/getschedule/'+name,{
        })
            .then(res=> {
                [].forEach.call(res.data, function (item, index) {
                    var str = (item.taskdate + "-" + item.tasknum);
                    var cbox = document.getElementById(str);
                    if(cbox!=null){
                        cbox.checked=true;
                    }
                })
            });
    }

    checkChange =({target})=>{
        var date = target.id.substr(0,10);
        var task = target.id.substr(11,12);
        let data={
            uname:localStorage.getItem("username"),
            taskdate:date,
            tasknum:task
        }
        if(data.uname!==null){
            if(target.checked){
                //axios.post('http://3.134.81.24:5000/api/schedule', (data))
                axios.post('http://localhost:3000/api/schedule', (data))
            }else{
                //axios.delete('http://3.134.81.24:5000/api/schedule', {data:data})
                axios.delete('http://localhost:3000/api/schedule', {data:data})
            }
        }
    }
    Days = (firstDayFormat,weekIndex) => {
        const _days = [];

        for (let i = 0; i < 7; i++) {

            const Day = moment(firstDayFormat).add('d', i);
            _days.push({
                yearMonthDayFormat: Day.format("YYYY-MM-DD"),
                getDay: Day.format('D'),
                isHolyDay: false,
                weekIndex
            });
        }
        return _days;
    }

    mapDaysToComponents = (Days,calendarMonthYear ,selectedDayFormat ,fn = () => { }) => {

        const thisMonth = moment(calendarMonthYear);
        return Days.map((dayInfo, i) => {

            let className = "date-weekday-label";

            if (!thisMonth.isSame(dayInfo.yearMonthDayFormat,'month')) {
                className = "date-notThisMonth";
            } else if (i === 0) {
                className = "date-sun"
            }else if(i===6){
                className ="date-sat"
            }

            //선택 날짜 구분하기
            //selectedDayFormat = 선택된 날짜 20xx-xx-xx 형식
            if(moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat,'day')){
                className="selected";
                    document.cookie=selectedDayFormat;
                    console.log(document.cookie);
                if(localStorage.getItem("manager")==1){

                }
            }
            if(className!=="date-notThisMonth"){
                return (
                    <div className={"RCA-calendar-day " + className}key={`RCA-${dayInfo.weekIndex}-${i}-day`}onClick={() => fn(dayInfo.yearMonthDayFormat)}>
                        <label className="RCA-calendar-day-label">
                            {dayInfo.getDay}
                        </label>
                        <div className="RCA-calendar-day-container" id="testing">
                            <div className="RCA-calendar-day-layout-1">
                                <input type="checkbox" className="check_list" onChange={(e)=>{
                                    this.checkChange(e);
                                }} id={`${dayInfo.yearMonthDayFormat}-0`}/> 지방 6차시

                                {/*<input type="checkbox" className="check_list" onChange={(e)=>{*/}
                                {/*    this.checkChange(e);*/}
                                {/*}}id={`${dayInfo.yearMonthDayFormat}-1`}/> 지방 4차시*/}

                            </div>
                            <div className="RCA-calendar-day-layout-2">
                                <input type="checkbox" className="check_list" onChange={(e)=>{
                                    this.checkChange(e);
                                }}id={`${dayInfo.yearMonthDayFormat}-2`}/> 수도권 6차시
                                <input type="checkbox" className="check_list" onChange={(e)=>{
                                    this.checkChange(e);
                                }}id={`${dayInfo.yearMonthDayFormat}-3`}/> 수도권 4차시
                            </div>
                        </div>
                    </div>
                )
            }else
            return (
                    <div className={"RCA-calendar-day " + className}key={`RCA-${dayInfo.weekIndex}-${i}-day`}onClick={() => fn(dayInfo.yearMonthDayFormat)}>
                        <label className="RCA-calendar-day-label">
                            {dayInfo.getDay}
                        </label>
                    </div>
            )
        })
    }
    render() {
        return (
            <div className="RCA-calendar-week">
                {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat,this.props.weekIndex),
                    this.props.ymOfThisCalendar,
                    this.props.selected,
                    this.props.fn
                )}
            </div>
        )
    }
}

export default class Calendar extends Component {

    componentDidUpdate = (prevProps, prevState) => { //componentDidUpdate가 props의 변과를 감지한다
        if (this.props.YM !== prevProps.YM) { //하위컴포넌트가 받은 props값 적어주기(둘다)
            this.getscheduleByName();

        }
    };
    getscheduleByName(){
        document.querySelectorAll(".check_list").forEach(function (v,i){
            v.checked = false;
        });
        var name=localStorage.getItem("username");
        //axios.get('http://3.134.81.24:5000/api/getschedule/'+name,{
        axios.get('http://localhost:3000/api/getschedule/'+name,{
        })
            .then(res=> {
                [].forEach.call(res.data, function (item, index) {
                    var str = (item.taskdate + "-" + item.tasknum);
                    var cbox = document.getElementById(str);
                    if(cbox!=null){
                        cbox.checked=true;
                    }

                    //cbox.checked = true;
                })
            });
    }
    Weeks = (monthYear,selected,clickFn) => {
        const firstDayOfMonth = moment(monthYear).startOf('month');
        const firstDateOfMonth = firstDayOfMonth.get('d');

        const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);

        const _Weeks = [];

        for (let i = 0; i < 6; i++) {
            _Weeks.push((
                <Week key={`RCA-calendar-week-${i}`}
                      weekIndex={i}
                      ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")}
                      firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")}
                      selected={selected}
                      fn={clickFn}
                />
            ))
        }
        return _Weeks
    }

    render() {
        return (
            <div className="RCA-calendar-container">
                <DateHeader dates={"Sun, Mon, Tue, Wed, Thu, Fri, Sat"} />
                {this.Weeks(this.props.YM,this.props.selected,this.props.changeSelected)}
            </div>
        )
    }
}