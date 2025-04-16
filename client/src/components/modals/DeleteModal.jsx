import React from "react";
import { ClipLoader } from "react-spinners";

export const DeleteModal = ({ onClose, onDelete, loading }) => {
  return (
    <div className="bg-black z-50 py-5 md:px-4 bg-opacity-20 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold font-poppins text-gray-800 mb-2">Confirm Deletion</h2>
        <div className="border-t mb-2"></div>
        <p className="text-gray-600 mb-2">Are you sure you want to delete? This action cannot be undone.</p>
        <div className="flex justify-end gap-1 h-10">
        <button
            onClick={onClose}
            className="px-6 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 duration-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-6  bg-red-500 flex items-center justify-center text-white rounded-lg hover:bg-red-600 duration-300 transition-colors"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Delete"}
          </button>
          
        </div>
      </div>
    </div>
  );
};
