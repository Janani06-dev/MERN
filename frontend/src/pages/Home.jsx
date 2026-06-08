import {useState} from 'react' 
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import Navbar from '../components/Nav'
import Footernav from '../components/Footer'
import { createContext } from 'react'

export const headnameContext =  createContext();

function Home()
{
    const [count, setCount] = useState(0)
    const [headname, setHeadername] = useState("Janani")
    const [name, setName] = useState("")

    const project = "React";

    function changeName()
    {
        setHeadername("Janani K M")
    }

    return(
      <>
      
      <headnameContext.Provider value={headname}>
      <Navbar/>
      </headnameContext.Provider>
      <section className='flex flex-col gap-y-5'>
        <button className='border-2 w-40' onClick={changeName}>Change Username</button>
        
        <h2>Welcome to {project}, {headname}</h2>

        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        
        <button type="button" className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        </section>
        <Footernav/>
      </>
        
    )
}

export default Home;