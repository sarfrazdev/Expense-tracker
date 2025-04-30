import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom'
import SignUp from './auth/SignUp'
import Login from './auth/Login'
import Home from './dashboard/Home'
import Income from './dashboard/Income'
import Expense from './dashboard/Expense'
import UserProvider from './context/UserContext'
import { Toaster} from 'react-hot-toast';

function App() {


  return (
    <>
    <UserProvider>
     <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/income" element={<Income/>} />
          <Route path="/expense" element={<Expense/>} />
          
        </Routes>
      </Router>
      <Toaster />

     </div>
     </UserProvider>
    </>
  )
}

export default App


const Root = () => {
  //check if token is present in local storage
  const isAuthenticated = localStorage.getItem('token') ;

  //redirect to dashboard if not authenticated  otherwise to login

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />

  ;
}