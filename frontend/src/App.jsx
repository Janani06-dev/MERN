import { useState } from 'react'
import { BrowserRouter, Route, Router,Routes } from 'react-router-dom'

import './App.css';
import Navbar from './components/Nav'
import Footernav from './components/Footer';
import Home from './pages/Home';
import Calc from './pages/Calc';
import Users from './pages/Users'
import Hooks from './pages/Hooks';
import Crud from './pages/Crud';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditUserForm from "./pages/Edituser"
// usenavigate(), useparamas, 

function App() {
 

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Calc' element={<Calc/>}></Route>
      <Route path='/Users' element={<Users/>}></Route>
      <Route path='/Hooks' element={<Hooks age="20" course="mern"/>}></Route>
      <Route path='/Crud' element={<Crud/>}></Route>
      <Route path="/edit/:id" element={<EditUserForm />} />
      <Route path='/Login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
