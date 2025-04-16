import {
  ArrowLongLeftIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { formatNaira } from "../../components/Data";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../Context/AuthContext";
import { JobCardFrlncr } from "../../components/cards/JobCardFrlncr";

export const FreeDash = () => {
  // Sample job data - would come from API in real implementation
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeFilter, setActiveFilter] = useState("recent");
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log(user)

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/job/displayJobs");
      setJobs(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error displaying jobs!");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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
        job?.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredJobs(results);
  }, [searchTerm, jobs]);

  // Toggle save job
  const toggleSaveJob = (id) => {
    setJobs(
      jobs.map((job) => (job?._id === id ? { ...job, saved: !job.saved } : job))
    );
  };

  // function to fetch profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profile/displayFrlncrProfile`);
      // console.log(response.data.freelancer[0])
      setProfile(response.data.freelancer[0]);
    } catch (error) {
      console.log("freeDash", error);
      toast.error(error.response?.data?.message || "Error displaying profile!");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleNavigate = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } });
  };

  // Stats for the sidebar
  const stats = {
    profileCompletion: 85,
    jobsApplied: 24,
    interviews: 8,
    successRate: 75,
  };

  const filterTab = [
    { title: "All jobs", filter: "recent" },
    // { title: "All jobs", filter: "all" }, //no need always show latest jobs
    { title: "Saved Jobs", filter: "saved" },
    { title: "Completed jobs", filter: "completed" },
  ];

  return (
    <div className=" min-h-screen">
      <div className=" px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area - full width on mobile, flex-1 on desktop */}
          <div className="w-full lg:flex-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Search and filters header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  Find Work
                </h1>
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
                  {/* convert to usestate map as one */}
                  {filterTab.map(({ title, filter }) => (
                    <button
                    key={filter}
                      onClick={() => filterJobs(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        activeFilter === filter
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {title}
                    </button>
                  ))}
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
                    <JobCardFrlncr
                      key={job._id}
                      job={job}
                      onSave={() => toggleSaveJob(job._id)}
                      onView={() => handleNavigate(job)}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <BriefcaseIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No jobs found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filters to find what you're
                      looking for.
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
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg sm:text-xl overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${
                        profile?.profilePicture
                      }`}
                      loading="lazy"
                      alt={profile?.profilePicture}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      {profile?.user?.fullname}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                      {profile?.title}{" "}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      Profile Completion
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                      {stats.profileCompletion}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${stats.profileCompletion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Complete your profile to increase your chances of getting
                    hired.
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
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stats.jobsApplied}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-1">
                      <CheckCircleIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Interviews</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stats.interviews}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 col-span-2">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-1">
                      <StarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Success Rate</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {stats.successRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="font-medium text-gray-900">
                  Top Skills in Demand
                </h3>
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
  );
};

// Skill Demand Component
const SkillDemand = ({ skill, percentage }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{skill}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Add this CSS helper for horizontal scrolling
// Add to the head of your document or in a global CSS file
const style = document.createElement("style");
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);
