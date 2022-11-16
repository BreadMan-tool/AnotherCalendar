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
        var lbox_0 = document.getElementById("0-list-left");
        var rbox_0 = document.getElementById("0-list-right");
        //var cbox_1 = document.getElementById("1-list");
        var cbox_2 = document.getElementById("2-list");
        var cbox_3 = document.getElementById("3-list");
        var cbox_4 = document.getElementById("4-list");

        lbox_0.innerText='';
        rbox_0.innerText='';
        //cbox_1.innerText='';
        cbox_2.innerText='';
        cbox_3.innerText='';
        cbox_4.innerText='';
    }
    DrawAllschedule(){

        var lbox_0 = document.getElementById("0-list-left");
        var rbox_0 = document.getElementById("0-list-right");
        //var cbox_1 = document.getElementById("1-list");
        var cbox_2 = document.getElementById("2-list");
        var cbox_3 = document.getElementById("3-list");
        var cbox_4 = document.getElementById("4-list");
        //axios.get('http://3.134.81.24:5000/api/getselect/'+this.props.selected,{
        axios.get('http://localhost:3000/api/getselect/'+this.props.selected,{
        })
            .then(res=>
                [].forEach.call(res.data,function (item,index){
                    var content=document.createTextNode(item.uname+" ");
                    var insertable = 1;
                    switch (item.tasknum){
                        case 0:
                            if(item.insertable==1) {
                                var button = document.createElement('input');
                                button.type = 'button';
                                button.value = item.uname;
                                button.className = 'btn';

                                rbox_0.appendChild(button);

                                button.onclick = function () {
                                    insertable = 0;
                                    let data = {
                                        uname: item.uname,
                                        insertable: insertable,
                                        taskdate: item.taskdate
                                    }
                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                }

                            }else{
                                var button = document.createElement('input');
                                button.type = 'button';
                                button.value = item.uname;
                                button.className = 'btn';

                                button.onclick = function () {
                                    insertable = 1;
                                    let data = {
                                        uname: item.uname,
                                        insertable: insertable,
                                        taskdate: item.taskdate
                                    }
                                    axios.put('http://localhost:3000/api/insertschedule', (data));
                                }
                                lbox_0.appendChild(button);
                            }
                            break
                        // case 1:
                        //     cbox_1.appendChild(content);
                        //     break
                        case 2:
                            var button = document.createElement('input');
                            button.type = 'button';
                            button.value = content.data;
                            button.className = 'btn';

                            button.onclick = function (){

                            }
                            cbox_2.appendChild(button);
                            break
                        case 3:
                            var button = document.createElement('input');
                            button.type = 'button';
                            button.value = content.data;
                            button.className = 'btn';

                            button.onclick = function (){

                            }
                            cbox_3.appendChild(button);
                            break
                        case 4:
                            cbox_4.appendChild(content);
                            break
                    }
                })
            );


    }
    render() {
        return (
            <div className="RCA-manage-schedule-list" id="lili">
                <h2>지방 6차시</h2>
                <div className="RCA-manage-line" id="RCA-manage-0">

                    <div className="RCA-manage-left">
                        <p id="0-list-left"></p>
                    </div>
                    <div className="RCA-manage-right">
                        <p id="0-list-right"></p>
                    </div>
                </div>
                {/*<div id="RCA-manage-1">*/}
                {/*    <h2>지방 4차시</h2>*/}
                {/*    <p id="1-list"></p>*/}
                {/*</div>*/}
                <h2>수도권 6차시</h2>
                <div className="RCA-manage-line" id="RCA-manage-2">

                    <div className="RCA-manage-left">

                    </div>
                    <div className="RCA-manage-right">
                        <p id="2-list"></p>
                    </div>
                </div>
                <h2>수도권 4차시</h2>
                <div className="RCA-manage-line" id="RCA-manage-3">

                    <div className="RCA-manage-left">

                    </div>
                    <div className="RCA-manage-right">
                        <p id="3-list"></p>
                    </div>
                </div>
                <div className="RCA-manage-adjustable" id="RCA-manage-4">
                    <p id="4-list"></p>
                </div>

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