import React, { Component } from "react";
import ModalBoard from "./Modal/ModalBoard";
import ModalSchedule from "./Modal/ModalSchedule";

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBoardModalOpen: false,
            isScheduleModalOpen: false,
        };
    }

    openBoardModal = () => {
        this.setState({ isBoardModalOpen: true });
    };

    closeBoardModal = () => {
        this.setState({ isBoardModalOpen: false });
    };

    openScheduleModal = () => {
        this.setState({ isScheduleModalOpen: true });
    };

    closeScheduleModal = () => {
        this.setState({ isScheduleModalOpen: false });
    };

    render() {
        if(localStorage.getItem("manager")==1) {
            return (
                <>
                    <button className="board-btn" onClick={this.openBoardModal}>공지 수정</button>
                    <button className="schedule-btn" onClick={this.openScheduleModal}>스케쥴 추가</button>
                    <ModalBoard isOpen={this.state.isBoardModalOpen} close={this.closeBoardModal}/>
                    <ModalSchedule isOpen={this.state.isScheduleModalOpen} close={this.closeScheduleModal}/>
                </>
            )
        }else {
            return (
               <>
               </>
            );
        }
    }
}