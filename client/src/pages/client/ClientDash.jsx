

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
// import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react"


import { PostJobModal } from "../../components/modals/job/PostJobModal"
import { UpdateJobModal } from "../../components/modals/job/UpdateJobModal"
import { DeleteModal } from "../../components/modals/DeleteModal"
import { PlusIcon  } from "@heroicons/react/24/outline"
import { JobCard } from "../../components/cards/JobCard"

export const ClientDash = () => {
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobData, setJobData] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // const handleNavigate = () => {
  //   navigate("/client/job-details")
  // }

  const handleNavigate = (job) => {
    navigate(`/client/job-details/${job._id}`, { state: { job } })
  }

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/job/displayJobsClient")
      setJobData(response.data)
      setLoading(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching jobs")
      console.error("Failed to fetch jobs:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, []) //Fixed useEffect dependency

  const handleUpdateBtn = (job) => {
    setSelectedJob(job)
    setShowUpdateModal(true)
  }

  const handleDeleteModal = (job) => {
    setSelectedJob(job)
    setShowDeleteModal(true)
  }

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/job/deleteJob/${id}`)
      toast.success(response.data.message)
      setShowDeleteModal(false)
      fetchJobs()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting job. Please try again.")
      console.error("Failed to delete job:", error)
    }
  }

  return (
    <div className="max-w-7xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome, Clientname</h1>
              <p className="text-gray-500">Manage your job postings and applications</p>
            </div>
            {jobData.length > 0 && <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              Post Job
            </button>}
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Your Job Postings</h2>
            </div>
            <div className=" space-y-4">
              {loading ? (
                // <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-md border border-slate-200">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#00539c] animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-[#eea47f] animate-spin animation-delay-150"></div>
                  </div>
                  <p className="text-lg font-medium text-slate-700 mt-4">Loading Jobs...</p>
                </div>
              // </div>
              ) : jobData.length > 0 ? (
                // Job listings
                jobData.map((job, index) => (
                  <JobCard
                    key={job._id || index}
                    job={job}
                    onView={() => handleNavigate(job)}
                    onUpdate={() => handleUpdateBtn(job)}
                    onDelete={() => handleDeleteModal(job)}
                  />
                ))
              ) : (
                // Empty state
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-4">
                    <PlusIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No job postings yet</h3>
                  <p className="text-gray-500 mb-4">Create your first job posting to start finding talent</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Post a Job
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DashboardStat title="Active Jobs" value={jobData.length || 0} />
                <DashboardStat title="Total Proposals" value="12" />
                <DashboardStat title="Messages" value="24" />
                <DashboardStat title="Hired" value="3" />
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="space-y-2">
                <h3 className="font-medium">Recent Activity</h3>
                <p className="text-sm text-gray-500">No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showModal && <PostJobModal fetchJobs={fetchJobs} onClose={() => setShowModal(false)} />}
      {showUpdateModal && (
        <UpdateJobModal jobData={selectedJob} fetchJobs={fetchJobs} onClose={() => setShowUpdateModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedJob._id)} />
      )}
    </div>
  )
}

// Dashboard Stat Component
const DashboardStat = ({ title, value }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}

