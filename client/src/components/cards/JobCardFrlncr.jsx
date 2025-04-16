// import React from "react";
import { BookmarkIcon, BriefcaseIcon, ClockIcon, CurrencyDollarIcon, StarIcon } from "@heroicons/react/24/outline"
import { formatNaira } from "../Data"
import { formatDistanceToNow } from "date-fns"
import { useLocation } from "react-router-dom"

// Job Card Component
export const JobCardFrlncr = ({ job, onSave, onView }) => {
    const location = useLocation()
    return (
      <div className="p-4 sm:p-6 hover:bg-gray-50 bg-white transition-colors cursor-pointer"  >
        <div className="flex justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {job.title}
          </h2>
          {location.pathname === "/dashboard" && <button
            onClick={onSave}
            className="text-gray-400 hover:text-blue-600 transition-colors ml-2 flex-shrink-0"
            aria-label={job.saved ? "Unsave job" : "Save job"}
          >
            <BookmarkIcon className={`h-5 w-5 ${job.saved ? "fill-blue-600 text-blue-600" : ""}`} />
          </button>}
        </div>
  
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm sm:text-base text-gray-700">{job.client.fullname  || "default"}</span>
          <div className="flex items-center">
            <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs sm:text-sm text-gray-600 ml-1">{job.clientRating || "4.3"}</span>
          </div>
        </div>
  
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex items-center text-gray-700 text-xs sm:text-sm">
            <CurrencyDollarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-500" />
            {formatNaira(job?.budget)}
          </div>
          <div className="flex items-center text-gray-700 text-xs sm:text-sm">
            <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-500" />
            {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
          </div>
          <div className="flex items-center text-gray-700 text-xs sm:text-sm">
            <BriefcaseIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-500" />
            {job?.proposalsToReview} proposals
          </div>
        </div>
  
        <p className="mt-3 text-sm sm:text-base text-gray-600 line-clamp-2">{job?.description}</p>
  
        <div className="mt-4 flex flex-wrap gap-2">
          {job?.skills.map((skill) => (
            <span key={skill} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-800 text-xs sm:text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>
  
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm">
            Apply Now
          </button> */}
          <button onClick={onView} className="w-full sm:w-auto text-center sm:text-left text-blue-600 hover:text-blue-800 font-medium text-sm">
            View Details
          </button>
        </div>
      </div>
    )
  }