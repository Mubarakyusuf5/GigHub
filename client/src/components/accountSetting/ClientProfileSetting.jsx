import React, { useState } from "react";
import { CameraIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Industries, States } from "../Data";

export const ClientProfileSetting = ({profile}) => {
  const [formData, setFormData] = useState({
    buisnessType: profile.buisnessType,
    companyName: profile.companyName,
    industry: profile.industry,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    website: profile.website,
    state: profile?.state,
    profilePicture: profile?.profilePicture,
  });
  console.log(formData)
  console.log(profile)
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex gap-3 items-center flex-col">
            {formData.profilePicture ? (
              <div className="relative">
                <img
                  src={preview || "/placeholder.svg"}// or profilepic
                  alt="Profile Preview"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                />
                <button
                  // onClick={removeProfilePicture}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                  aria-label="Remove profile picture"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                <UserIcon className="h-20 w-20 text-gray-400" />
              </div>
            )}
            <div>
              <input
                type="file"
                // ref={fileInputRef}
                // onChange={handleProfilePictureChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                // onClick={triggerFileInput}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CameraIcon className="h-5 w-5 mr-2" />
                {formData.profilePicture ? "Change Picture" : "Upload Picture"}
              </button>
            </div>
            {/* <p className="mt-1 text-xs text-gray-500">
                            JPG, GIF or PNG. 1MB max.
                          </p> */}
          </div>
        </div>
        <div className="space-y-4">
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
                Select your industry
              </option>
              {Industries.map(({ industry }) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
          {/* <div>
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
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Business Email
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
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
