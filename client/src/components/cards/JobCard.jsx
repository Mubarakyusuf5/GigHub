import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
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
      <div className="bg-white rounded-lg  border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">{jobTitle}</h3>
            <div className="flex space-x-2">
              <button
                onClick={onDelete}
                className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
              <button
                onClick={onUpdate}
                className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
              <div className="flex items-center">
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
            <div className="flex space-x-4 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-medium">{proposals.length}</span>
                <span className="text-gray-500">Proposals</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{messages.length}</span>
                <span className="text-gray-500">Messages</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{hired.length}</span>
                <span className="text-gray-500">Hired</span>
              </div>
            </div>
          </div>
          <button
            onClick={onView}
            className="w-full mt-3 text-gray-700 hover:bg-gray-50 py-2 rounded-md border border-gray-200 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    )
  }