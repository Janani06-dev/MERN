
import './Nav.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Footernav()
{
    const navigate =  useNavigate();
    function logout()
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login")
    }
    return(
        <div>
            <button onClick={logout} className='mt-20 p-2 bg-indigo-200'>Logout</button>
        </div>
    )
}

export default Footernav;