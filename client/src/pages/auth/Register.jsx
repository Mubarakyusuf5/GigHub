import React, { useState } from 'react';
// import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

export const Register = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });
  const [cPassword, setCPassword] = useState("")
  const navigate = useNavigate()

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setFormData({ ...formData, role: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted: ", formData);
    const { role, fullname, email, password } = formData

    if (!role, !fullname, !email, !password) {
      return toast.error("All inputs must be field!")
    }
    if (password !== cPassword) {
      return toast.error("Password don't match")
    }
    try {
      const response = await axios.post("/auth/register", formData);
      // console.log(response)
      const message = response.data.message;
      navigate("/login")    
      toast.success(message || "Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message);
      // setLoading(false); // Stop loading regardless of success or error
    } 

  };

  const nextStep = () => setCurrentStep(2);
  const backStep = () => setCurrentStep(1);

  return (
    <div className="flex justify-center p-4 lg:p-0 min-h-screen font-poppins items-center bg-white text-black">
      <form onSubmit={handleSubmit} className="border-2 rounded-md p-8 w-[410px]">
        <h2 className="text-2xl font-medium text-center mb-8">Sign Up</h2>

        {/* Step 1: Role Selection */}
        {currentStep === 1 && (
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Select Role
            </label>
            <select
              name="role"
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Client">Client - Join us to find the best professionals for your next project</option>
              <option value="Freelancer">Freelancer - Sign up to offer your skills and work on exciting projects</option>
            </select>
            <button
              type="button"
              onClick={nextStep}
              disabled={!selectedRole}
              className={`bg-[#eea47fff] mt-3 w-full py-2.5 rounded-md text-white font-medium hover:bg-[#00539cff] transition-colors duration-300 flex items-center justify-center ${
                !selectedRole ? "opacity-25 cursor-not-allowed" : ""
              }`}
            >
              Create Account
            </button>
            <p className="text-center mt-3 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 font-medium hover:text-red-600 transition-all duration-300">
                Login
              </Link>
            </p>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {currentStep === 2 && (
          <>
            <div className="mb-4">
              <label htmlFor="fullname" className="block text-sm font-medium mb-1">
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder='Ex. John Doe '
                className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Ex. johndoe@examlpe.com '
                className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter password'
                className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cpassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                value={cPassword}
                onChange={e => setCPassword(e.target.value)}
                placeholder='Confirm password'
                className="w-full text-[15px] font-inter px-3 py-2  rounded-md border border-slate-400 focus:ring-2 focus:ring-zinc-200 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#eea47fff] w-full py-2.5 rounded-md text-white font-semibold hover:bg-[#00539cff] transition-colors duration-300 "
            >
              Register
            </button>
            <button
              type="button"
              onClick={backStep}
              // disabled={!selectedRole}
              className={`bg-[#ee997f] mt-2 w-full py-2.5 rounded-md text-white font-medium hover:bg-[#9c0a00] transition-colors duration-300`}
            >
              Back
            </button>
          </>
        )}
      </form>
    </div>
  );
};
