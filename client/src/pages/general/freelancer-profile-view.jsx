import { useState, useRef } from "react"
import {
  GlobeAltIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ShareIcon,
  StarIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"

// Custom social media icons using SVG paths
const SocialIcons = {
  Linkedin: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Twitter: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  Github: () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

export const ClientProfileView =({ isOpen, onClose, client })=> {
  const [activeTab, setActiveTab] = useState("overview")
  const modalRef = useRef(null)

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <StarIcon key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  src={client.profilePicture || "/placeholder.svg?height=80&width=80"}
                  alt={client.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{client.name}</h2>
                  <p className="text-gray-600 flex items-center gap-1">
                    <BuildingOfficeIcon className="h-4 w-4" />
                    {client.company}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-2 md:mt-0">
                  {client.socialLinks.linkedin && (
                    <a
                      href={client.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <SocialIcons.Linkedin />
                    </a>
                  )}
                  {client.socialLinks.twitter && (
                    <a
                      href={client.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-400 transition-colors"
                    >
                      <SocialIcons.Twitter />
                    </a>
                  )}
                  {client.socialLinks.github && (
                    <a
                      href={client.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <SocialIcons.Github />
                    </a>
                  )}
                  {client.socialLinks.website && (
                    <a
                      href={client.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-teal-600 transition-colors"
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                    </a>
                  )}
                  <button
                    className="ml-2 p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    title="Share profile"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {client.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <GlobeAltIcon className="h-4 w-4 mr-1" />
                  {client.industry}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {client.companySize}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  Member since {client.memberSince}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "projects"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === "reviews"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:border-b-2 hover:border-gray-300"
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-600">{client.about}</p>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className={`flex items-center p-3 rounded-lg ${
                      client.verificationStatus.payment ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <CheckBadgeIcon
                      className={`h-5 w-5 mr-2 ${
                        client.verificationStatus.payment ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {client.verificationStatus.payment ? "Payment Verified" : "Payment Unverified"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center p-3 rounded-lg ${
                      client.verificationStatus.identity ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <CheckBadgeIcon
                      className={`h-5 w-5 mr-2 ${
                        client.verificationStatus.identity ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium">
                      {client.verificationStatus.identity ? "Identity Verified" : "Identity Unverified"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center p-3 rounded-lg ${
                      client.verificationStatus.email ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <CheckBadgeIcon
                      className={`h-5 w-5 mr-2 ${client.verificationStatus.email ? "text-green-500" : "text-gray-400"}`}
                    />
                    <span className="text-sm font-medium">
                      {client.verificationStatus.email ? "Email Verified" : "Email Unverified"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Client Stats</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <BriefcaseIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Projects Posted</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{client.stats.projectsPosted}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <UserGroupIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Freelancers Hired</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{client.stats.hiredFreelancers}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Total Spent</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{client.stats.totalSpent}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-1">
                      <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Avg. Response Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{client.stats.avgResponseTime}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Information</h3>
                <div className="space-y-3">
                  {client.email && (
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <a href={`mailto:${client.email}`} className="text-blue-600 hover:underline">
                        {client.email}
                      </a>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <a href={`tel:${client.phone}`} className="text-blue-600 hover:underline">
                        {client.phone}
                      </a>
                    </div>
                  )}
                  {client.website && (
                    <div className="flex items-center">
                      <GlobeAltIcon className="h-5 w-5 text-gray-500 mr-2" />
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {client.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Posted Projects</h3>

              {client.projects.length > 0 ? (
                <div className="space-y-4">
                  {client.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-medium text-gray-800">{project.title}</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {project.category}
                              </span>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  project.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : project.status === "completed"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-800">{project.budget}</div>
                            <div className="text-sm text-gray-500">{project.date}</div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600 line-clamp-2">{project.description}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            {project.applicants} applicant{project.applicants !== 1 ? "s" : ""}
                          </div>
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No projects posted yet</h3>
                  <p className="mt-1 text-gray-500">This client hasn't posted any projects yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Reviews from Freelancers</h3>
                {client.reviews.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {renderStars(
                        client.reviews.reduce((acc, review) => acc + review.rating, 0) / client.reviews.length,
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {(client.reviews.reduce((acc, review) => acc + review.rating, 0) / client.reviews.length).toFixed(
                        1,
                      )}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({client.reviews.length} review{client.reviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                )}
              </div>

              {client.reviews.length > 0 ? (
                <div className="space-y-4">
                  {client.reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={review.freelancerAvatar || "/placeholder.svg?height=40&width=40"}
                            alt={review.freelancerName}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{review.freelancerName}</h4>
                              <div className="flex items-center mt-1">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">Project: {review.projectTitle}</div>
                          </div>
                          <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <StarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-gray-500">This client hasn't received any reviews yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

