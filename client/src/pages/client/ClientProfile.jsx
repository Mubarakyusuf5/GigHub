"use client"

import { useState, useEffect } from "react"
import {
  UserIcon,
  BuildingOfficeIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  BellIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "../../Context/AuthContext"
import toast from "react-hot-toast"

export const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const { user } = useAuth()

  // Client profile state
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    paymentMethods: [
      { id: 1, type: "Credit Card", last4: "4242", expiry: "12/25", isDefault: true },
      { id: 2, type: "PayPal", email: "client@example.com", isDefault: false },
    ],
    notificationSettings: {
      email: true,
      sms: false,
      proposals: true,
      messages: true,
      projectUpdates: true,
      marketing: false,
    },
    profilePicture: null,
  })

  // Fetch client profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        // In a real implementation, you would fetch the client profile from your API
        // const response = await axios.get("/api/profile/displayClientProfile")
        // setProfile(response.data.client[0])

        // For demo purposes, we'll use a timeout to simulate API call
        setTimeout(() => {
          // This would be replaced with actual API data
          setProfile({
            fullName: "Sarah Miller",
            email: "sarah.miller@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            bio: "Project manager with over 8 years of experience in tech and digital marketing. Looking for talented freelancers to help bring our company's vision to life.",
            companyName: "InnovateX Solutions",
            companyWebsite: "www.innovatex.com",
            industry: "Technology",
            companySize: "50-100",
            foundedYear: "2015",
            paymentMethods: [
              { id: 1, type: "Credit Card", last4: "4242", expiry: "12/25", isDefault: true },
              { id: 2, type: "PayPal", email: "sarah@innovatex.com", isDefault: false },
            ],
            notificationSettings: {
              email: true,
              sms: false,
              proposals: true,
              messages: true,
              projectUpdates: true,
              marketing: false,
            },
            profilePicture: "/placeholder.svg?height=200&width=200",
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching profile")
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Handle nested objects like notificationSettings
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Handle checkbox changes for notification settings
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target

    // Handle nested objects for notification settings
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: checked,
        },
      }))
    }
  }

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, you would update the client profile via API
      // const formData = new FormData()
      // Object.keys(profile).forEach(key => {
      //   if (key !== 'profilePicture') {
      //     formData.append(key, profile[key])
      //   }
      // })
      // if (profileImage) {
      //   formData.append('profilePicture', profileImage)
      // }
      // await axios.put("/api/profile/updateClientProfile", formData)

      // For demo purposes, we'll use a timeout to simulate API call
      setTimeout(() => {
        toast.success("Profile updated successfully")
        setIsEditing(false)
        setIsLoading(false)

        // Update profile picture in state if a new one was selected
        if (imagePreview) {
          setProfile((prev) => ({
            ...prev,
            profilePicture: imagePreview,
          }))
        }
      }, 1500)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile")
      setIsLoading(false)
    }
  }

  // Handle payment method removal
  const handleRemovePaymentMethod = (id) => {
    setProfile((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((method) => method.id !== id),
    }))
    toast.success("Payment method removed")
  }

  // Handle setting default payment method
  const handleSetDefaultPayment = (id) => {
    setProfile((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    }))
    toast.success("Default payment method updated")
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile header with image and basic info */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-32 sm:h-40">
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <p className="text-white text-sm font-medium">Edit mode active</p>
              </div>
            )}
          </div>

          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-20 mb-6 sm:mb-8">
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden mx-auto sm:mx-0">
                {isLoading ? (
                  <div className="animate-pulse bg-gray-200 h-full w-full"></div>
                ) : (
                  <>
                    <img
                      src={imagePreview || profile.profilePicture || "/placeholder.svg?height=200&width=200"}
                      alt={profile.fullName}
                      className="h-full w-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <label
                          htmlFor="profile-image"
                          className="cursor-pointer p-2 bg-white bg-opacity-90 rounded-full"
                        >
                          <ArrowUpTrayIcon className="h-6 w-6 text-gray-700" />
                          <input
                            type="file"
                            id="profile-image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoading ? <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div> : profile.fullName}
                </h2>
                <p className="text-gray-600 mt-1">
                  {isLoading ? <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div> : profile.companyName}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                      isEditing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    } transition-colors`}
                  >
                    {isEditing ? (
                      <>
                        <XMarkIcon className="h-4 w-4 mr-1.5" />
                        Cancel Editing
                      </>
                    ) : (
                      <>
                        <PencilSquareIcon className="h-4 w-4 mr-1.5" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 overflow-x-auto" aria-label="Profile tabs">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "personal"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <UserIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab("company")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "company"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <BuildingOfficeIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                  Company Details
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "payment"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <CreditCardIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "settings"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <BellIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === "security"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <ShieldCheckIcon className="inline-block h-5 w-5 mr-2 -mt-0.5" />
                  Security
                </button>
              </nav>
            </div>

            {/* Tab content */}
            <div className="py-6">
              <form onSubmit={handleSubmit}>
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={profile.fullName}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        disabled={!isEditing || isLoading}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Tell us about yourself and your projects"
                      />
                    </div>
                  </div>
                )}

                {/* Company Details Tab */}
                {activeTab === "company" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={profile.companyName}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Website
                        </label>
                        <input
                          type="url"
                          id="companyWebsite"
                          name="companyWebsite"
                          value={profile.companyWebsite}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="www.example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <select
                          id="industry"
                          name="industry"
                          value={profile.industry}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="">Select industry</option>
                          <option value="Technology">Technology</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Size
                        </label>
                        <select
                          id="companySize"
                          name="companySize"
                          value={profile.companySize}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="50-100">50-100 employees</option>
                          <option value="101-500">101-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700 mb-1">
                          Founded Year
                        </label>
                        <input
                          type="text"
                          id="foundedYear"
                          name="foundedYear"
                          value={profile.foundedYear}
                          onChange={handleInputChange}
                          disabled={!isEditing || isLoading}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                          placeholder="e.g. 2015"
                        />
                      </div>
                    </div>

                    {/* Company logo upload section */}
                    <div className="mt-6 border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Company Logo</h3>
                      <div className="flex items-center">
                        <div className="h-24 w-24 rounded-md border border-gray-300 bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src="/placeholder.svg?height=100&width=100"
                            alt="Company logo"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="ml-5">
                          {isEditing ? (
                            <div>
                              <label
                                htmlFor="company-logo"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                              >
                                <ArrowUpTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
                                Upload new logo
                                <input
                                  id="company-logo"
                                  name="companyLogo"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                />
                              </label>
                              <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">Upload your company logo to enhance your profile.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Methods Tab */}
                {activeTab === "payment" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Payment Methods</h3>

                    {profile.paymentMethods.length > 0 ? (
                      <div className="space-y-4">
                        {profile.paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`border ${
                              method.isDefault ? "border-blue-300 bg-blue-50" : "border-gray-200"
                            } rounded-lg p-4 relative`}
                          >
                            {method.isDefault && (
                              <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Default
                              </span>
                            )}
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                {method.type === "Credit Card" ? (
                                  <div className="h-10 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center text-white font-bold text-xs">
                                    CARD
                                  </div>
                                ) : (
                                  <div className="h-10 w-16 bg-blue-400 rounded-md flex items-center justify-center text-white font-bold text-xs">
                                    PAYPAL
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="text-sm font-medium text-gray-900">{method.type}</h4>
                                {method.type === "Credit Card" ? (
                                  <p className="text-sm text-gray-600">
                                    •••• •••• •••• {method.last4} | Expires {method.expiry}
                                  </p>
                                ) : (
                                  <p className="text-sm text-gray-600">{method.email}</p>
                                )}
                              </div>
                              <div className="ml-4 flex-shrink-0 flex space-x-2">
                                {!method.isDefault && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetDefaultPayment(method.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Set as default
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemovePaymentMethod(method.id)}
                                  className="text-sm text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                        <CreditCardIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                        <p className="mt-1 text-sm text-gray-500">Add a payment method to start hiring freelancers.</p>
                      </div>
                    )}

                    {isEditing && (
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <CreditCardIcon className="h-5 w-5 mr-2 text-gray-500" />
                          Add Payment Method
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Notification Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Communication Channels</h4>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="email-notifications"
                                name="notificationSettings.email"
                                type="checkbox"
                                checked={profile.notificationSettings.email}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="email-notifications" className="font-medium text-gray-700">
                                Email Notifications
                              </label>
                              <p className="text-gray-500">Receive updates and alerts via email</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="sms-notifications"
                                name="notificationSettings.sms"
                                type="checkbox"
                                checked={profile.notificationSettings.sms}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                                SMS Notifications
                              </label>
                              <p className="text-gray-500">Receive updates and alerts via text message</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Types</h4>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="proposals-notifications"
                                name="notificationSettings.proposals"
                                type="checkbox"
                                checked={profile.notificationSettings.proposals}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="proposals-notifications" className="font-medium text-gray-700">
                                New Proposals
                              </label>
                              <p className="text-gray-500">Get notified when you receive new proposals</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="messages-notifications"
                                name="notificationSettings.messages"
                                type="checkbox"
                                checked={profile.notificationSettings.messages}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="messages-notifications" className="font-medium text-gray-700">
                                Messages
                              </label>
                              <p className="text-gray-500">Get notified when you receive new messages</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="project-notifications"
                                name="notificationSettings.projectUpdates"
                                type="checkbox"
                                checked={profile.notificationSettings.projectUpdates}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="project-notifications" className="font-medium text-gray-700">
                                Project Updates
                              </label>
                              <p className="text-gray-500">Get notified about updates to your projects</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="marketing-notifications"
                                name="notificationSettings.marketing"
                                type="checkbox"
                                checked={profile.notificationSettings.marketing}
                                onChange={handleCheckboxChange}
                                disabled={!isEditing || isLoading}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-70"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="marketing-notifications" className="font-medium text-gray-700">
                                Marketing & Promotions
                              </label>
                              <p className="text-gray-500">Receive marketing communications and special offers</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>

                    {/* Password Change Section */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="current-password"
                              name="currentPassword"
                              disabled={!isEditing || isLoading}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 pr-10"
                              placeholder="Enter your current password"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="new-password"
                              name="newPassword"
                              disabled={!isEditing || isLoading}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 pr-10"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <EyeIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters and include a number and special character
                          </p>
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            id="confirm-password"
                            name="confirmPassword"
                            disabled={!isEditing || isLoading}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                            placeholder="Confirm new password"
                          />
                        </div>
                        {isEditing && (
                          <div className="pt-2">
                            <button
                              type="button"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
                            >
                              Update Password
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Add an extra layer of security to your account by enabling two-factor authentication
                          </p>
                        </div>
                        <div className="ml-4">
                          <button
                            type="button"
                            disabled={!isEditing || isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Account Deletion */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <h4 className="text-sm font-medium text-red-600">Danger Zone</h4>
                      <p className="mt-1 text-sm text-gray-500">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <div className="mt-4">
                        <button
                          type="button"
                          disabled={!isEditing || isLoading}
                          className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save button - only show when editing */}
                {isEditing && (
                  <div className="mt-8 pt-5 border-t border-gray-200">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        disabled={isLoading}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <CheckIcon className="h-4 w-4 mr-1.5" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

