import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { DeleteModal } from "../modals/DeleteModal";

export const UserAccountSetting = ({profile}) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    bio: "",
    cPassword: "",
    nPassword: "",
    cNewPassword: "",
  });
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { user } = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //function to update user detail name/email
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { fullname, email } = formData;
    if (!fullname || !email) {
      return toast.error("Fullname and email are required"); //maybe personal detail instead
    }
    // if (!fullname) {
    //   return toast.error("Fullname is required");
    // }
    // if (!email) {
    //   return toast.error("Email is required");
    // }
    try {
      const response = await axios.put(`/api/user/updateUserDetails/${user?.id}`, {
        email,
        fullname,
      });
      toast.success(
        response.data?.message || "Personal details updated successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error updating personal details"
      );
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const { cNewPassword, cPassword, nPassword } = formData;
    if (!nPassword !== !cNewPassword) {
      return toast.error("New password does'nt match");
    }
    if (!cPassword) {
      return toast.error("Current password is required");
    }
    if (!nPassword) {
      return toast.error("New password is required");
    }
    try {
      const response = await axios.put(`/api/user/updatePasswordUser/${user?.id}`, {password: nPassword});
      toast.success(response.data?.message || "Password updated successfully")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password")
    }
  };

  // to delete user account but delete modal mustbe called
  const handleDelete = async (id) => {
    setLoading(true); // Set loading state to true
    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
      const response = await axios.delete(`/api/user/deleteUser/${id}`);
      toast.success(response.data?.message || "Account deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting account");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
    <div className="space-y-6">
      <div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Ex. John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ex. johndoe@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end ">
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Update Info
          </button>
        </div>
      </div>

      <div className="border-t"></div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="cPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <input
              type="password"
              id="cPassword"
              name="cPassword"
              value={formData.cPassword}
              onChange={handleChange}
              placeholder="Current password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="nPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="nPassword"
              name="nPassword"
              value={formData.nPassword}
              onChange={handleChange}
              placeholder="New password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="cNewPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="cNewPassword"
              name="cNewPassword"
              value={formData.cNewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleChangePassword} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Change Password
          </button>
        </div>
      </div>

      <div className="border-t"></div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Delete Account
        </h3>
        <div className="border rounded-md py-3 px-4 flex gap-3 text-red-500 border-red-500 ">
          <ExclamationCircleIcon className="w-5 h-5 mt-1" />
          <div>
            <p className="font-medium">Warning</p>
            <p className="text-sm">
              Deleting your account is permanent and cannot be undone. All your
              data will be removed.
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={()=> setShowDeleteModal(true)} className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete Account
          </button>
        </div>
      </div>
    </div>
      {showDeleteModal && (
              <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDelete(user?.id)} loading={loading} />
            )}
    </>
  );
};
