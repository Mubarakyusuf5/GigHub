import { CameraIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { States } from "../Data";

export const FreeProfileSetting = ({profile}) => {
      const [formData, setFormData] = useState({
        title: profile?.title || "",
        skills: profile?.skills || [],
        bio: profile?.bio || "",
        state: profile?.state || "",
        experienceLevel: profile?.experienceLevel || "",
        portfolio: profile?.portfolio || "",
        github: profile?.github || "",
        linkedin: profile?.linkedin || "",
        profilePicture: profile?.profilePicture || "",
      });
      // import.meta.env.VITE_BACKEND_URL/profile?.profilePicture
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
                  src={preview || "/placeholder.svg"}
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Professional Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex. johndoe@example.com"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Select your experience level
                </option>
                <option value="Entry">Entry Level (0-2 years)</option>
                <option value="Intermediate">Intermediate (2-5 years)</option>
                <option value="Expert">Expert (5-10 years)</option>
                {/* <option value="senior">Senior (10+ years)</option> */}
              </select>
            </div>
          </div>
          <div>skills input</div>
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
          {/* <div></div> */}
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
