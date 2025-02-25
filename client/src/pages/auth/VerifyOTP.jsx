import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock API function for OTP validation
const validateOTP = async (otp) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ success: true });
      } else {
        reject(new Error("Invalid OTP"));
      }
    }, 1000);
  });
};

export const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef(new Array(6).fill(null));
  const navigate = useNavigate()

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Ensure only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only last character is stored
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await validateOTP(otpValue);
      setSuccess(true);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const sendOtp =()=>{
  //   console.log("OTP sent to your email!")
  // }

  const resendOTP = () => {
    setTimeLeft(60);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
    console.log("OTP sent to your email!")
  };

  // if (success) {
  //   // return (
  //   //   <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
  //   //     <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
  //   //       <h2 className="text-2xl font-bold text-green-600 mb-4">OTP Verified Successfully!</h2>
  //   //       <p className="text-gray-600">You can now proceed with your action.</p>
  //   //     </div>
  //   //   </div>
  //   // );
  //   navigate("/login")
  // }
  useEffect(() => {
    if (success) {
      // setTimeout(() => {
        navigate("/login"); // Redirect after success
      // }, 1000);
    }
  }, [success, navigate]);

  return (
    <div className="flex items-center p-4 justify-center min-h-screen font-poppins">
      <div className="border p-8 rounded-md w-[410px]">
        <h2 className="text-2xl font-medium text-center text-gray-800 mb-3">Enter OTP</h2>
        <p className="text-center text-gray-600 text-sm mb-8">We've sent a 6-digit code to your phone number</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <div className="text-center text-sm mt-4 text-gray-600">
          {timeLeft > 0 ? (
            <p>Resend OTP in {timeLeft} seconds</p>
          ) : (
            <button onClick={resendOTP} className="text-indigo-600 font-semibold hover:underline">
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};



