"use client"

import {
  BriefcaseIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import toast from "react-hot-toast"
import { JobCardFrlncr } from "../../components/cards/JobCardFrlncr"
import { useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"

export const FindJobs = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [formData, setFormData] = useState({
    searchTerm: "",
    experienceLevel: "",
    category: "",
  })
  const [categories, setCategories] = useState([])
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage] = useState(5)

  const filterRef = useRef(null)
  const navigate = useNavigate()

  // Calculate pagination values
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage)
  const offset = currentPage * itemsPerPage
  const currentPageItems = filteredJobs.slice(offset, offset + itemsPerPage)

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
    // Scroll to top of job listings
    document.getElementById("job-listings")?.scrollIntoView({ behavior: "smooth" })
  }

  // Count active filters
  useEffect(() => {
    let count = 0
    if (formData.searchTerm) count++
    if (formData.experienceLevel) count++
    if (formData.category) count++
    setActiveFiltersCount(count)
  }, [formData])

  // Close filter panel when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 1024 &&
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !event.target.closest("[data-filter-toggle]")
      ) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      setCurrentPage(0) // Reset to first page when filters change
    }
  }

  const clearFilters = () => {
    setFormData({
      searchTerm: "",
      experienceLevel: "",
      category: "",
    })
    setCurrentPage(0) // Reset to first page when clearing filters
  }

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/job/displayJobs")
        setJobs(response.data)
      } catch (error) {
        toast.error(error.response?.data?.message || "Error displaying jobs!")
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("/api/cat/displayCategory")
        setCategories(response.data)
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch categories.")
      }
    }
    fetchCategory()
  }, [])

  // filter functionality
  useEffect(() => {
    const results = jobs.filter((job) => {
      const matchesExperienceLevel = formData.experienceLevel
        ? formData.experienceLevel === "All" ||
          job?.experienceLevel?.toLowerCase().includes(formData.experienceLevel.toLowerCase())
        : true

      const matchesCategory = formData.category
        ? job?.category?.toLowerCase().includes(formData.category.toLowerCase())
        : true

      const matchesSearchTerm = formData.searchTerm
        ? job?.title?.toLowerCase().includes(formData.searchTerm.toLowerCase()) ||
          job?.skills?.some((skill) => skill.toLowerCase().includes(formData.searchTerm.toLowerCase())) ||
          job?.clientName?.toLowerCase().includes(formData.searchTerm.toLowerCase())
        : true

      return matchesExperienceLevel && matchesCategory && matchesSearchTerm
    })

    setFilteredJobs(results)
    setCurrentPage(0) // Reset to first page when results change
  }, [formData.experienceLevel, formData.category, formData.searchTerm, jobs])

  const handleNavigate = (job) => {
    navigate(`/job-detail/${job._id}`, { state: { job } })
  }

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="min-h-screen ">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Find Jobs</h1>
          <p className="mt-1 text-gray-600">Discover opportunities that match your skills and experience</p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            data-filter-toggle
            onClick={toggleFilters}
            className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FunnelIcon className="h-5 w-5 text-gray-700 mr-2" />
            <span className="font-medium text-gray-900">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            {isFilterOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500 ml-auto" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500 ml-auto" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter sidebar */}
          <div
            ref={filterRef}
            className={`${
              isFilterOpen ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0 overflow-hidden"
            } lg:max-h-none lg:opacity-100 lg:overflow-visible w-full lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center">
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Filters
                  </h2>
                  {(formData.searchTerm || formData.experienceLevel || formData.category) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4">
                {/* Search input */}
                <div className="mb-5">
                  <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="searchTerm"
                      name="searchTerm"
                      value={formData.searchTerm}
                      onChange={handleChange}
                      className="pl-10 py-2.5 pr-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Skills, title, or client"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="mb-5">
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    id="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="All">All Experience Levels</option>
                    <option value="Entry">Entry Level (0-2 years)</option>
                    <option value="Intermediate">Intermediate (2-5 years)</option>
                    <option value="Expert">Expert (5+ years)</option>
                  </select>
                </div>

                {/* Job Category */}
                <div className="mb-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="">All Categories</option>
                    {categories?.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat._id} value={cat.category}>
                          {cat.category}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading categories...</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-3">Quick Filters</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Posted today
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Remote only
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    High paying
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job listings */}
          <div id="job-listings" className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                  </h2>
                  {(formData.searchTerm || formData.experienceLevel || formData.category) && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      Filtered by: {formData.searchTerm && `"${formData.searchTerm}"`}{" "}
                      {formData.experienceLevel && `• ${formData.experienceLevel}`}{" "}
                      {formData.category && `• ${formData.category}`}
                    </p>
                  )}
                </div>
                <div className="hidden sm:block">
                  <select
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="newest"
                  >
                    <option value="newest">Newest first</option>
                    <option value="relevant">Most relevant</option>
                    <option value="budget-high">Budget: High to low</option>
                    <option value="budget-low">Budget: Low to high</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2 text-gray-600">Loading jobs...</p>
                  </div>
                ) : filteredJobs.length > 0 ? (
                  <>
                    {/* Display only current page items */}
                    {currentPageItems.map((job) => (
                      <JobCardFrlncr key={job._id} job={job} onView={() => handleNavigate(job)} />
                    ))}

                    {/* Pagination */}
                    {pageCount > 1 && (
                      <div className="py-4 px-6 flex justify-center">
                        <ReactPaginate
                          previousLabel={
                            <span className="flex items-center">
                              <ChevronLeftIcon className="h-4 w-4 mr-1" />
                              Previous
                            </span>
                          }
                          nextLabel={
                            <span className="flex items-center">
                              Next
                              <ChevronRightIcon className="h-4 w-4 ml-1" />
                            </span>
                          }
                          breakLabel="..."
                          pageCount={pageCount}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={3}
                          onPageChange={handlePageChange}
                          containerClassName="flex items-center space-x-1"
                          pageClassName="px-3 py-1.5 block rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                          pageLinkClassName="text-gray-700 block hover:text-blue-600"
                          previousClassName="px-3 py-1.5 rounded-md block text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                          nextClassName="px-3 py-1.5 rounded-md block text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                          breakClassName="px-3 py-1.5 text-gray-500"
                          activeClassName="bg-blue-100 block text-blue-700 hover:bg-blue-100"
                          activeLinkClassName="text-blue-700"
                          disabledClassName="text-gray-300 cursor-not-allowed hover:bg-transparent hover:text-gray-300"
                          renderOnZeroPageCount={null}
                          forcePage={currentPage}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <div className="bg-gray-50 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <BriefcaseIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      We couldn't find any jobs matching your criteria. Try adjusting your search filters or check back
                      later for new opportunities.
                    </p>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors inline-flex items-center"
                      >
                        <XMarkIcon className="h-4 w-4 mr-1.5" />
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

