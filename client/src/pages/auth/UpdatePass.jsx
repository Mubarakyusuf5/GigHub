import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ClipLoader } from "react-spinners" 

export const UpdatePass = () => {
  const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      oldPassword: "",
      cPassword: "",
      password: "",
    })
    const navigate = useNavigate()

    useEffect(()=>{
      document.title = "Update Password? | GigHub"
    },[])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, password, cPassword } = formData;

    if (!oldPassword) return toast.error("Must input old password for confirmation!");
    if (!password || !cPassword) return toast.error("All fields must be filled!");
    if (password !== cPassword) return toast.error("New password doesn't match!");

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/updatePassword", {
        oldPassword, 
        // old password to be sent to backend for comfirmation
        newPassword: password,
        // newPassword is saved as password in backend
      });

      toast.success(response.data.message || "Password updated successfully!");
      setFormData({ oldPassword: "", password: "", cPassword: "" });
      navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center p-4 lg:p-0 min-h-screen font-poppins items-center bg-white text-black">
      <form onSubmit={handleSubmit} className="border-2 rounded-md p-8 w-[410px] ">
        <h1 className="text-2xl text-center font-medium  mb-1 ">Update your password?</h1>
        <p className="text-sm mb-5 text-center"></p>

        <div className="mb-3">
          <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
            Enter Old Password
          </label>
          <input
            type="password"
            placeholder="Enter old password"
            id="oldPassword"
            className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
            name="oldPassword"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Enter New Password
          </label>
          <input
            type="password"
            placeholder="Enter New password"
            id="password"
            className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cPassword" className="block text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            id="cPassword"
            className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
            name="cPassword"
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
            "Update Password"
          )}
        </button>
        
        <p className="text-center text-[14px] mt-1">
          
          {/* <Link
            to="/"
            className="text-[#00539cff] ml-1 hover:underline transition-colors duration-300 font-medium"
          >
           Back to Home
          </Link> */}
        </p>
      </form>
    </div>
  )
}
