import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, UserIcon, BanknotesIcon, CameraIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axios from "axios";

export const Preview = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [errors, setErrors] = useState({
    businessType: "",
    companyName: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  // Simple validation for current step
  const validateCurrentStep = () => {
    const newErrors = {...errors};
    let isValid = true;

    if (step === 1) {
      if (!formData.businessType) {
        newErrors.businessType = "Please select a business type";
        isValid = false;
      }
      if (!formData.companyName) {
        newErrors.companyName = "Company name is required";
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.bankName) {
        newErrors.bankName = "Please select a bank";
        isValid = false;
      }
      if (!formData.accountName) {
        newErrors.accountName = "Account name is required";
        isValid = false;
      }
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Account number is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Verify bank account with a simple API call
  const verifyBankAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/verify-bank", {
        accountNumber: formData.accountNumber,
        bankCode: formData.bankName
      });
      console.log(response)
      
      if (!response.data.valid) {
        toast.error("Invalid bank account details");
        return false;
      }
      return true;
    } catch (error) {
      toast.error("Failed to verify bank account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    // Validate current step first
    if (!validateCurrentStep()) return;
    
    // For bank details step, verify with API
    if (step === 2) {
      const isValid = await verifyBankAccount();
      if (!isValid) return;
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = () => {
    toast.success("Profile created successfully!");
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Client Information</h1>
      
      {/* Progress Steps */}
      <div className="flex mb-8">
        <div className={`flex-1 text-center ${step >= 1 ? "font-bold" : ""}`}>Business Info</div>
        <div className={`flex-1 text-center ${step >= 2 ? "font-bold" : ""}`}>Bank Details</div>
        <div className={`flex-1 text-center ${step >= 3 ? "font-bold" : ""}`}>Complete</div>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 rounded-lg shadow">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
              {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
            </div>

            <div>
              <label className="block mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Bank Name</label>
              <select
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select bank</option>
                <option value="UBA">UBA</option>
                <option value="FCMB">FCMB</option>
                <option value="KUDA">KUDA</option>
              </select>
              {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
            </div>

            <div>
              <label className="block mb-1">Account Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.accountName && <p className="text-red-500 text-sm">{errors.accountName}</p>}
            </div>

            <div>
              <label className="block mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Review your information</h2>
            <div className="space-y-2">
              <p><strong>Business Type:</strong> {formData.businessType}</p>
              <p><strong>Company Name:</strong> {formData.companyName}</p>
              <p><strong>Bank:</strong> {formData.bankName}</p>
              <p><strong>Account Name:</strong> {formData.accountName}</p>
              <p><strong>Account Number:</strong> {formData.accountNumber}</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button 
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button 
              onClick={handleNext}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Next"}
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};