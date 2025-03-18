import { ArrowLongLeftIcon, BookmarkIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, FunnelIcon, MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { formatNaira } from "../../components/Data"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"


export const FreeDash = () => {
  // Sample job data - would come from API in real implementation
  const [jobs, setJobs] = useState([
    // {
    //   id: 1,
    //   title: "Senior React Developer for E-commerce Platform",
    //   client: "TechSolutions Inc.",
    //   clientRating: 4.8,
    //   budget: "$30-50/hr",
    //   description:
    //     "We are looking for an experienced React developer to help build our e-commerce platform. The ideal candidate should have experience with React, Redux, and modern JavaScript practices.",
    //   skills: ["React", "Redux", "JavaScript", "TypeScript", "CSS"],
    //   postedDate: "2 days ago",
    //   proposals: 12,
    //   saved: false,
    // },
    // {
    //   id: 2,
    //   title: "Full Stack Developer for SaaS Application",
    //   client: "InnovateX",
    //   clientRating: 4.9,
    //   budget: "$40-60/hr",
    //   description:
    //     "Looking for a talented full-stack developer to join our team and help build a new SaaS application. You'll be working with Node.js, React, and MongoDB.",
    //   skills: ["Node.js", "React", "MongoDB", "Express", "AWS"],
    //   postedDate: "5 hours ago",
    //   proposals: 5,
    //   saved: true,
    // },
    // {
    //   id: 3,
    //   title: "UI/UX Designer for Mobile App",
    //   client: "AppWorks Studio",
    //   clientRating: 4.7,
    //   budget: "$35-45/hr",
    //   description:
    //     "We need a creative UI/UX designer to help design our new mobile application. Experience with Figma and mobile design patterns is required.",
    //   skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
    //   postedDate: "1 day ago",
    //   proposals: 8,
    //   saved: false,
    // },
    // {
    //   id: 4,
    //   title: "WordPress Developer for Corporate Website",
    //   client: "Global Enterprises",
    //   clientRating: 4.5,
    //   budget: "$25-35/hr",
    //   description:
    //     "Seeking a WordPress developer to redesign our corporate website. Experience with custom themes and plugins is necessary.",
    //   skills: ["WordPress", "PHP", "JavaScript", "HTML", "CSS"],
    //   postedDate: "3 days ago",
    //   proposals: 15,
    //   saved: false,
    // },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigate = useNavigate();

  const fetchJobs = async ()=>{
    try {
      const response = await axios.get("/api/job/displayJobs")
      setJobs(response.data)
    } catch (error) {
      toast.error(error.response?.data?.message || "Error displaying jobs!")
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])
  
  // Filter jobs based on category
  const filterJobs = (filter) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredJobs(jobs);
    } else if (filter === "saved") {
      setFilteredJobs(jobs.filter((job) => job?.saved));
    } else if (filter === "recent") {
      setFilteredJobs(
        [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  };

  // Filter jobs based on search term
  useEffect(() => {
    const results = jobs.filter(
      (job) =>
        job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job?.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredJobs(results)
  }, [searchTerm, jobs])



  // Toggle save job
  const toggleSaveJob = (id) => {
    setJobs(jobs.map((job) => (job?._id === id ? { ...job, saved: !job.saved } : job)))
  }

  const handleNavigate = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } })
  }

  // Stats for the sidebar
  const stats = {
    profileCompletion: 85,
    jobsApplied: 24,
    interviews: 8,
    successRate: 75,
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area - full width on mobile, flex-1 on desktop */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Search and filters header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Find Work</h1>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search for jobs by title, skill, or keyword..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter tabs - scrollable on mobile */}
                <div className="flex flex-nowrap overflow-x-auto pb-2 mt-4 gap-2 -mx-1 px-1 scrollbar-hide">
                  <button
                    onClick={() => filterJobs("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === "all"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Jobs
                  </button>
                  <button
                    onClick={() => filterJobs("recent")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === "recent"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Most Recent
                  </button>
                  <button
                    onClick={() => filterJobs("saved")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeFilter === "saved"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Saved Jobs
                  </button>
                  <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap">
                    <FunnelIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Advanced Filters</span>
                    <ArrowLongLeftIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Job listings */}
              <div className="divide-y divide-gray-100">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} onSave={() => toggleSaveJob(job._id)} onView={()=> handleNavigate(job)} />
                ))
                ) : (
                  <div className="p-8 text-center">
                    <BriefcaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - full width on mobile, fixed width on desktop */}
          <div className="w-full lg:w-[350px] xl:w-[450px] shrink-0 order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg sm:text-xl">
                    JD
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Freelancer name</h2>
                    <p className="text-sm sm:text-base text-gray-500">Senior Full Stack Developer</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">Profile Completion</span>
                    <span className="text-xs sm:text-sm font-medium text-blue-700">{stats.profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${stats.profileCompletion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Complete your profile to increase your chances of getting hired.
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-medium text-gray-900 mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-1">
                      <BriefcaseIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Jobs Applied</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.jobsApplied}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-1">
                      <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Interviews</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.interviews}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 col-span-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-1">
                      <StarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Success Rate</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">Top Skills in Demand</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <SkillDemand skill="React" percentage={85} />
                  <SkillDemand skill="Node.js" percentage={72} />
                  <SkillDemand skill="TypeScript" percentage={68} />
                  <SkillDemand skill="UI/UX Design" percentage={64} />
                  <SkillDemand skill="AWS" percentage={58} />
                </div>
                <button className="w-full mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Job Card Component
const JobCard = ({ job, onSave, onView }) => {
  return (
    <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer"  >
      <div className="flex justify-between">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
          {job.title}
        </h2>
        <button
          onClick={onSave}
          className="text-gray-400 hover:text-blue-600 transition-colors ml-2 flex-shrink-0"
          aria-label={job.saved ? "Unsave job" : "Save job"}
        >
          <BookmarkIcon className={`h-5 w-5 ${job.saved ? "fill-blue-600 text-blue-600" : ""}`} />
        </button>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm sm:text-base text-gray-700">{job.client  || "default"}</span>
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
          <span key={skill} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
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

// Skill Demand Component
const SkillDemand = ({ skill, percentage }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

// Add this CSS helper for horizontal scrolling
// Add to the head of your document or in a global CSS file
const style = document.createElement("style")
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`
document.head.appendChild(style)

