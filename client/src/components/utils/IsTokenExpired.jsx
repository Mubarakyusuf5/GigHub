import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


// cookies cant be accessed because my cookies are httponly can only be retrieved from the backend for security purpose from xcrf attack
export const isTokenExpired = () => {
  // Cookies.set('name', 'value'); // Set a cookie for testing purposes
  // // You can remove this line in production
  // console.log("Cookies: ", Cookies.get()); // Log all cookies for testing purposes

  // const refreshToken = Cookies.get(); 
  // if (!refreshToken) return true; // Consider it expired if not found  

  // try {
  //   const { exp } = jwtDecode(refreshToken);
  // console.log("token expiry ", exp)
  //   return Date.now() / 1000 > exp; // Returns true if expired
  // } catch {
  //   return true; // Consider expired if there's an error
  // }
};