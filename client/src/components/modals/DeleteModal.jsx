import React from "react";

export const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div className="bg-black z-20 py-5 md:px-4 bg-opacity-20 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold font-poppins text-gray-800 mb-2">Confirm Deletion</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to delete? This action cannot be undone.</p>
        
        <div className="flex justify-end gap-1">
          <button
            onClick={onDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
