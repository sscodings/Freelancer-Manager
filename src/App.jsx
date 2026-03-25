import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom"
import './App.css'
import Signup from './assets/Pages/Signup'
import Login from './assets/Pages/login'
import AddProject from './assets/Components/Addproject'
import Dashboard from './assets/Pages/dashboard'


function App() {
  const isAuth = localStorage.getItem("token");
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
