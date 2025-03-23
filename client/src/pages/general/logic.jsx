// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { toast } from "react-hot-toast";
// import isTokenExpired from "../utils/isTokenExpired"; // Import utility function

// const ExpiredModal = () => {
//     const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // if (isTokenExpired()) {
//     // //   Cookies.remove("refreshToken");
//     // //   Cookies.remove("accessToken");
//     //   toast.error("Session expired. Please log in again.");
//     // //   navigate("/login");
//     // }
//     if (isTokenExpired()) {
//         setShowModal(true); // Show warning before logout
//       }
//   }, []); // Runs on mount

//   return (
//     <div>
//         {showModal && <div>modal shows if expired</div>}
//     </div>
//   ); // No UI, just a behavior
// };


// import jwtDecode from "jwt-decode";
// // import {Cookies} from "js-cookie";

// const isTokenExpired = () => {
//   const refreshToken = Cookies.get("refreshToken");  
//   if (!refreshToken) return true; // Consider it expired if not found  

//   try {
//     const { exp } = jwtDecode(refreshToken);
//     return Date.now() / 1000 > exp; // Returns true if expired
//   } catch {
//     return true; // Consider expired if there's an error
//   }
// };

// export default isTokenExpired;


// import axios from 'axios';

// const fetchData = async () => {
//     try {
//         const response = await axios.get('http://nubapi.test/api/verify', {
//             params: {
//                 account_number: '12345678910',
//             },
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer YOUR_ACTUAL_TOKEN` // Replace with your actual token
//             }
//         });

//         console.log('Response Data:', response.data);
//     } catch (error) {
//         if (error.response) {
//             console.error(`Request failed with status ${error.response.status}:`, error.response.data);
//         } else if (error.request) {
//             console.error('No response received:', error.request);
//         } else {
//             console.error('Error setting up request:', error.message);
//         }
//     }
// };

// fetchData();


