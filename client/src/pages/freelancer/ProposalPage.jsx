"use client";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { formatNaira } from "../../components/Data";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../Context/AuthContext";

export const ProposalPage = () => {
  const {user} = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposal, setProposal] = useState({
    // freelancer: user?.id,
    coverLetter: "",
    bidAmount: "",
    duration: "",
    payment: "",
    // attachments: [],
  });
    // Default 5% fee
    const [feePercentage, setFeePercentage] = useState(5)
    const [platformFee, setPlatformFee] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams();

  // This would be replaced with your actual data fetching logic
  const [job, setJob] = useState({});

  // In a real implementation, you would fetch job details from your API
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/job/displayJobById/${id}`);
      setJob(response?.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching job detail");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProposal((prev) => ({
      ...prev,
      [name]: value,
    }));

        // Calculate fee when bid amount changes
        if (name === "bidAmount" && value) {
          const calculatedFee = (Number.parseFloat(value) * feePercentage) / 100
          setPlatformFee(calculatedFee)
        }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { duration, payment, bidAmount, coverLetter} = proposal

      if(!duration || !payment || !bidAmount || !coverLetter){
        return toast.error("All field must be filled")
      }
      console.log(proposal)
      const response = await axios.post(`/api/job/submitProposal/${id}`, {...proposal, freelancer: user?.id, platformFee});
      console.log(response)
      toast.success( response.data.message || "Proposal submitted successfully");
      navigate(-1)
      // Reset form
      setProposal({
        coverLetter: "",
        bidAmount: "",
        duration: "",
        payment: "",
        // attachments: [],
      });
    } catch (error) {
      toast.error( error.response?.data?.message || "Failed to submit your proposal. Please try again.");
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Submit a Proposal
          </h1>
          <p className="mt-2 text-gray-600">
            Craft a compelling proposal to showcase your expertise and win this
            project
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Job Details Card */}
          <div className="w-full lg:w-1/3 lg:sticky top-20 self-start">
            <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
              <div className="px-6 pt-6 pb-3 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Job Details
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Review the requirements carefully
                </p>
              </div>
              <div className="px-6 py-6 space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 hover:text-blue-800 transition duration-300">
                    {job?.title || "Loading job details..."}
                  </h3>
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-start">
                    {/* <div className="bg-blue-100 p-2 rounded-full"> */}
                    <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
                    {/* </div> */}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-700">
                        Budget
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        {job?.budget ? formatNaira(job.budget) : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    {/* <div className="bg-blue-100 p-2 rounded-full"> */}
                    <CalendarIcon className="h-5 w-5 text-blue-600" />
                    {/* </div> */}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-700">
                        Duration
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        {job?.duration || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-blue-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">
                      Tips for winning proposals:
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Address the client's specific needs
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Highlight relevant experience
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Be clear about deliverables and timeline
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Proposal Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Proposal
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Make a compelling offer to win this project
                </p>
              </div>
              <div className="px-6 py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="bidAmount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Bid
                    </label>
                    <div className="relative">
                      {/* <CurrencyDollarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" /> */}
                      <input
                        id="bidAmount"
                        name="bidAmount"
                        type="number"
                        min={1}
                        placeholder="Enter your bid amount"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        value={proposal.bidAmount}
                        onChange={handleInputChange}

                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      The client's budget is{" "}
                      {job?.budget ? formatNaira(job.budget) : "not specified"}
                    </p>
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Platform fee ({feePercentage}%):</span>{" "}
                        {proposal.bidAmount ? formatNaira(platformFee) : "₦0.00"}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-medium">You'll receive:</span>{" "}
                        {proposal.bidAmount ? formatNaira(Number.parseFloat(proposal.bidAmount) - platformFee) : "₦0.00"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Estimated Duration
                    </label>
                    <div className="relative">
                      <select
                        id="duration"
                        name="duration"
                        value={proposal.duration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Duration
                        </option>
                        <option value="less than 1 month">
                          less than 1 month
                        </option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                      </select>
                    </div>
                  </div>
                 
                  <div className="space-y-2">
                    <label
                      htmlFor="payment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Type
                    </label>
                    <div className="relative">
                      <select
                        id="payment"
                        name="payment"
                        value={proposal.payment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select Payment Type
                        </option>
                        <option value="On Completion">On Completion</option>
                        <option value="Milestone">Milestone</option>
                      </select>
                    </div>
                  </div>

                  {proposal.payment === "Milestone" && <div>Milestone was selected</div>}

                  <div className="space-y-2">
                    <label
                      htmlFor="coverLetter"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      placeholder="Introduce yourself and explain why you're the best fit for this project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[220px] resize-y"
                      value={proposal.coverLetter}
                      onChange={handleInputChange}
                    />
                    <div className="bg-blue-50 p-3 rounded-lg mt-2">
                      <h4 className="text-sm font-medium text-blue-700 mb-2">
                        Pro Tips:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Highlight your relevant experience and skills</li>
                        <li>• Explain your approach to the project</li>
                        <li>• Mention similar projects you've completed</li>
                        <li>
                          • Address any specific requirements mentioned by the
                          client
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label
                      htmlFor="attachments"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Attachments (Optional)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="attachments"
                        className="flex flex-col items-center justify-center w-full h-36 border-2 border-blue-200 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-10 h-10 mb-3 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-700">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            Portfolio, work samples, or proposal documents
                          </p>
                        </div>
                        <input
                          id="attachments"
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {proposal.attachments.length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Selected files:
                        </p>
                        <ul className="space-y-1">
                          {proposal.attachments.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <DocumentTextIcon className="h-4 w-4 text-blue-500 mr-2" />
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div> */}

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed "
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          {/* <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                          </svg> */}
                          <ClipLoader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                          Submitting Proposal...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <PaperAirplaneIcon className="mr-2 h-5 w-5" />
                          Submit Proposal
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-xs text-gray-600">
                    By submitting this proposal, you agree to the terms and
                    conditions of the platform. Your proposal will be visible to
                    the client once submitted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
