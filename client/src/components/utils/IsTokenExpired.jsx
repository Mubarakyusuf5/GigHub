// import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const isTokenExpired = () => {
  // const refreshToken = Cookies.get("refreshToken");  
  // if (!refreshToken) return true; // Consider it expired if not found  

  // try {
  //   const { exp } = jwtDecode(refreshToken);
  //   return Date.now() / 1000 > exp; // Returns true if expired
  // } catch {
  //   return true; // Consider expired if there's an error
  // }
};