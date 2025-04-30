

import React from 'react'
import AuthLayout from '../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../components/layouts/Input'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'
import { API_PATH } from '../utils/apiPath'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const {updateUser} = React.useContext(UserContext)


  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email) || !password) {
      return false

    }

    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password
      })

      const { token } = response.data

      if (token) {
        localStorage.setItem("token", token)
        updateUser()
        alert("Login successful")
        navigate("/dashboard")
      }
    } catch (error) {
      alert("Login failed due to invalid email or passwords")

    }
  }

  return (
    <AuthLayout>
      <div className="lg:w-[60%] h-3/4 md:h-full flex flex-col justify-center">
        <h1 className="text-xl font-semibold text-black">Login</h1>
        <div className="">Welcome back</div>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your detail to login</p>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <button type="submit" className="btn-primary">Login</button>
          <p className="text-[13px] text-slate-800 mt-4">
            Don’t have an account?{' '}
            <span
              className="text-primary cursor-pointer font-semibold hover:underline transition duration-500"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
