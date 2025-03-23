import { BriefcaseIcon, ChatBubbleLeftRightIcon, ClockIcon, CreditCardIcon, PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { format, formatDistanceToNow } from "date-fns";

 export const JobCard = ({ onView, onUpdate, onDelete, job }) => {
    // Using sample data since we don't know the exact structure
    const jobTitle = job?.title || "Job Title"
    const createdAt = job?.createdAt || "Created at date"
    const paymentStatus = job?.payment?.status 
    const proposals = job?.proposals || 0
    const messages = job?.messaged || 0
    const hired = job?.hired || 0
  
    return (
      <div className="bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition-colors">{jobTitle}</h3>
          <div className="flex space-x-2">
            <button
              onClick={onDelete}
              className="p-2 border border-gray-200 rounded-md hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
              aria-label="Delete job"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
            <button
              onClick={onUpdate}
              className="p-2 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-colors"
              aria-label="Edit job"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center">
              <CreditCardIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm mr-2">Payment:</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  paymentStatus === "Verified" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}
              >
                {paymentStatus}
              </span>
            </div>
          </div>

          <div className="flex space-x-6 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">{proposals.length}</span>
              <div className="flex items-center text-gray-500">
                <UserGroupIcon className="h-3 w-3 mr-1" />
                <span>Proposals</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">{messages.length}</span>
              <div className="flex items-center text-gray-500">
                <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" />
                <span>Messages</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900">{hired.length}</span>
              <div className="flex items-center text-gray-500">
                <BriefcaseIcon className="h-3 w-3 mr-1" />
                <span>Hired</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onView}
          className="w-full sm:w-auto mt-3 text-center sm:text-left text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
    )
  }