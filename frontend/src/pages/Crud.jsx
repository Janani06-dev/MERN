

import { useEffect, useState } from 'react';
import './Crud.css'
import axios from "axios";
import { toast } from 'react-toastify';
import Navbar from '../components/Nav'
import Footernav from '../components/Footer'
import { Navigate, useNavigate } from 'react-router-dom';
function Crud(){
    
    const navigate =  useNavigate();

    let [uname,setUsername] =  useState();
    let [email,setEmail] =  useState();
    let [pass,setPassword] = useState();
    let [age,setAge] = useState();
    let [course,setCourse] = useState();

    const [errors, setErrors] = useState({});
    let [udetails, setUserdetails] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/read").then(res => {
        setUserdetails(res.data.data); // because backend sends { data: details }
      });
    },[])
    
    function handleSubmit()
    {
        e.preventDefault();
        let validationErrors = {};
        if(!email){
            validationErrors.email = "Email is required";

        }
        if(!pass){
            validationErrors.pass = "Password is required";
        }

        if(!course){
            validationErrors.course = "Course is required";
        }
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0){
            try{
                // call save api
                const response  = axios.post("http://localhost:3000/add",{
                    uname,email,pass,age,course
                }).then((res)=>{
                    console.log(res)
                    if(res.data.success == true){
                        alert("User saved successfully")
                    }else{
                        alert("User exist")
                    }
                });
                

            }catch(err){
                console.log(err);
            }
        }
    }

    function deluser(id)
    {
        console.log(id)
        axios.post(`http://localhost:3000/deleteUser/${id}`).then(res=> console.log(res.data));
        toast("User Deleted");
    }

    return(
        <>
        <Navbar/>
        <div className='space-y-10 p-10  flex-col'>
            <h2 className="bg-indigo-500">User Form </h2>

            <div className='flex gap-x-10'>
                <label htmlFor="" className='text-sm/6 font-medium text-gray-900 mt-5'>Name</label>
                <input type="text" name="" id="" placeholder='Name' onChange={(e)=> setUsername(e.target.value)} value={uname} className='mt-5 border-b-2 focus-visible:outline-indigo-300 sm:text-sm/6'/>
            </div>
            <div className='flex gap-x-10'>
                <label htmlFor="">Email</label>
                <input type="text" name="" id="" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} className='border-b-2 focus-visible:outline-indigo-300 sm:text-sm/6'/>
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div className='flex gap-x-10'>
                <label htmlFor="">Password</label>
                <input type="text" name="" id="" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={pass} className='border-b-2 focus-visible:outline-indigo-300 sm:text-sm/6'/>
                {errors.pass && <p>{errors.pass}</p>}
            </div>
                <div className='flex gap-x-10'>
                    <label htmlFor="">Age</label>
                <input type="text" id="age" placeholder='Age' value={age} onChange={(e)=>setAge(e.target.value)} className='border-b-2 focus-visible:outline-indigo-300 sm:text-sm/6'/>
                </div>

                <div className='flex gap-x-10'>
                    <label htmlFor="">Course</label>
                    <input type="text" placeholder='Course' value={course} onChange={(e)=>setCourse(e.target.value)} id="cousrse" className='border-b-2 focus-visible:outline-indigo-300 sm:text-sm/6'/>
                    {errors.course && <p>{errors.course}</p>}
                </div>
            <div>
                <input type="submit" onClick={handleSubmit} className='rounded-md bg-indigo-200 px-3 py-2 text-sm' value="Submit" />
            </div>
        </div>

       <div className='overflow-x-auto'>
        <h2 className='font-weight-100'>User Details from Database</h2>
        <table className='min-w-full border border-gray-200 divide-y divide-gray-200 border-2'>
            <thead className='px-6 py-3 text-left bg-gray-100'>
                <tr>
                    <td className='px-6 py-3 text-center'>Name</td>
                    <td className='px-6 py-3 text-center'>Email</td>
                    <td className='px-6 py-3 text-center'>Age</td>
                    <td className='px-6 py-3 text-center'>Course</td>
                </tr>
            </thead>
            <tbody>
                {
                    udetails.map((value)=>{
                        return(
                            <tr key={value._id}>
                                <td>{value.username}</td>
                                <td>{value.email}</td>
                                <td>{value.age}</td>
                                <td>{value.course}</td>
                                <td className='hover:bg-indigo-200' onClick={()=>navigate(`/edit/${value._id}`)} value={value._id}>Edit</td>
                                <td className='hover:bg-indigo-200' onClick={()=>deluser(value._id)}>Delete</td>
                            </tr>
                        )
                    })
                }   
            </tbody>
        </table>
       </div>

       <Footernav/>
        </>
    )
}

export default Crud;