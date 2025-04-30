import React from 'react'
import AuthLayout from '../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../components/layouts/Input'
import { validateEmail } from '../utils/helper'
import ProfilePhotoSelector from '../components/layouts/ProfilePhotoSelector'
import axiosInstance from '../utils/axiosInstance'
import { API_PATH } from '../utils/apiPath'
import uploadImage from '../utils/uploadImage'
import { UserContext } from '../context/UserContext' 
const SignUp = () => {
  const [profile, setProfile] = React.useState(null)
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  
  const { updateUser } = React.useContext(UserContext)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageUrl = "";

    if (!fullName) {
      setError('Please enter your full name')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email')
      return
    }
    if (!password) {
      setError('Please enter a valid password')
      return
    }

    setError('')
    //signup Api call
    try {
      // Upload the profile image if it exists
      if (profile) {
        const imageUploadRes = await uploadImage(profile)
        profileImageUrl=imageUploadRes.data.imageUrl || ""

      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      })
      const { token, user } = response.data

      if (token) {
        localStorage.setItem('token', token)
        updateUser(user)
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Invalid email or password')
      } else {
        setError('Something went wrong')
      }
    }
  }

  return (
    <AuthLayout>
      <div className="lg:w[100%] h-auto md:h-full  flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black ">Create an account</h3>
        <p className="text-xs text-slate-700 mt-[50px] mb-6">Join us today by entering details </p>

        <form onSubmit={handleSignUp} className='-mt-15 '>
          <ProfilePhotoSelector image={profile} setImage={setProfile} />

          <div className="lg:w-[60%]">
            <Input type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your Name"
            />
            <Input type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
            <Input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="btn-primary">Login</button>
            <p className="text-[13px] text-slate-800 mt-4">
              Already have an account? <span className="text-primary cursor-pointer font-semibold hover:underline transition duration-500" onClick={() => navigate('/login')}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
