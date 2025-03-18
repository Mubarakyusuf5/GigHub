import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Roles } from '../../Data';

export const AddUserModal = ({onClose, fetchUsers}) => {
      const [formData, setFormData] = useState({
            fullname: "",
            email: "",
            role: "",
            password: "",
            cPassword: "",  
          });

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
    
        // Validate form
        if (!formData.fullname.trim()) {
          toast.error("Fullname is required")
          return
        }
    
        if (!formData.email.trim()) {
          toast.error("Email is required")
          return
        }

        if (!formData.role) {
            toast.error("Role is required")
            return
          }
    
        if (!formData.password.trim()) {
          toast.error("Password is required")
          return
        }
        if ( formData.cPassword !== formData.password) {
          toast.error("Passwords don't match")
          return
        }

        try {
          const response = await axios.post("/auth/register", formData)
          toast.success(response.data?.message || "User created successfully!")
          setFormData({
            fullname: "",
            email: "",
            role: "",
            password: "",
            cPassword: "", 
          })
          fetchUsers()
          onClose()
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to create user. Please try again.")
          console.error("Error creating user:", error)
        }
      }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fullname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="e.g. Web dev, Data Analysis"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ex. johndoe@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>-- Select Role --</option>
                  {Roles.map(({role}, index)=>(
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {formData.password && <div>
              <label
                htmlFor="cPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password 
              </label>
              <input
                type="password"
                id="cPassword"
                name="cPassword"
                value={formData.cPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>}
            
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create user
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
