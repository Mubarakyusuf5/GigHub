import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  ChevronRightIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ClockIcon,
  UserGroupIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { formatNaira } from "../../components/Data";
import { formatDistanceToNow } from "date-fns";

export const FrlncrJobDetail = () => {
  const [jobs, setJobs] = useState({});
  const { id } = useParams(); // Extract user ID from the URL
  const navigate = useNavigate();

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/job/displayJobById/${id}`);
      setJobs(response?.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching job detail"
      );
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleNavigate = (job) => {
    navigate(`/proposal/${job._id}`)
  }

  return (
    <div className="min-h-screen px-4 lg:px-10 py-7">
      <div className="mb-6 flex space-y-3 lg:justify-between items-start lg:flex-row flex-col">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{jobs?.title}</h1>
          <p className="text-gray-500 mt-1">Posted {jobs?.createdAt
    ? formatDistanceToNow(new Date(jobs.createdAt), { addSuffix: true })
    : "Unknown"}</p>
        </div>
        <button onClick={()=> handleNavigate(jobs)} className="bg-blue-700 hover:bg-blue-600 transition duration-300 w-full lg:w-[120px] font-medium py-2 rounded-md text-white">Apply Now</button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6 border-b border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-500">Budget</span>
            </div>
            <p className="text-lg font-semibold">{formatNaira(jobs?.budget)}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-500">
                Project Length
              </span>
            </div>
            <p className="text-lg font-semibold">{jobs?.duration}</p>
          </div>

          {/* <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-500">
                Posted Date
              </span>
            </div>
            <p className="text-lg font-semibold">{jobs?.createdAt}</p>
          </div> */}

          {jobs?.hires && (
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <UsersIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-500">
                  Team Size
                </span>
              </div>
              <p className="text-lg font-semibold">
                Looking to hire {jobs?.hires} freelancers
              </p>
            </div>
          )}

          {jobs?.experienceLevel && (
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-500">
                  Experience Level
                </span>
              </div>
              <p className="text-lg font-semibold">{jobs?.experienceLevel}</p>
            </div>
          )}

          {jobs?.proposalsToReview && (
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <FaceSmileIcon className="w-5 h-5 mr-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-500">
                  Applications
                </span>
              </div>
              <p className="text-lg font-semibold">
                Max {jobs?.proposalsToReview} proposals will be reviewed.
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700 mb-6">{jobs?.description}</p>

          <h3 className="text-lg font-medium mb-2">Requirements</h3>
          <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-700">
            {jobs?.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>

          <h3 className="text-lg font-medium mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {jobs?.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
