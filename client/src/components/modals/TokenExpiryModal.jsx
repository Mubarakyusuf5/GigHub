import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
import { isTokenExpired } from "../utils/IsTokenExpired"; // Import utility function
// import logout from useContext
export const TokenExpiryModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isTokenExpired()) {
      setShowModal(true); // Show warning before logout
    }
  }, []); // Runs on mount

  return (
    <div>
      {showModal && (
        <div className="bg-black z-40 py-5 md:px-4 bg-opacity-20 fixed top-0 left-0 w-full min-h-screen flex justify-center items-center">
          modal shows if expired
        </div>
      )}
      {isTokenExpired()}
    </div>
  );
};
