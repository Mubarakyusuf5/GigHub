"use client"

import { useState } from "react"
import {
  XMarkIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  UserIcon,
  FlagIcon,
} from "@heroicons/react/24/outline"

export const ViewProposal = ({ onClose, proposalData }) => {
    
// const [selectedUser, setSelectedUser] = useState(null)
  // Sample proposals data - in a real app, this would be passed as props
//   const [proposals] = useState({
//     freelancer: {
//       name: "John Doe",
//       title: "Senior Web Developer",
//       avatar: null, // Could be a URL to the avatar image
//     },
//     coverLetter:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, doloremque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quisquam.",
//     duration: "2 weeks",
//     bidAmount: 500,
//     payment: "Milestone", // Can be "On completion" or "Milestone",
//     milestone: [
//       {
//         description: "Initial wireframes and design concepts",
//         amount: 150,
//       },
//       {
//         description: "Frontend development and responsive implementation",
//         amount: 200,
//       },
//       {
//         description: "Backend integration and final delivery",
//         amount: 150,
//       },
//     ],
//   })

  // Calculate total milestone amount
//   const totalMilestoneAmount = proposals.milestone.reduce((total, m) => total + m.amount, 0)

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[100vh] flex flex-col"
        // onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-semibold text-white flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Proposals Details
          </h1>
          <button
            className="text-white hover:bg-blue-800/50 rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content - with scrolling */}
        <div className="overflow-y-auto flex-grow">
          <div className="px-6 py-5">
            {/* Freelancer Info */}
            <div className="flex items-start border-b border-gray-100 pb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <UserCircleIcon className="h-7 w-7 text-blue-600" />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900">{proposalData.freelancer}</h2>
                <p className="text-sm text-gray-500">{"freelancer.title"}</p>
                <button className="mt-1 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors">
                  <UserIcon className="h-4 w-4 mr-1" />
                  View Profile
                </button>
              </div>
            </div>

            {/* Proposals Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                {/* Cover Letter */}
                <div className="mb-4">
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center mb-1.5">
                    <DocumentTextIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                    Cover Letter
                  </h2>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700 text-sm">{proposalData?.coverLetter}</p>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center mb-1.5">
                    <ClockIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                    Duration
                  </h2>
                  <p className="text-gray-900 font-medium">{proposalData?.duration}</p>
                </div>
              </div>

              <div>
                {/* Bid Amount */}
                <div className="mb-4">
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center mb-1.5">
                    <CurrencyDollarIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                    Bid Amount
                  </h2>
                  <p className="text-gray-900 font-medium text-lg">${proposalData?.bidAmount}</p>
                </div>

                {/* Payment */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center mb-1.5">
                    <CreditCardIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                    Payment Type
                  </h2>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {proposalData?.payment}
                  </div>
                </div>
              </div>
            </div>

            {/* Milestone Section - Only show if payment type is "Milestone" */}
            {proposalData?.payment === "Milestone" && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center mb-3">
                  <FlagIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                  Milestones
                </h2>

                <div className="space-y-2">
                  {proposalData?.milestone.map((milestone, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="flex items-center justify-center w-5 h-5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium mr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-700 text-sm">{milestone.description}</p>
                      </div>
                      <span className="text-gray-900 font-medium ml-3 flex-shrink-0">${milestone.amount}</span>
                    </div>
                  ))}

                  {/* <div className="flex justify-between items-center px-3 py-2 mt-2">
                    <span className="font-medium text-gray-700">Total Amount</span>
                    <span className="font-semibold text-blue-700">${totalMilestoneAmount}</span>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3 border-t border-gray-200 flex-shrink-0">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Accept Proposals
          </button>
        </div>
      </div>
    </div>
  )
}

