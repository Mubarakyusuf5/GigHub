import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export const UpdatePasswordModal = ({onClose, fetchUsers, userData}) => {
  const [formData, setFormData] = useState({
    password: "",
    // userData.password ||  "",
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
    
        if (!formData.password) {
          toast.error("Password is required")
          return
        }

        if ( formData.cPassword !== formData.password) {
          toast.error("Passwords don't match")
          return
        }

        try {
          const response = await axios.put(`/api/user/updatePasswordAdmin/${userData._id}`, formData)
          toast.success(response.data?.message || "Password updated successfully!")
          setFormData({
            password: "",
            cPassword: "",
          })
          fetchUsers()
          onClose()
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to update password. Please try again.")
          console.error("Error updating user password:", error)
        }
      }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Update Password</h2>
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