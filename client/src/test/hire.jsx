"use client"

import { useState } from "react"
import {
  UserCircleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { formatDistanceToNow } from "date-fns"

// interface HiredFreelancerProps {
//   hire: {
//     id: string
//     freelancer: {
//       id: string
//       fullname: string
//       avatar?: string
//       title?: string
//       rating?: number
//     }
//     hiredOn: string
//     bidAmount: string | number
//     coverLetter: string
//   }
//   onRemove: (id: string) => void
//   onViewDetails: (id: string) => void
//   onReview: (id: string) => void
//   onMessage: (id: string) => void
// }

export function HiredFreelancerCard({ hire, onRemove, onViewDetails, onReview, onMessage }) {
  const [isHovering, setIsHovering] = useState(false)

  // Format bid amount to currency if it's a number
  const formattedBidAmount = hire.bidAmount === "number" ? `$${hire.bidAmount.toLocaleString()}` : hire.bidAmount

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            {hire.freelancer.avatar ? (
              <img
                src={hire.freelancer.avatar || "/placeholder.svg"}
                alt={hire.freelancer.fullname}
                className="h-12 w-12 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <UserCircleIcon className="h-10 w-10" />
              </div>
            )}

            <div>
              <h3 className="font-semibold text-lg text-gray-900">{hire.freelancer.fullname}</h3>
              {hire.freelancer.title && <p className="text-sm text-gray-600">{hire.freelancer.title}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center text-sm text-gray-500 mr-3">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{hire.hiredOn ? formatDistanceToNow(new Date(hire.hiredOn), { addSuffix: true }) : "Unknown"}</span>
            </div>

            <button
              onClick={() => onRemove(hire.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
              title="Remove freelancer"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {/* Bid Amount */}
        <div className="flex items-center mb-4">
          <CurrencyDollarIcon className="h-5 w-5 text-green-600 mr-2" />
          <span className="font-bold text-lg text-gray-900">{formattedBidAmount}</span>
          <span className="text-sm text-gray-500 ml-2">bid amount</span>
        </div>

        {/* Cover Letter */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <DocumentTextIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h4 className="font-medium text-gray-700">Cover Letter</h4>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3 pl-7">{hire.coverLetter}</p>
        </div>

        {/* Rating if available */}
        {hire.freelancer.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(hire.freelancer.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">{hire.freelancer.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
        <button
          onClick={() => onViewDetails(hire.id)}
          className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          View Details
        </button>

        <button
          onClick={() => onReview(hire.id)}
          className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
        >
          <StarIcon className="h-4 w-4 mr-1.5" />
          Review
        </button>

        <button
          onClick={() => onMessage(hire.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
        >
          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1.5" />
          Message
        </button>
      </div>
    </div>
  )
}
