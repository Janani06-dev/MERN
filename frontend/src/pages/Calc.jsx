import { useState } from "react";
import Navbar from '../components/Nav'
import Footernav from '../components/Footer'

function Calc()
{
    let [name,setName] = useState("");
    
  function getVal(val){
     setName((prev) => prev + val);
  }

  function calc(){
    setName(eval(name));
  }

  function clear(){
    setName("");
  }
   return(
    <>
    <Navbar/>
    <div>
          <h2>Calcuator</h2>
          <input className='border-2 gap-x-3' type="text" value={name}/>
          <div className="grid grid-cols-3 grid-rows-4">
            <button className="" onClick={()=>{getVal("0")}}>0</button> &nbsp;
            <button onClick={()=>{getVal("1")}}>1</button>&nbsp;
            <button onClick={()=>{getVal("2")}}>2</button>&nbsp;
            <button onClick={()=>{getVal("3")}}>3</button>&nbsp;
            <button onClick={()=>{getVal("4")}}>4</button>&nbsp;
            <br />
            <button onClick={()=>{getVal("5")}}>5</button>&nbsp;
            <button onClick={()=>{getVal("6")}}>6</button>&nbsp;
            <button onClick={()=>{getVal("7")}}>7</button>&nbsp;
            <button onClick={()=>{getVal("8")}}>8</button>&nbsp;
            <button onClick={()=>{getVal("9")}}>9</button>&nbsp;
            <br />
            
            <button onClick={()=>{getVal("+")}}>+</button>&nbsp;
            <button onClick={()=>{getVal("-")}}>-</button>&nbsp;
            <button onClick={()=>{getVal("*")}}>*</button>&nbsp;
            <button onClick={()=>{getVal("/")}}>/</button>&nbsp;
            <button onClick={calc}>=</button>&nbsp;
            <button onClick={clear}>Clear</button>&nbsp;
          </div>
        </div>
        <Footernav/>
    </>
    
   )
   
}


export default Calc