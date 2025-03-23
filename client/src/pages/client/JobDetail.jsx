import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { formatNaira } from "../../components/Data";
import { ViewProposal } from "../../components/modals/job/ViewProposal";

export const JobDetail = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isFreelancer, setFreelancer] = useState({});
  const { id } = useParams(); // Extract user ID from the URL
  // const navigate = useNavigate();

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/job/displayJobById/${id}`);
      setJobs(response?.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error fetching job details"
      );
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchFreelancer = async()=>{
    try {
      const response = await axios.get("/api/user/displayUser") //fetch from profile controller instead of user
      if (!jobs.skills) return; // Ensure `jobs.skills` is available

      const filteredFreelancers = response.data.filter(f => 
        Array.isArray(f.skills) 
          ? f.skills.includes(jobs.skills) 
          : f.skills === jobs.skills
      );
      setFreelancer(filteredFreelancers);
    } catch (error) {
      toast.error(error.response?.data?.message || "error")
    }
  }
  // console.log(isFreelancer.map((f, index)=>(
  //   f.fullname
  // )))

useEffect(()=>{
  fetchFreelancer()
},[])

  const hireFreelancer = async (freelancer) => {
    try {
      const response = await axios.post(`/api/job/hireFreelancer/${id}`, {
        freelancer,
      });
      toast.success(response.data.message || "Freelancer hired successfully");
      fetchJobDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error hiring freelancer");
    }
  };

  const tabs = [
    {
      title: "View Job Details",
      tab: "jobs",
      icon: <BriefcaseIcon className="w-4 h-4" />,
    },
    {
      title: "Recommended Freelancers",
      tab: "recommended",
      icon: <UsersIcon className="w-4 h-4" />,
    },
    {
      title: "Proposals",
      tab: "proposal",
      icon: <DocumentTextIcon className="w-4 h-4" />,
    },
    {
      title: "Hired",
      tab: "hire",
      icon: <DocumentTextIcon className="w-4 h-4" />,
    },
    {
      title: "Payment",
      tab: "payment",
      icon: <DocumentTextIcon className="w-4 h-4" />,
    },
  ];

  const handleViewModal = (proposal) => {
    setSelectedJob(proposal);
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{jobs?.title}</h1>
        <p className="text-gray-500 mt-1">
          Posted{" "}
          {jobs?.createdAt
            ? formatDistanceToNow(new Date(jobs.createdAt), { addSuffix: true })
            : "Unknown"}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar with tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
            {tabs.map(({ title, tab, icon }, index) => (
              <button
                key={index}
                className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="mr-3">{icon}</span>
                <span>{title}</span>
                {activeTab === tab && (
                  <ChevronRightIcon className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-6 border-b border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="text-sm font-medium text-gray-500">
                      Budget
                    </span>
                  </div>
                  <p className="text-lg font-semibold">
                    {formatNaira(jobs?.budget)}
                  </p>
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
                    <p className="text-lg font-semibold">
                      {jobs?.experienceLevel}
                    </p>
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

                {/* <div className="mb-6 flex items-center gap-3">
                  <h3 className="text-lg font-medium">Experience Level: </h3>
                  <div className="text-gray-700">{jobData.experienceLevel}</div>
                </div> */}

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

                {/* <h3 className="text-lg font-medium mb-3">Note Below</h3>
                <div className="flex flex-col">
                  <p className="font-medium">
                    Hires: <span className="font-normal text-gray-700">{jobData.hires}</span>
                  </p>
                  <p className="font-medium">
                    Proposals to Review: <span className="font-normal text-gray-700">{jobData.proposalsToReview}</span>
                  </p>
                </div> */}
              </div>
            </div>
          )}

          {activeTab === "recommended" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Recommended Freelancers
              </h2>

              <div className="space-y-4">
                {/* {isFreelancer.map((freelancer) => (
                  <div
                    key={freelancer.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {freelancer.fullname}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1">{freelancer.rating}</span>
                          </span>
                          <span className="mx-2">•</span>
                          <span>{freelancer.jobs} jobs completed</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">
                        {freelancer.rate}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {freelancer.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Profile
                      </button>
                      <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                        Invite to Job
                      </button>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          )}

          {activeTab === "proposal" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Proposals ({jobs?.proposals.length})
              </h2>

              <div className="space-y-4">
                {jobs?.proposals.length === 0
                  ? "No Proposal Submitted Yet!"
                  : jobs?.proposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">
                        {proposal.freelancer}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {proposal.submittedOn
                          ? formatDistanceToNow(
                              new Date(proposal.submittedOn),
                              { addSuffix: true }
                            )
                          : "Unknown"}
                      </span>
                    </div>

                    <div className="mt-2">
                      <span className="font-bold text-gray-900">
                        {formatNaira(proposal.bidAmount)}
                      </span>
                    </div>

                    <div className="mt-3">
                      <p className="text-gray-700 line-clamp-3">
                        {proposal.coverLetter}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleViewModal(proposal)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        View Details
                      </button>

                      <button
                      disabled={jobs?.hired?.some(hiredF=> hiredF.freelancer === proposal?.freelancer)}
                        onClick={() => hireFreelancer(proposal?.freelancer)}
                        className=" bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        {jobs?.hired?.some(
                          (hiredF) => hiredF.freelancer === proposal?.freelancer
                        )
                          ? "Hired"
                          : "Hire"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {showModal && (
                <ViewProposal
                  proposalData={selectedJob}
                  onClose={() => setShowModal(false)}
                />
              )}
            </div>
          )}

          {activeTab === "hire" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">
                Hired ({jobs?.hired.length})
              </h2>

              <div className="space-y-4">
                {jobs?.hired.length === 0
                  ? "No Freelancer Hired Yet!"
                  : jobs?.hired.map((hire) => (
                      <div
                        key={hire.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-lg">
                            {hire.freelancer}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {/* {(hire.hiredOn)} */}
                            {hire.hiredOn
                          ? formatDistanceToNow(
                              new Date(hire.hiredOn),
                              { addSuffix: true }
                            )
                          : "Unknown"}
                          </span>
                          button remove hired frelancer
                        </div>

                        <div className="mt-2">
                          <span className="font-bold text-gray-900">
                            {hire.bidAmount}
                          </span>
                        </div>

                        <div className="mt-3">
                          <p className="text-gray-700 line-clamp-3">
                            {hire.coverLetter}
                          </p>
                        </div>

                        <div className="mt-4 flex justify-end space-x-4">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            View Details
                          </button>
                          {/* <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Review</button> */}
                          <button className=" border border-blue-600 hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm transition-colors">
                            Review
                          </button>
                          <button className=" bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                            Message
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
