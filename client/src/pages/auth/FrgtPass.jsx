import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ClipLoader } from "react-spinners" 

export const FrgtPass = () => {
  const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      email: "",
    })

    useEffect(()=>{
      document.title = "Forgot Password? | GigHub"
    },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e)=>{
    e.preventDefault()

  }
  return (
    <div className="flex justify-center p-4 lg:p-0 min-h-screen font-poppins items-center bg-white text-black">
      <form onSubmit={handleSubmit} className="border-2 rounded-md p-8 w-[410px] ">
        <h1 className="text-2xl text-center font-medium  mb-1 ">Forgot your password?</h1>
        <p className="text-sm mb-5 text-center">Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            id="email"
            className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
            name="email"
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-[#eea47fff] w-full py-2.5 rounded-md text-white font-medium hover:bg-[#00539cff] transition-colors duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={24} /> 
          ) : (
            "Send Reset Instruction"
          )}
        </button>
        
        <p className="text-center text-[14px] mt-1">
          
          <Link
            to="/"
            className="text-[#00539cff] ml-1 hover:underline transition-colors duration-300 font-medium"
          >
           Back to Home
          </Link>
        </p>
      </form>
    </div>
  )
}
