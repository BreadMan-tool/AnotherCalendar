import React, {Component} from 'react'
import axios from "axios";
export default class Board extends Component {

    componentDidMount() {
        this.setInnerHtml();
    }
//access-control-allow-origin is not allowed by Access-Control-Allow-Headers in preflight response.
    setInnerHtml(){
        //axios.get('http://3.134.81.24:5000/api/board',{
        axios.get('http://localhost:3000/api/board',{
        }).then(function (res){
            var doc = document.getElementById('RCA-header-text');
                [].forEach.call(res.data, function (item, index){
                    doc.innerHTML=item.textarea;
                })}
            /*


            res.data.forEach(function (item,index){
                doc.innerHTML=item.textarea;
            })}
             */
        )

    }
    render() {
        return(
            <div className="RCA-header-container">
                <h3>공지</h3>
                <ul>
                    <li id="RCA-header-text">공지 사항입니다.</li>
                </ul>
            </div>
        )
    }
}