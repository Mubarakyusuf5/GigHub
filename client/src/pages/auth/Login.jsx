import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../Context/AuthContext"
import { ClipLoader } from "react-spinners" // Import ClipLoader

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [User, setUser] = useState(null)
  const [loading, setLoading] = useState(false) // Add loading state


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("Form Data Submitted: ", formData)
    const { email, password } = formData
    if (!email || !password) {
      return toast.error("All inputs must be field!")
    }

    setLoading(true) // Start loading

    try {
      const response = await axios.post("/auth/login", formData)
      login(response.data?.user) // Update the user context

      const { role } = response.data?.user // Access role inside user object
      const message = response.data.message

      redirectUser(role)
    //   // console.log(redirectUser(role), role)

      toast.success(message || "Login successful")
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error")
      console.log("Login error:", error)
    } finally {
      setLoading(false) // Stop loading regardless of success or error
    }
  }

  const roleRoutes = {
    Admin: "/admin/dashboard",
    Client: "/client/dashboard",
    Freelancer: "/dashboard",
  }

  const redirectUser = async (role) => {
    if (role === "Client" || role === "Freelancer") {
      try {
        // Fetch kyc details Wrong new logic fetch from user model to check if hasProfile = true
        const response = await axios.get("/api/profile/hasProfile");
  
        // Check if the role has KYC details
        const hasProfile = response.data?.hasProfile;
  
        // Redirect based on whether the role has business details
        if (hasProfile === true && role === "Client") {
          navigate("/client/dashboard"); // Redirect to client dashboard
        } else if (hasProfile === true && role === "Freelancer") {
          navigate("/dashboard"); // Redirect to freelancer dashboard
        } else {
          navigate("/complete-profile"); // Redirect to create business details page
        }
      } catch (error) {
        console.error(`Error fetching ${role} details:`, error.message);
        toast.error( error.response?.data?.message || `Error checking ${role} details.`);
        navigate("/"); // Fallback in case of error
      }
    } else {
      // Redirect profile users based on their role
      navigate(roleRoutes[role] || "/");
    }
    // if (user) {
      // navigate(roleRoutes[role] || "/")
    // }
  }

  useEffect(() => {
    if (user) {
      // Redirect if user is already logged in
      redirectUser(user?.role)
    }
  }, [user, navigate, redirectUser]) // Added redirectUser to dependencies

  return (
    <div className="flex justify-center p-4 lg:p-0 min-h-screen font-poppins items-center bg-white text-black">
      <form onSubmit={handleSubmit} className="border-2 rounded-md p-8 w-[410px] ">
        <h1 className="text-2xl font-medium text-center mb-8 ">Log in to Gighub</h1>
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address
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
        <div className="">
          <label htmlFor="pass" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            id="pass"
            className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-[#00539cff] focus:ring-2 focus:ring-[#eea47fff] focus:border-transparent"
            name="password"
            onChange={handleChange}
          />
        </div>
        <p className="text-sm text-center my-3 text-blue-700 font-medium"><Link to={"/forgot-password"}>Forgot Password?</Link></p>
        <button
          className="bg-[#eea47fff] w-full py-2.5 rounded-md text-white font-medium hover:bg-[#00539cff] transition-colors duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={24} /> // Add ClipLoader when loading
          ) : (
            "Login"
          )}
        </button>
        <p className="text-center text-[14px] mt-3">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#00539cff] hover:text-[#eea47fff] transition-colors duration-300 font-medium"
          >
            Sign up
          </Link>
        </p>
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