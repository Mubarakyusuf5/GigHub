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
  AcademicCapIcon,
  CameraIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { States } from "../../components/Data";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// maybe include an select for bank code then displayiing the bankname(bankcode)
export const FrlncrKYC = ({
  loading,
  verifyAccount,
  bankDetails,
  accountDetail,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    bio: "",
    state: "",
    experienceLevel: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    portfolio: "",
    github: "",
    linkedin: "",
    profilePicture: "",
  });
  const fileInputRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState("");
  const [bankCode, setbankCode] = useState("");
  const navigate = useNavigate();
  // State for skills input and dropdown
  const [skillInput, setSkillInput] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false);
  const skillsInputRef = useRef(null);
  const dropdownRef = useRef(null);
  // console.log(bankDetails.map(({name, code}) => `${code}: ${name}`))
  // console.log(accountDetail && accountDetail.account_name)

  const validateStep4 = async () => {
    const { bankName, accountNumber } = formData;
    if (!bankName || !accountNumber ) {
      toast.error("Please fill in all bank details.");
      return false;
    }else if (accountDetail.account_name){
      setStep(step + 1);
      return
    }
    // console.log(bankCode, " ", accountNumber)
    await verifyAccount(accountNumber, bankCode);
  };

  const handleNext = async () => {
    if (step === 4 && !(await validateStep4())) return;
    setStep(step + 1);
  };
  const handleBack = () => setStep(step - 1);
  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  //profile picture logic
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

  // Filter skills based on input
  useEffect(() => {
    if (skillInput.trim() === "") {
      setFilteredSkills([]);
      return;
    }
    const filtered = skills.filter(
      (skill) =>
        skill.toLowerCase().includes(skillInput.toLowerCase()) &&
        !formData.skills.includes(skill)
    );
    setFilteredSkills(filtered);
  }, [skillInput, formData.skills]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        skillsInputRef.current &&
        !skillsInputRef.current.contains(event.target)
      ) {
        setIsSkillsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
    setIsSkillsDropdownOpen(true);
  };

  const handleSkillInputKeyDown = (e) => {
    // Add skill when pressing Enter
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();

      // If there are filtered skills, add the first one
      if (filteredSkills.length > 0) {
        addSkill(filteredSkills[0]);
      } else {
        // Add custom skill if it doesn't exist in the list
        const formattedSkill = skillInput.trim();
        if (!formData.skills.includes(formattedSkill)) {
          addSkill(formattedSkill);
        }
      }
    }
  };

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setSkillInput("");
    setIsSkillsDropdownOpen(false);
    skillsInputRef.current.focus();
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const fetchSkills = async () => {
    try {
      const response = await axios.get("/api/cat/displayCategory");
      setSkills(response.data[0].skills);
      // console.log(response.data[0].skills)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch category.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // submitting logic to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        title,
        skills,
        bio,
        state,
        experienceLevel,
        bankName,
        accountName,
        accountNumber,
        profilePicture,
      } = formData;

      if (!accountName || !accountNumber || !bankName) {
        toast.error("All bank details must be provided");
      }

      if (!title || !skills || !bio || !experienceLevel) {
        toast.error("All basic details must be provided");
      }

      if (!state) {
        toast.error("Location must be provided");
      }

      if (!profilePicture) {
        toast.error("Profile picture must be provided");
      }

      console.log({...formData, accountName: accountDetail?.account_name});

      const response = await axios.post(
        "/api/profile/createFrlncrProfile",
        {...formData, accountName: accountDetail?.account_name},
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message || "Profile created successfully");
      navigate("/dashboard");
      setStep(1);
      setFormData({
        title: "",
        skills: [],
        bio: "",
        state: "",
        experienceLevel: "",
        bankName: "",
        accountName: "",
        accountNumber: "",
        portfolio: "",
        github: "",
        linkedin: "",
        profilePicture: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error creating profile, please try again..."
      );
    }
  };

  const steps = [
    { id: 1, name: "Basic Details", icon: <UserIcon className="h-5 w-5" /> },
    {
      id: 2,
      name: "Skills & Expertise",
      icon: <AcademicCapIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Portfolio & Links",
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Bank Details",
      icon: <BanknotesIcon className="h-5 w-5" />,
    },
    {
      id: 5,
      name: "Profile Picture",
      icon: <CameraIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Complete Your Freelancer Profile
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Let's set up your profile to help you find the perfect projects
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
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
              {step === 2 && "Let clients know skills you're expert in"}
              {step === 3 && "Share your work and professional profiles"}
              {step === 4 && "Provide your bank detail for seamless payment"}
              {step === 5 && "Upload a professional profile picture"}
            </p>
          </div>
          <div className="px-6 py-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Professional Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex. Frontend Developer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell clients about your experience, expertise, and work style"
                    rows={4}
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
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your Location
                    </option>
                    {States.map(({ state }, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 py-2 px-4 rounded-b-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
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
                        <p className="text-sm text-yellow-700">
                          This platform is limited only to people living nigeria
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="experienceLevel"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    id="experienceLevel"
                    value={formData.experienceLevel || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your experience level
                    </option>
                    <option value="Entry">Entry Level (0-2 years)</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Required <span className="text-red-500">*</span>
                  </label>

                  {/* Selected skills tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-blue-700 hover:text-blue-900 focus:outline-none"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Skills search input */}
                  <div className="relative">
                    <div className="flex items-center relative">
                      <MagnifyingGlassIcon className="absolute left-3 text-gray-400 w-5 h-5" />
                      <input
                        ref={skillsInputRef}
                        type="text"
                        value={skillInput}
                        onChange={handleSkillInputChange}
                        onKeyDown={handleSkillInputKeyDown}
                        onFocus={() => setIsSkillsDropdownOpen(true)}
                        placeholder="Search for skills..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Skills dropdown */}
                    {isSkillsDropdownOpen && filteredSkills.length > 0 && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
                      >
                        {filteredSkills.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                          >
                            <span>{skill}</span>
                            <CheckIcon className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100" />
                          </button>
                        ))}
                      </div>
                    )}

                    {isSkillsDropdownOpen &&
                      skillInput &&
                      filteredSkills.length === 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-4 text-sm text-gray-500">
                          No matching skills found
                        </div>
                      )}
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Search and select skills from the list
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Portfolio Website
                  </label>
                  <input
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    GitHub Profile
                  </label>
                  <input
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourusername"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {step === 4 && (
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
                      bankDetails.map(({ name, code, id }) => (
                        <option key={id} value={name}>
                          {name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No banks available</option>
                    )}
                  </select>
                </div>

                {formData.bankName && (
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
                )}

                {accountDetail?.account_name && <div>
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
                </div>}
              </div>
            )}

            {step === 5 && (
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

            {step === 6 && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Profile Summary
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Professional Title
                      </h4>
                      <p className="mt-1">{formData.title || "Not provided"}</p>
                    </div>

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

                    <div className="md:col-span-2">
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
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Bio</h4>
                      <p className="mt-1">{formData.bio || "Not provided"}</p>
                    </div>

                    <div className="md:col-span-2">
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
                    </div>
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

            {step < 5 ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? "Validating..." : "Next"}
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
