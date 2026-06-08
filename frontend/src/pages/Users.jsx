
import { useState,useEffect,useRef } from "react";
 // to read user details using fetch api
 import Navbar from '../components/Nav'
import Footernav from '../components/Footer'

function Users()
{

    let [count,setCount] = useState("");

    let [no,setNo] = useState(0);
    let c =  useRef(0);
    
    useEffect(()=>{
        setTimeout(()=>{
            setCount(200);
        },3000)
    })

    let [details, getDetails] = useState([]);
     useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users/')
      .then(response => response.json())
      .then(da => getDetails(da))
      console.log("Got user details")
    },[])

    const inputRef = useRef(null);
    const focusInput = ()=>{
        inputRef.current.focus();
    }

    return(
        <>
<Navbar/>
        <h4>Count value is {count}</h4>
        <h2>User Details</h2>
        
        <table>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Username</td>
                    <td>Email</td>
                </tr>
            </thead>
            <tbody>
                {details.map((value)=>{
                    return(
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.username}</td>
                            <td>{value.email}</td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>

<div className="flex-col items-center">
        <h2>useRef Hooks</h2>
        <input type="text" ref={inputRef} />
        <button className="bg-teal-500 p-2" onClick={focusInput}>Focus</button>
</div>
        
        <Footernav/>
        </>
        
    )
}

export default Users;