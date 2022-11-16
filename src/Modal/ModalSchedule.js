import React, { Component } from "react";
import "../style/ModalSchedule.css";
import axios from "axios";

export default class ModalSchedule extends Component {
    state = {
        sdate: "",
        area: "",
        schoolName:"",
        programName: "",
        areaNumber: "",
        classNumber: ""
    };

    DrawHandler = (e) => {
        const { name, value} = e.target;
        this.setState({ [name]: value });
    };
    refreshPage() {
        console.log("refres");
    }
    DrawClickHandler = () => {
        const { area,schoolName,programName,areaNumber,classNumber } = this.state;

        let data={
            sdate:document.cookie,
            area:area,
            schoolName: schoolName,
            programName: programName,
            areaNumber: areaNumber,
            classNumber: classNumber
        }
        console.log(data);
        //axios.put('http://3.134.81.24:5000/api/board',(data));
        axios.post('http://localhost:3000/api/scheduleData',(data));
        //window.location.reload(false);
    };

    render() {
        const { isOpen, close } = this.props;   //아까 버튼에서 props로 가져온것
        return (
            <>
                {isOpen ? (
                    <div className="modal">
                        <div >
                            <div className="DrawModal-schedule">
                <span className="close" onClick={close}>
                  &times;
                </span>
                                <div className="modalContents" >
                                    <div className="schedule-input">
                                            <select name = "area" onChange={this.DrawHandler}>
                                                <option hidden="" disabled="disabled" selected="selected" value="">지역</option>
                                                <option value="0">수도권</option>
                                                <option value="1">지방</option>
                                            </select>
                                        <input
                                            name="schoolName"
                                            className="text-box"
                                            type="text"
                                            placeholder="학교명"
                                            onChange={this.DrawHandler}
                                        />
                                            <select name = "programName" onChange={this.DrawHandler}>
                                                <option hidden="" disabled="disabled" selected="selected" value="">프로그램명</option>
                                                <option value="0">수상한 스튜디오</option>
                                                <option value="1">어나더랜드</option>
                                                <option value="2">취업조작단</option>
                                                <option value="3">수상한+코드5</option>
                                                <option value="4">어나더+코드5</option>
                                                <option value="5">취업+코드5</option>
                                            </select>
                                            <select name = "areaNumber" onChange={this.DrawHandler}>
                                                <option hidden="" disabled="disabled" selected="selected" value="">차시</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </select>
                                        <input
                                            name="classNumber"
                                            className="text-box"
                                            type="text"
                                            placeholder="반"
                                            onChange={this.DrawHandler}
                                        />

                                    </div>
                                    <button className="DrawBtn" onClick={this.DrawClickHandler}>
                                        {" "}
                                        완료{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
}

