import React, { useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  BriefcaseIcon,
  UserIcon,
  LinkIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { States } from "../../components/Data";

export const FrlncrKYC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    bio: "",
    experienceLevel: "",
    availability: "",
    accntName: "",
    accntNumber: "",
    paymentMethod: "",
    portfolio: "",
    github: "",
    linkedin: "",
  });
  const [newSkill, setNewSkill] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSelectChange = (name, value) => {
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleFinish = () => {
    // In a real app, you would navigate to the dashboard
    // For this example, we'll just reset the form
    alert("Profile setup complete! Redirecting to dashboard...");
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
      paymentMethod: "",
      portfolio: "",
      github: "",
      linkedin: "",
    });
  };

  const steps = [
    { id: 1, name: "Basic Details", icon: <UserIcon className="h-5 w-5" /> },
    {
      id: 2,
      name: "Skills & Expertise",
      icon: <BriefcaseIcon className="h-5 w-5" />,
    },
    {
      id: 3,
      name: "Portfolio & Links",
      icon: <LinkIcon className="h-5 w-5" />,
    },
    {
      id: 4,
      name: "Verification",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
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
              {step === 1 && "Tell us about yourself and your expertise"}
              {step === 2 &&
                "Let clients know skills you're expert in"}
              {step === 3 && "Share your work and professional profiles"}
              {step === 4 && "Review your information before finalizing"}
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
                    placeholder="e.g. Senior Frontend Developer"
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
                    Experience Level
                  </label>
                  <select
                    id="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your state
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
                    htmlFor="experienceLevel"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience Level
                  </label>
                  <select
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
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      id="skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e && e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-600"
                        >
                          <span className="sr-only">Remove</span>
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
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
                    value={formData.bankName || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select your Bank Name
                    </option>
                    <option value="full-time">UBA</option>
                    <option value="part-time">
                      FCMB
                    </option>
                    <option value="limited">OPAY</option>
                    <option value="occasional">
                      KUDA
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="accntName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Name
                  </label>
                  <input
                    id="accntName"
                    name="accntName"
                    type="text"
                    value={formData.accntName}
                    onChange={handleChange}
                    placeholder="E.x. John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="accntNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Account Number
                  </label>
                  <input
                    id="accntNumber"
                    name="accntNumber"
                    type="number"
                    value={formData.accntNumber}
                    onChange={handleChange}
                    placeholder="E.x. 1234567890"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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

                    <div>
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
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Account Name
                      </h4>
                      <p className="mt-1">
                        {formData.accntName
                          ? `${formData.accntName}`
                          : "Not provided"}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Account Number
                      </h4>
                      <p className="mt-1">
                        {formData.accntNumber
                          ? `${formData.accntNumber}`
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
                onClick={handleFinish}
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
