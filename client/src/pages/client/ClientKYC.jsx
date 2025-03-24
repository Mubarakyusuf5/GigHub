import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  BriefcaseIcon,
  UserIcon,
  LinkIcon,
  ShieldCheckIcon,
  XMarkIcon,
  BanknotesIcon,
  PhotoIcon,
  CameraIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { States } from "../../components/Data";
import toast from "react-hot-toast";

export const ClientKYC = () => {
  const [step, setStep] = useState(1);
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
    profilePicture: "",
  });
  const fileInputRef = useRef(null);
  // const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
      }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeProfilePicture = () => {
    setFormData({ ...formData, profilePicture: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const { accountName, accountNumber, bankName, companyName, industry, phoneNumber, email, state, buisnessType, profilePicture}= formData

      if(!accountName || !accountNumber || !bankName){
        toast.error("All bank details must be provided")
      }

      if(!companyName || !industry || !buisnessType ){
        toast.error("All buisness / company details must be provided")
      }

      if(!state ){
        toast.error("Location must be provided")
      }
      if(!email || !phoneNumber){
        toast.error("All contact details must be provided")
      }
      if(!profilePicture){
        toast.error("Profile picture must be provided")
      }
      
      const response = await axios.post("/api/profile/createClientProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message || "Profile created successfully")

      console.log(formData);
      setStep(1);
      setFormData({
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
    } catch (error) {
      
    }


  };

  const steps = [
    {
      id: 1,
      name: "Basic Information",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      id: 2,
      name: "Contact Details",
      icon: <EnvelopeIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Bank Details",
      icon: <BanknotesIcon className="h-5 w-5" />,
    },
    // {
    //   id: 4,
    //   name: "Verification",
    //   icon: <ShieldCheckIcon className="h-5 w-5" />,
    // },
    {
      id: 4,
      name: "Profile Picture",
      icon: <CameraIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Complete Your Client Profile
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Let's set up your profile to help you find the perfect projects
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex flex-col items-center ${
                  s.id < step
                    ? "text-blue-600"
                    : s.id === step
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    s.id < step
                      ? "bg-blue-600 text-white border-blue-600"
                      : s.id === step
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {s.id < step ? <CheckIcon className="h-5 w-5" /> : s.icon}
                </div>
                <span className="mt-2 text-sm font-medium hidden sm:block">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-between">
              {steps.map((s) => (
                <div key={s.id}>
                  <div
                    className={`w-full h-1 ${
                      s.id <= step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                    style={{
                      width: s.id === steps.length ? "0" : "100%",
                      marginLeft: s.id === 1 ? "0" : "-50%",
                      marginRight: s.id === steps.length ? "0" : "50%",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Step {step}: {steps.find((s) => s.id === step)?.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === 1 && "Tell us about yourself and your basic details"}
              {step === 2 &&
                "Provide your contact information and communication preferences"}
              {step === 3 && "Enter your banking information for payments"}
              {step === 4 && "Verify your identity and review all information"}
            </p>
          </div>
          <div className="px-6 py-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="buisnessType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Buisness Type
                  </label>
                  <select
                    id="buisnessType"
                    name="buisnessType"
                    value={formData.buisnessType || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your Buisness Type
                    </option>
                    <option value="Entry">Individual</option>
                    <option value="Expert">Company</option>
                    {/* <option value="senior">Senior (10+ years)</option> */}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Buisness Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="E.x. Doe Enterprise"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your location
                    </option>
                    {States.map(({ state }, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Industry
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your experience level
                    </option>
                    <option value="Entry">Dev & IT</option>
                    <option value="Intermediate">
                      Intermediate (2-5 years)
                    </option>
                    <option value="Expert">Expert (5-10 years)</option>
                    {/* <option value="senior">Senior (10+ years)</option> */}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.x. johndoe@gmail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="E.x. 08123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Website (Optional)
                  </label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="E.x. https://comapny.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
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
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your Bank Name
                    </option>
                    <option value="full-time">UBA</option>
                    <option value="part-time">FCMB</option>
                    <option value="limited">OPAY</option>
                    <option value="occasional">KUDA</option>
                  </select>
                </div>

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
                    value={formData.accountName}
                    onChange={handleChange}
                    placeholder="E.x. John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

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
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="E.x. 1234567890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Profile Picture
                  </label>

                  <div className="mb-6">
                    {formData.profilePicture ? (
                      <div className="relative">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Profile Preview"
                          className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                        />
                        <button
                          onClick={removeProfilePicture}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                          aria-label="Remove profile picture"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                        <PhotoIcon className="h-20 w-20 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleProfilePictureChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <CameraIcon className="h-5 w-5 mr-2" />
                    {formData.profilePicture
                      ? "Change Picture"
                      : "Upload Picture"}
                  </button>

                  <p className="mt-4 text-sm text-gray-500 text-center max-w-md">
                    Upload a professional photo to make your profile stand out.
                    A high-quality headshot with good lighting on a neutral
                    background works best.
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Profiles with professional photos receive up to 14 times
                        more views and are more likely to be hired.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Professional Title
                      </h4>
                      <p className="mt-1">{formData.title || "Not provided"}</p>
                    </div> */}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Experience Level
                      </h4>
                      <p className="mt-1">
                        {formData.experienceLevel
                          ? {
                              entry: "Entry Level (0-2 years)",
                              intermediate: "Intermediate (2-5 years)",
                              expert: "Expert (5-10 years)",
                              senior: "Senior (10+ years)",
                            }[formData.experienceLevel]
                          : "Not provided"}
                      </p>
                    </div>

                    {/* <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Availability
                      </h4>
                      <p className="mt-1">
                        {formData.availability
                          ? {
                              "full-time": "Full-time (40+ hrs/week)",
                              "part-time": "Part-time (20-30 hrs/week)",
                              limited: "Limited (10-20 hrs/week)",
                              occasional: "Occasional (Less than 10 hrs/week)",
                            }[formData.availability]
                          : "Not provided"}
                      </p>
                    </div> */}

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Account Name
                      </h4>
                      <p className="mt-1">
                        {formData.accountName
                          ? `${formData.accountName}`
                          : "Not provided"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Account Number
                      </h4>
                      <p className="mt-1">
                        {formData.accountNumber
                          ? `${formData.accountNumber}`
                          : "Not provided"}
                      </p>
                    </div>

                    {/* <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">
                        Skills
                      </h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {formData.skills.length > 0 ? (
                          formData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p>No skills provided</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                      <p className="mt-1">{formData.bio || "Not provided"}</p>
                    </div> */}

                    {/* <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">
                        Links
                      </h4>
                      <ul className="mt-1 space-y-1">
                        <li>
                          {formData.portfolio ? (
                            <a
                              href={formData.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Portfolio Website
                            </a>
                          ) : (
                            "No portfolio provided"
                          )}
                        </li>
                        <li>
                          {formData.github ? (
                            <a
                              href={formData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              GitHub Profile
                            </a>
                          ) : (
                            "No GitHub profile provided"
                          )}
                        </li>
                        <li>
                          {formData.linkedin ? (
                            <a
                              href={formData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          ) : (
                            "No LinkedIn profile provided"
                          )}
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        By completing your profile, you agree to our Terms of
                        Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
 async e              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
 e.preventDefault()hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Profile
                <CheckIcon className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
