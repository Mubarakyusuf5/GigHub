import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from './pages/general/Home'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { FrgtPass } from './pages/auth/FrgtPass'
import { VerifyOTP } from './pages/auth/VerifyOTP'
import { AdminDash } from './pages/admin/AdminDash'
import { ClientDash } from './pages/client/ClientDash'
import { FreeDash } from './pages/freelancer/FreeDash'
import { ManageUser } from './pages/admin/ManageUser'
import { ManageCtgry } from './pages/admin/ManageCtgry'
import { HomeNav } from './components/utils/HomeNav'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Message } from './pages/general/Message'
import { Nav } from './components/utils/Nav'
import { Analytics } from './pages/general/Analytics'
import { UpdatePass } from './pages/auth/UpdatePass'

axios.defaults.baseURL = 'http://localhost:6500';
axios.defaults.withCredentials = true;

export const App = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  const isFrgtPage = location.pathname === '/forgot-password';
  const isUpdatePage = location.pathname === '/update-password';
  const isOTPPage = location.pathname === '/verify-otp';
  // const DetailsPage = location.pathname === '/completeDetails';
  const user = "Freelancer"
  return (
    <div>
      {/* <HomeNav /> */}
      <Toaster position="top-center" duration={3000} />
      {user === "Client" || user === "Freelancer" ?
      (!isSignInPage && !isSignupPage && !isFrgtPage  && !isOTPPage && !isUpdatePage && <Nav />) :
      user === "Admin" ? (<p className='hidden'>admin</p>)
      :
      (!isSignInPage && !isSignupPage && !isFrgtPage  && !isOTPPage && !isUpdatePage && <HomeNav />)}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/forgot-password' element={<FrgtPass />} />
        <Route path='/update-password' element={<UpdatePass />} />
        <Route path='/verify-otp' element={<VerifyOTP />} />
        <Route path='/message' element={<Message />} />
        <Route path='/analytics' element={<Analytics />} />
        
        <Route path='/admin/dashboard' element={<AdminDash />} />
        <Route path='/admin/manage-users' element={<ManageUser />} />
        {/* <Route path='/admin/manage-users' element={<ManageUser />} /> */}
        <Route path='/admin/manage-category' element={<ManageCtgry />} />

        <Route path='/client/dashboard' element={<ClientDash />} />
        <Route path='/dashboard' element={<FreeDash />} />
        <Route path='*' element={<div className='flex justify-center items-center mt-36 text-3xl font-medium'>404 Page not found</div>} />

      </Routes>
    </div>
  )
}
