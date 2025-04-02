import React, { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, BanknotesIcon, UserIcon, EnvelopeIcon, CameraIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import axios from "axios";

export const Preview2 = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // For API validation
  const [formData, setFormData] = useState({
    buisnessType: "",
    companyName: "",
    industry: "",
    email: "",
    phoneNumber: "",
    website: "",
    state: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const { buisnessType, companyName, industry } = formData;
    if (!buisnessType || !companyName || !industry) {
      toast.error("Please fill in all required fields in Step 1.");
      return false;
    }
    return true;
  };

  const validateStep2 = async () => {
    const { bankName, accountName, accountNumber } = formData;
    if (!bankName || !accountName || !accountNumber) {
      toast.error("Please fill in all bank details.");
      return false;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/api/validate-bank-account`, {
        params: { bankName, accountNumber },
      });

      if (response.data.valid) {
        toast.success("Bank account validated successfully.");
        return true;
      } else {
        toast.error("Invalid bank account. Please check your details.");
        return false;
      }
    } catch (error) {
      toast.error("Error validating bank account.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !(await validateStep2())) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Client Information Form</h1>
        
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          {step === 1 && (
            <div>
              <label className="block">Business Type</label>
              <select name="buisnessType" value={formData.buisnessType} onChange={handleChange} className="w-full border p-2">
                <option value="">Select Business Type</option>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>

              <label className="block mt-4">Company Name</label>
              <input name="companyName" type="text" value={formData.companyName} onChange={handleChange} className="w-full border p-2" />
              
              <label className="block mt-4">Industry</label>
              <input name="industry" type="text" value={formData.industry} onChange={handleChange} className="w-full border p-2" />
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block">Bank Name</label>
              <select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full border p-2">
                <option value="">Select Bank</option>
                <option value="UBA">UBA</option>
                <option value="FCMB">FCMB</option>
                <option value="OPAY">OPAY</option>
                <option value="KUDA">KUDA</option>
              </select>

              <label className="block mt-4">Account Name</label>
              <input name="accountName" type="text" value={formData.accountName} onChange={handleChange} className="w-full border p-2" />

              <label className="block mt-4">Account Number</label>
              <input name="accountNumber" type="text" value={formData.accountNumber} onChange={handleChange} className="w-full border p-2" />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
          )}

          {step < 3 && (
            <button onClick={handleNext} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {loading ? "Validating..." : "Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// Compare this snippet from client/src/pages/client/Preview.jsx: