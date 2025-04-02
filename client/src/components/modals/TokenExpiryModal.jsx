import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/IsTokenExpired"; // Import utility function
import { useAuth } from "../../Context/AuthContext";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
export const TokenExpiryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    if (isTokenExpired()) {
      setShowModal(true); // Show warning before logout
    }
  }, []);

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <div className="bg-black z-40 py-5 md:px-4 bg-opacity-20 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center">
          <div className="max-w-sm w-full rounded-lg bg-white shadow-2xl overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-4">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Session Expired
                </h2>
              </div>
              <p className="text-gray-600 text-sm">
                Your session has expired due to inactivity. Please log in again
                to continue your work.
              </p>
            </div>
            <div className="border-t border-gray-100">
              <div className="px-6 py-4 flex justify-center">
                <button onClick={handleLogout} className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 shadow-sm">
                  Log out
                </button>
                <button onClick={()=> setShowModal(false)}>cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
