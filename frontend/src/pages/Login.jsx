import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 
import API from "../api";

 function Login()
 {
     const navigate = useNavigate();
    let [loginname,setName] = useState();
    let [loginpass,setPassword] = useState();
    let userlogin =async ()=>{
        if(!loginname){
            toast("Enter username");
        }
        if(!loginpass){
            toast("Enter password");
        }
        const res = await API.post("/checkLogin",{
            loginname, loginpass
        });

        // console.log(res.data)
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        if (res.data.success) {
            toast.success(res.data.message); 
            let d =  API.get("/dashboard");
            console.log(d.data);
            // if(d.data.success == true){
                navigate("/dashboard")
            // }else{
            //     alert(d.data.message);
            // }
            // redirect if needed
           
           
        } else {
            toast.error(res.data.message); 
        }
    }

    return (
        <>
        <h2>Login Form</h2>
        <div className="space-y-5 flex-col items-center bg-black-600">
            <div className="mt-10 space-x-5">
                <label htmlFor="">Username</label>
                <input type="text" className="border-b-2 border-indigo-500 focus:border-none" onChange={(e)=> setName(e.target.value)} placeholder="Name"/>
            </div>
            <br />
            <div className="space-x-5">
                <label htmlFor="">Password</label>
                <input type="text" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} className="border-b-2 border-indigo-500  focus:border-none outline-1 outline-gray-300" />
            </div>
            <div className="p-5">
                <input type="button" value="Login" className="p-2 border-2 rounded-md bg-indigo-100" onClick={userlogin} />
            </div>  
            <ToastContainer />
        </div>
        </>
    )
 }

 export default Login;