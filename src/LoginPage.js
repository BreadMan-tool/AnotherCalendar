import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
function LoginPage(props) {

    const [Password, setPassword] = useState("");

    const onPasswordHanlder = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const body = {
            password: Password,
        };
        //axios.post('http://3.134.81.24:5000/api/login', (body)).then((res=>{
        axios.post('http://localhost:3000/api/login', (body)).then((res=>{
            if(res.data[0].success==1){
                localStorage.setItem("manager", 1);
                props.history.push("/");
            }
            }
        ))


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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHanlder} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default withRouter(LoginPage);