
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Nav'
import Footernav from '../components/Footer';
function Dashboard()
{
    let [d,setD] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
        getData();
    },[])

    function getData()
    {
        try{
            let ans = API.get("/dashboard");
            console.log("ans"+ans)
            setD(ans.data)
        }catch(err){
            navigate("/login");
        }  
    }
    
    return(
        <>
        <h2>Welcome to Dashboard</h2>
        <Navbar/>
        <Footernav/>
        </>
    )
}

export default Dashboard;