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

    constructor() {
        super();

        this.state = {
            num:0
        };
    }

    componentDidMount(){
        console.log("mount");
        console.log(this.state.num);
    }

    componentDidUpdate() {
        console.log("up");
        //console.log(this.state.num);
        this.resetAllschedule();
        this.DrawAllschedule()
        //this.setNum();

    }

    resetAllschedule(){
        var scheduleLine = document.getElementById('lili');
        while(scheduleLine.hasChildNodes()){
            scheduleLine.removeChild(scheduleLine.firstChild);
        }
    }

    DrawAllschedule(){
        var manage_box;
        var schedule_info;
        var today = this.props.selected;
        var schedule_name;
        var insertable = 1;
        var program_name;
        axios.get('http://localhost:3000/api/getscheduledata/'+today,{
        })
            .then(res=>
                [].forEach.call(res.data,function (item,index){
                    //console.log(item.num);
                    manage_box = new Array();
                    schedule_name = new Array();
                    for(var i=0; i<item.num; i++){
                        manage_box.push(0);
                        schedule_name.push(0);
                    }
                        axios.get('http://localhost:3000/api/getschedulelist/'+today,{
                        })
                            .then(res=>
                                [].forEach.call(res.data,function (item,i){
                                    if(item.area==0)
                                        schedule_name[i] = '지방 ';
                                    else
                                        schedule_name[i] = '수도권 ';
                                    switch (item.programname){
                                        case 0:
                                            program_name='수상한 스튜디오'
                                            break;
                                        case 1:
                                            program_name='어나더랜드'
                                            break;
                                        case 2:
                                            program_name='취업조작단'
                                            break;
                                        case 3:
                                            program_name='코드5'
                                            break;
                                        case 4:
                                            program_name='수상한+코드5'
                                            break;
                                        case 5:
                                            program_name='어나더+코드5'
                                            break;
                                        case 6:
                                            program_name='액션카드'
                                            break;
                                        case 7:
                                            program_name='무인도'
                                            break;
                                        case 8:
                                            program_name='기타'
                                            break;
                                    }
                                    schedule_name[i] = schedule_name[i]+
                                        item.schoolname +' '+ item.class +'반 '+
                                        program_name+' '+item.areanumber+'차시';

                                    schedule_info = document.createElement('h3');
                                    schedule_info.style='white-space:nowrap';
                                    schedule_info.id='RCA-schedule-name';
                                    schedule_info.innerText= schedule_name[i];

                                    manage_box[i] = document.createElement('div');
                                    manage_box[i].className = "RCA-manage-line";
                                    manage_box[i].id = "RCA-manage-0";

                                    manage_box[i].appendChild(schedule_info);
                                    var manage_left = document.createElement('div');
                                    manage_left.className="RCA-manage-left";

                                    var p_left_Child = document.createElement('p');
                                    p_left_Child.id=i + '-list-left';
                                    manage_left.appendChild(p_left_Child);

                                    var manage_right = document.createElement('div');
                                    manage_right.className="RCA-manage-right";

                                    var p_right_Child = document.createElement('p');
                                    p_right_Child.id=i + '-list-right';
                                    manage_right.appendChild(p_right_Child);

                                    manage_box[i].appendChild(manage_left);
                                    manage_box[i].appendChild(manage_right);


                                    // 해당 학생 검색
                                    if(item.area=='0'){
                                            axios.get('http://localhost:3000/api/getselectWithArea/' + today + '/' + 0, {})
                                                .then(res =>
                                                    [].forEach.call(res.data, function (item2, index) {
                                                        axios.get('http://localhost:3000/api/getuserDataWithschedule/'+item2.uname,{
                                                        })
                                                            .then(res=>
                                                                [].forEach.call(res.data,function (uitem,index){
                                                                    //
                                                                    var userArr = new Array();
                                                                    userArr[0] = uitem.strange;
                                                                    userArr[1] = uitem.another;
                                                                    userArr[2] = uitem.employment;
                                                                    userArr[3] = uitem.codefive;
                                                                    userArr[4] = uitem.stco;
                                                                    userArr[5] = uitem.anco;
                                                                    userArr[6] = uitem.actioncard;
                                                                    userArr[7] = uitem.disland;
                                                                    userArr[8] = uitem.etc;
                                                                    //
                                                                    if(userArr[item.programname] == 1){
                                                                        var button = document.createElement('input');
                                                                        button.type = 'button';
                                                                        button.value = item2.uname;
                                                                        button.className = 'btn';
                                                                        if(item2.insertable==1) {
                                                                            p_right_Child.appendChild(button);

                                                                            button.onclick = function () {
                                                                                insertable = 0;
                                                                                let data = {
                                                                                    uname: item2.uname,
                                                                                    insertable: insertable,
                                                                                    scheduledata: i,
                                                                                    taskdate: item2.taskdate
                                                                                }
                                                                                axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                            }
                                                                        }else{
                                                                            if(item2.scheduledata==i) {
                                                                                p_left_Child.appendChild(button);
                                                                            }
                                                                            button.onclick = function () {
                                                                                insertable = 1;
                                                                                let data = {
                                                                                    uname: item2.uname,
                                                                                    insertable: insertable,
                                                                                    scheduledata: 99,
                                                                                    taskdate: item2.taskdate
                                                                                }
                                                                                axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                            }
                                                                        }
                                                                    }else{
                                                                        //없음
                                                                    }
                                                                })
                                                            );

                                                    })
                                                );

                                    }
                                    else{
                                        axios.get('http://localhost:3000/api/getselectWithArea/' + today + '/' + 1, {})
                                            .then(res =>
                                                [].forEach.call(res.data, function (item2, index) {
                                                    axios.get('http://localhost:3000/api/getuserDataWithschedule/'+item2.uname,{
                                                    })
                                                        .then(res=> {
                                                            [].forEach.call(res.data, function (uitem, index) {
                                                                //
                                                                var userArr = new Array();
                                                                userArr[0] = uitem.strange;
                                                                userArr[1] = uitem.another;
                                                                userArr[2] = uitem.employment;
                                                                userArr[3] = uitem.codefive;
                                                                userArr[4] = uitem.stco;
                                                                userArr[5] = uitem.anco;
                                                                userArr[6] = uitem.actioncard;
                                                                userArr[7] = uitem.disland;
                                                                userArr[8] = uitem.etc;
                                                                //

                                                                if(userArr[item.programname] == 1){
                                                                    if(item.areanumber <5){
                                                                        if(item2.tasknum==4){
                                                                            var button = document.createElement('input');
                                                                            button.type = 'button';
                                                                            button.value = item2.uname;
                                                                            button.className = 'btn';
                                                                            if(item2.insertable==1) {
                                                                                p_right_Child.appendChild(button);
                                                                                button.onclick = function () {

                                                                                    insertable = 0;
                                                                                    let data = {
                                                                                        uname: item2.uname,
                                                                                        insertable: insertable,
                                                                                        scheduledata: i,
                                                                                        taskdate: item2.taskdate
                                                                                    }
                                                                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                                }
                                                                            }else{
                                                                                if(item2.scheduledata==i) {
                                                                                    p_left_Child.appendChild(button);
                                                                                }
                                                                                button.onclick = function () {
                                                                                    insertable = 1;
                                                                                    let data = {
                                                                                        uname: item2.uname,
                                                                                        insertable: insertable,
                                                                                        scheduledata: 99,
                                                                                        taskdate: item2.taskdate
                                                                                    }
                                                                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                                }
                                                                            }
                                                                        }
                                                                    }else{
                                                                        if(item2.tasknum==6){

                                                                            var button = document.createElement('input');
                                                                            button.type = 'button';
                                                                            button.value = item2.uname;
                                                                            button.className = 'btn';
                                                                            if(item2.insertable==1) {
                                                                                p_right_Child.appendChild(button);

                                                                                button.onclick = function () {
                                                                                    insertable = 0;
                                                                                    let data = {
                                                                                        uname: item2.uname,
                                                                                        insertable: insertable,
                                                                                        scheduledata: i,
                                                                                        taskdate: item2.taskdate
                                                                                    }
                                                                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                                }
                                                                            }else{
                                                                                if(item2.scheduledata==i) {
                                                                                    p_left_Child.appendChild(button);
                                                                                }
                                                                                button.onclick = function () {
                                                                                    insertable = 1;
                                                                                    let data = {
                                                                                        uname: item2.uname,
                                                                                        insertable: insertable,
                                                                                        scheduledata: 99,
                                                                                        taskdate: item2.taskdate
                                                                                    }
                                                                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                                                                }
                                                                            }
                                                                        }

                                                                    }
                                                                }else{

                                                                }
                                                            })
                                                        });
                                                })
                                            );
                                    }
                                    //

                                    document.getElementById('lili').appendChild(manage_box[i]);



                                })
                            );

                })
            );

    }
    render() {
        return (
            <div className="RCA-manage-schedule-list" id="lili">
                <span>
                    {this.state.num}
                </span>
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