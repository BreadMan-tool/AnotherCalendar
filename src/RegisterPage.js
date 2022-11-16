import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function RegisterPage(props) {
    const [Name, setName] = useState("");
    const [dName, setdName] = useState("");

    const onNameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
            let body = {
                name: Name
            };
            //axios.post('http://3.134.81.24:5000/api/register', (body))
            axios.post('http://localhost:3000/api/register', (body))
    };

    const ondNameHandler = (e) => {
        setdName(e.currentTarget.value);
    };

    const ondSubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            name: dName
        };
        //axios.delete('http://3.134.81.24:5000/api/register', {data:body})
        axios.delete('http://localhost:3000/api/register', {data:body})
        //axios.delete('http://3.134.81.24:5000/api/register/clear', {data:body})
        axios.delete('http://localhost:3000/api/register/clear', {data:body})
    };
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}>
            <form
                onSubmit={onSubmitHandler}
                style={{ display: "flex", flexDirection: "column" }}>
                <label>Name</label>
                <input type="test" value={Name} onChange={onNameHandler} />

                <br />
                <button type="submit">회원 추가</button>
            </form>

            <form
                onSubmit={ondSubmitHandler}
                style={{ display: "flex", flexDirection: "column" }}>
                <label>Name</label>
                <input type="test" value={dName} onChange={ondNameHandler} />

                <br />
                <button type="submit">회원 삭제</button>
            </form>
        </div>
    );
}

export default withRouter(RegisterPage);