import React, { useState } from "react";
import {
  BuildingLibraryIcon,
  UserIcon,
  CreditCardIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export const UserPaymentSetting = ({
  profile,
  loading,
  verifyAccount,
  bankDetails,
  accountDetail,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });
  const [bankCode, setbankCode] = useState("");
  // Sample data - replace with actual data in your implementation
  //   const bankDetail = {
  //     bankName: "Chase Bank",
  //     accountName: "John Doe",
  //     accountNumber: "1234567890",
  //   };
console.log(bankDetails, loading, accountDetail);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to mask account number for security
  const maskAccountNumber = (number) => {
    if (!number) return "";
    const lastFour = number.slice(-4);
    return `•••• •••• ${lastFour}`;
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const validateBankDetails = async () => {
    const { bankName, accountNumber } = formData;
    if (!bankName || !accountNumber) {
      toast.error("Please fill in all bank details.");
      return false;
    }
    // else if (accountDetail.account_name &&
    //   accountDetail.account_number === accountNumber &&
    //   accountDetail.bank_code === bankCode){
    //   setIsEditing(false);
    //   return true
    // }
    await verifyAccount(accountNumber, bankCode);
  };

  const handleSaveClick = async () => {
    if (!(await validateBankDetails())) return;
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <div className="space-y-3">
            {/* account name, acount number, bank name: bank code */}
            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bank Name
              </label>
              <select
                id="bankName"
                name="bankName"
                value={formData.bankName || ""}
                // onChange={handleChange}
                onChange={(e) => {
                  handleChange(e);
                  const selectedBank = bankDetails.find(
                    (bank) => bank.name === e.target.value
                  );
                  if (selectedBank) {
                    setbankCode(selectedBank.code); // Ensure setBankCode is correctly defined
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select your Bank Name
                </option>
                {bankDetails?.length > 0 ? (
                  bankDetails.map(({ name, id }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <option disabled>No banks available</option>
                )}
              </select>
            </div>

            {
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="number"
                  maxLength={10}
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="E.x. 1234567890"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            }

            {accountDetail?.account_name && (
              <div>
                <label
                  htmlFor="accountName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Account Name
                </label>
                <input
                  id="accountName"
                  name="accountName"
                  type="text"
                  value={accountDetail?.account_name || ""}
                  readOnly
                  // onChange={handleChange}
                  placeholder="E.x. John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
          {/* Action buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSaveClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
            >
              <PencilSquareIcon className="h-4 w-4 mr-1.5" />
              {loading ? "Validating..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <div className="px-3">
          <div className="divide-y divide-gray-100">
            {/* Bank Name */}
            <div className="py-4 flex items-center">
              <div className="w-10 flex-shrink-0">
                <BuildingLibraryIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <span className="text-sm font-medium text-gray-500">
                  Bank Name
                </span>
                <p className="text-base font-medium text-gray-900 mt-1">
                  {profile?.bankDetails?.bankName}
                </p>
              </div>
            </div>

            {/* Account Name */}
            <div className="py-4 flex items-center">
              <div className="w-10 flex-shrink-0">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <span className="text-sm font-medium text-gray-500">
                  Account Name
                </span>
                <p className="text-base font-medium text-gray-900 mt-1">
                  {profile?.bankDetails?.accountName}
                </p>
              </div>
            </div>

            {/* Account Number */}
            <div className="py-4 flex items-center">
              <div className="w-10 flex-shrink-0">
                <CreditCardIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-grow">
                <span className="text-sm font-medium text-gray-500">
                  Account Number
                </span>
                <div className="flex items-center mt-1">
                  <p className="text-base font-medium  text-gray-900">
                    {profile?.bankDetails?.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center"
            >
              <PencilSquareIcon className="h-4 w-4 mr-1.5" />
              Edit Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
