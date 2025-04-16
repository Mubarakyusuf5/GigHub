import React, { useEffect, useState } from "react";
import { FrlncrKYC } from "../freelancer/FrlncrKYC";
import { ClientKYC } from "../client/ClientKYC";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserPaymentSetting } from "../../components/accountSetting/UserPaymentSetting";

export const CompleteProfile = () => {
  const [loading, setLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [accountDetail, setAccountDetail] = useState("");
  const { user, logout } = useAuth();

  // verifyAccount function
  const verifyAccount = async (accountNumber, bankCode) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://nubapi.com/api/verify?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NUBAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

      if (response.data?.status) {
        setAccountDetail(response.data);
        toast.success("Account verified successfully");
      } else {
        toast.error(response.data?.message || "Verification failed");
      }
      // setAccountDetail(response.data)
      // toast.success(response.data?.status === true && "Account verified successfully")
      // toast.error(response.data?.status === false && response.data?.message)
      // console.log("Response Data:", response.data);
    } catch (error) {
      // console.error("verifyAccount", error);
      toast.error("Error verifying account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    //API for fetching bank name and bank code
    const fetchBankDetail = async () => {
      try {
        const response = await axios.get("https://nubapi.com/bank-json", {
          withCredentials: false,
        });
        setBankDetail(response.data);
        // console.log("Response Data", response.data);
      } catch (error) {
        console.error("fetchBankDetail", error);
      }
    };
    fetchBankDetail();
  }, []);
  
  return (
    <div>
      <nav className="sticky top-0 bg-white z-20 p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-2">
          {/* <img
            src="/placeholder.svg"
            width={40}
            height={40}
            alt="GigHub Logo"
          /> */}
          <span className="text-xl font-bold text-[#3A506B]">GigHub</span>
        </div>
        <button
          onClick={() => logout()}
          className="flex items-center gap-1 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </nav>
      {user?.role === "Freelancer" && (
        <FrlncrKYC
          loading={loading}
          verifyAccount={verifyAccount}
          bankDetails={bankDetail}
          accountDetail={accountDetail}
        />
      )}
      {user?.role === "Client" && (
        <ClientKYC
          accountDetail={accountDetail}
          bankDetails={bankDetail}
          verifyAccount={verifyAccount}
          loading={loading}
        />
      )}
      <div className="hidden">
        <UserPaymentSetting
          accountDetail={accountDetail}
          bankDetails={bankDetail}
          verifyAccount={verifyAccount}
          loading={loading}
        />
      </div>
      {/* import userpayment component here and hide it to get above functions */}
    </div>
  );
};
