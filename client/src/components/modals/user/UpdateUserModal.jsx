import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Roles, Status } from '../../Data';

export const UpdateUserModal = ({onClose, fetchUsers, userData}) => {
  const [formData, setFormData] = useState({
    fullname: userData.fullname || "",
    email: userData.email || "",
    role: userData.role || "",
    status: userData.status || "",
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
        if (!formData.fullname) {
          toast.error("Fullname is required")
          return
        }
    
        if (!formData.email) {
          toast.error("Email is required")
          return
        }

        if (!formData.role) {
            toast.error("Role is required")
            return
          }

        try {
          const response = await axios.put(`/api/user/updateUserAdmin/${userData._id}`, formData)
          toast.success(response.data?.message || "User created successfully!")
          setFormData({
            fullname: "",
            email: "",
            role: "",
            status: "",
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Update User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>-- Select Role --</option>
                  {Status.map(({stat}, index)=>(
                    <option key={index} value={stat}>{stat}</option>
                  ))}
                </select>
              </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 position sticky bottom-0">
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
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

//implement button for if true password gets updated
//if false password remains the same