"use client";

import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { States } from "../../components/Data";

export const FindFreelancer = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filterRef = useRef(null);
  const [filters, setFilters] = useState({
    experienceLevel: "",
    skills: [],
    rating: "",
    location: "",
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(3);

  // Track active filters count
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Sample freelancer data for demonstration
  const freelancers = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Senior Full Stack Developer",
      rating: 3.5,
      reviews: 47,
      hourlyRate: "$45",
      location: "New York, USA",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      experience: "Expert",
      completedProjects: 78,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Sarah Williams",
      title: "UI/UX Designer",
      rating: 4.8,
      reviews: 32,
      hourlyRate: "$40",
      location: "London, UK",
      skills: ["Figma", "Adobe XD", "UI Design", "Wireframing"],
      experience: "Intermediate",
      completedProjects: 54,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Mobile App Developer",
      rating: 5.0,
      reviews: 29,
      hourlyRate: "$50",
      location: "San Francisco, USA",
      skills: ["React Native", "Swift", "Kotlin", "Firebase"],
      experience: "Expert",
      completedProjects: 63,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      title: "Digital Marketing Specialist",
      rating: 4.7,
      reviews: 18,
      hourlyRate: "$35",
      location: "Barcelona, Spain",
      skills: ["SEO", "Content Marketing", "Social Media", "Google Ads"],
      experience: "Intermediate",
      completedProjects: 41,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 5,
      name: "David Kim",
      title: "DevOps Engineer",
      rating: 4.9,
      reviews: 23,
      hourlyRate: "$55",
      location: "Seoul, South Korea",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      experience: "Expert",
      completedProjects: 37,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 6,
      name: "Olivia Martinez",
      title: "Content Writer & SEO Specialist",
      rating: 4.6,
      reviews: 15,
      hourlyRate: "$30",
      location: "Toronto, Canada",
      skills: ["Content Writing", "SEO", "Copywriting", "Blog Management"],
      experience: "Intermediate",
      completedProjects: 48,
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 7,
      name: "James Wilson",
      title: "Blockchain Developer",
      rating: 4.8,
      reviews: 12,
      hourlyRate: "$60",
      location: "Berlin, Germany",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
      experience: "Expert",
      completedProjects: 22,
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ];

  // Filter freelancers based on search and filters
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.experienceLevel) count++;
    if (filters.rating) count++;
    if (filters.location) count++;
    if (filters.skills.length > 0) count += filters.skills.length;
    setActiveFiltersCount(count);
  }, [searchTerm, filters]);

  // Apply filters when search term or filters change
  useEffect(() => {
    const results = freelancers.filter((freelancer) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        freelancer.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Experience level filter
      const matchesExperience =
        filters.experienceLevel === "" ||
        freelancer.experience === filters.experienceLevel;

      // Rating filter
      const matchesRating =
        filters.rating === "" ||
        freelancer.rating >= Number.parseFloat(filters.rating);

      // Location filter
      const matchesLocation =
        filters.location === "" ||
        freelancer.location.includes(filters.location);

      return (
        matchesSearch && matchesExperience && matchesRating && matchesLocation
      );
    });

    setFilteredFreelancers(results);
    setCurrentPage(0); // Reset to first page when filters change
  }, [searchTerm, filters]);

  // Calculate pagination values
  const pageCount = Math.ceil(filteredFreelancers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredFreelancers.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    // Scroll to top of freelancer listings
    document
      .getElementById("freelancer-listings")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      experienceLevel: "",
      skills: [],
      rating: "",
      location: "",
    });
    setCurrentPage(0); // Reset to first page when clearing filters
  };

  // Close filter panel when clicking outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 1024 &&
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !event.target.closest("[data-filter-toggle]")
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return stars;
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
    // console.log(isFilterOpen)
  };

  return (
    <div className="min-h-screen ">
      <div className=" px-4 sm:px-6 lg:px-8 py-8"> {/*max-w-7xl mx-auto*/}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Find Freelancers</h1>
          <p className="mt-1 text-gray-600">
            Discover talented professionals for your projects
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            data-filter-toggle
            onClick={toggleFilters}
            className="w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-700 mr-2" />
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
              isFilterOpen
                ? "max-h-[1000px] opacity-100 mb-4"
                : "max-h-0 opacity-0 overflow-hidden"
            } lg:max-h-none lg:opacity-100 lg:overflow-visible w-full lg:w-72 flex-shrink-0 transition-all duration-300 ease-in-out`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900 flex items-center">
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                  </h2>
                  {activeFiltersCount > 0 && (
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
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 py-2.5 pr-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Name, skills, or location"
                    />
                  </div>
                </div>

                {/* Experience Level */}
                <div className="mb-5">
                  <label
                    htmlFor="experienceLevel"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    value={filters.experienceLevel}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        experienceLevel: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="">All Experience Levels</option>
                    <option value="Entry">Entry Level</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-5">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Rating
                  </label>
                  <select
                    id="rating"
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({ ...filters, rating: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5 & Up</option>
                    <option value="4.0">4.0 & Up</option>
                    <option value="3.5">3.5 & Up</option>
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-5">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=UTF-8,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"%3e%3cpolyline points="6 9 12 15 18 9"%3e%3c/polyline%3e%3c/svg%3e\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="">All Locations</option>
                    {
                      States.map(({state}, index)=>(
                        <option key={index} value={state}>{state}</option>
                      ))
                    }
                  </select>
                </div>

                {/* Skills Section */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Popular Skills
                  </label>
                  <div className="space-y-2">
                    {[
                      "React",
                      "JavaScript",
                      "UI/UX Design",
                      "Node.js",
                      "Python",
                    ].map((skill) => (
                      <div key={skill} className="flex items-center">
                        <input
                          id={`skill-${skill}`}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Show more skills
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Freelancer listings */}
          <div id="freelancer-listings" className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {filteredFreelancers.length} Freelancers Available
                  </h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      Filtered by:
                      {searchTerm && ` "${searchTerm}"`}
                      {filters.experienceLevel &&
                        ` • ${filters.experienceLevel}`}
                      {filters.rating && ` • ${filters.rating}+ Rating`}
                      {filters.location && ` • ${filters.location}`}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-0.5">
                    Showing {filteredFreelancers.length > 0 ? offset + 1 : 0} to{" "}
                    {Math.min(
                      offset + itemsPerPage,
                      filteredFreelancers.length
                    )}{" "}
                    of {filteredFreelancers.length}
                  </p>
                </div>
                <div>
                  <select
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="rating"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="rate-low">Rate: Low to High</option>
                    <option value="rate-high">Rate: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Freelancer Cards */}
              <div className="divide-y divide-gray-100">
                {currentItems.length > 0 ? (
                  currentItems.map((freelancer) => (
                    <div
                      key={freelancer.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Avatar and basic info */}
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={freelancer.avatar || "/placeholder.svg"}
                              alt={freelancer.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                {freelancer.name}
                              </h3>
                              <p className="text-gray-600">
                                {freelancer.title}
                              </p>

                              <div className="flex items-center mt-1">
                                <div className="flex items-center">
                                  {renderStars(freelancer.rating)}
                                  <span className="ml-1 text-sm text-gray-600">
                                    {freelancer.rating}
                                  </span>
                                </div>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-600">
                                  {freelancer.reviews} reviews
                                </span>
                              </div>
                            </div>

                            <div className="mt-2 sm:mt-0 text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {freelancer.hourlyRate}/hr
                              </div>
                              <div className="text-sm text-gray-500">
                                {freelancer.completedProjects} projects
                                completed
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0 sm:mr-4">
                              <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
                              {freelancer.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0 sm:mr-4">
                              <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-1" />
                              {freelancer.experience} Level
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {freelancer.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                              Contact
                            </button>
                            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="bg-gray-50 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <UserGroupIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No freelancers found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      We couldn't find any freelancers matching your criteria.
                      Try adjusting your search filters or check back later.
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

              {/* Pagination */}
              {pageCount > 1 && (
                <div className="py-4 px-6 flex justify-center border-t border-gray-100">
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
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName="flex items-center space-x-1"
                    pageClassName="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    pageLinkClassName="text-gray-700 block hover:text-blue-600"
                    previousClassName="px-3 py-1.5 rounded-md text-sm font-medium block text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    nextClassName="px-3 py-1.5 rounded-md text-sm font-medium block text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                    breakClassName="px-3 py-1.5 text-gray-500"
                    activeClassName="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    activeLinkClassName="text-blue-700"
                    disabledClassName="text-gray-300 cursor-not-allowed hover:bg-transparent hover:text-gray-300"
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
