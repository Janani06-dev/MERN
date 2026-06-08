
import Navbar from '../components/Nav'
import Footernav from '../components/Footer'
import { useEffect, useRef, useState,useContext } from "react";
import { useMemo } from 'react';
import { headnameContext } from './Home';

function Hooks(props)
{
  const user = useContext(headnameContext);
  // useContext example code above
  console.log(user)
  const [count, setCount] = useState(0);
  const prevCount = useRef();


  function largerFunction(num)
  {
    for(let i = 0; i<100; i++){ }
    return num*10;
  }


  // usememo
  let [no,setNo] = useState(0);
  let [dark,setDark] = useState(false); 

  let newValue = useMemo(()=>{
    return largerFunction(no);
  }, [no])

  let theme = useMemo(()=> {
    return {
      background: dark?"black": "white" ,
      color: dark?"white": "black"
        }},[dark])


  useEffect(() => {
    prevCount.current = count;
    });

  let details = {
    country:"India",
    state: "TN",
    location: 'Salem'
  }


  return (
    <>
    <Navbar/>
    <div className=''>

    
    <h2>Hello Props</h2>
    <h2 d={details} />
    
     <div className=''>
        <h4>Age is </h4> {props.age} <br />
        <h4>Course is </h4>{props.course} <br />
        <h4>Location is </h4> <br />
    </div>
    <div className=''>
      <h2>useRef Hooks</h2>
        <h4>Current: {count}</h4>
        <h2>Previous: {prevCount.current}</h2>

        <button className='bg-indigo-200' onClick={() => setCount(count + 1)}>
          Increment
        </button>
    </div>

    <div>
      <h2>useMemo example</h2>
      <input type="text" value={no} id="" onChange={(e)=> setNo(e.target.value)}/>
      <button className='bg-indigo-200 p-2 b-20' onClick={()=> setDark(!dark)}>change theme</button>
    <h1 style={theme}>New values is {newValue}</h1>
    </div>

    <div>
      <h2>useContext from home app to hooks file</h2>
       <h1>{user}</h1>
    </div>
    </div>

    <Footernav/>
    </>
  )
}

export default Hooks