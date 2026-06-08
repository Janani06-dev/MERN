
import './Nav.css';
import {Link} from 'react-router-dom'

function Navbar(props)
{
    return(
        <div className='p-10'>
            <nav className="flex ml-10 mt-10 bg-indigo-100">
                <ul className='inline-flex gap-x-8 '>
                    <li className=''><Link to="/">Home</Link></li>
                    <li><Link to="/calc">Calc</Link></li>
                    <li><Link to="/hooks">Props</Link></li>
                    <li><Link to="/users">All Users</Link></li>
                    <li><Link to="/crud">CRUD</Link></li>
                </ul>
            </nav>
            
            {/* <li><Link to="/login">Login</Link></li> */}
            {/* <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1> */}
        </div>
    )
}

export default Navbar;