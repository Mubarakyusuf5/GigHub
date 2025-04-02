import { useState, useRef, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { CheckIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

export const PostJobModal = ({ onClose, fetchJobs }) => {
  const [formData, setFormData] = useState({
        title: "",
        budget: "",
        duration: "",
        experienceLevel: "",
        proposalsToReview: "",
        category: "",
        hires: "",
        description: "",
        requirements: [""],
        skills: [],
      });
  // State for skills input and dropdown
  const [skills, setSkills] = useState([]) //replace skill array from backend
  const [categories, setCategories] = useState([]) //replace skill array from backend
  const [skillInput, setSkillInput] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const skillsInputRef = useRef(null)
  const dropdownRef = useRef(null)
      
  // Filter skills based on input
  useEffect(() => {
    if (skillInput.trim() === "") {
      setFilteredSkills([])
      return
    }
    const filtered = skills.filter(
      (skill) => skill.toLowerCase().includes(skillInput.toLowerCase()) && !formData.skills.includes(skill),
    )
    setFilteredSkills(filtered)
  }, [skillInput, formData.skills])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        skillsInputRef.current &&
        !skillsInputRef.current.contains(event.target)
      ) {
        setIsSkillsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements]
    updatedRequirements[index] = value
    setFormData((prev) => ({
      ...prev,
      requirements: updatedRequirements,
    }))
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }))
  }

  const removeRequirement = (index) => {
    const updatedRequirements = [...formData.requirements]
    updatedRequirements.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      requirements: updatedRequirements,
    }))
  }

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value)
    setIsSkillsDropdownOpen(true)
  }

  const handleSkillInputKeyDown = (e) => {
    // Add skill when pressing Enter
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault()

      // If there are filtered skills, add the first one
      if (filteredSkills.length > 0) {
        addSkill(filteredSkills[0])
      } else {
        // Add custom skill if it doesn't exist in the list
        const formattedSkill = skillInput.trim()
        if (!formData.skills.includes(formattedSkill)) {
          addSkill(formattedSkill)
        }
      }
    }
  }

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
    }
    setSkillInput("")
    setIsSkillsDropdownOpen(false)
    skillsInputRef.current.focus()
  }

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const fetchCategory = async () => {
    try {
      const response = await axios.get("/api/cat/displayCategory");
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch category.");
    }
  };

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    if (formData.category) {
      setSkills(categories.find((cat) => cat.category === formData.category)?.skills || []);
    }
  }, [formData.category, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.title.trim()) {
      toast.error("Job title is required")
      return
    }

    if (!formData.budget.trim()) {
      toast.error("Budget is required")
      return
    }

    if (!formData.description.trim()) {
      toast.error("Job description is required")
      return
    }

    if (formData.skills.length === 0) {
      toast.error("At least one skill is required")
      return
    }

    // Filter out empty requirements
    const cleanedFormData = {
      ...formData,
      requirements: formData.requirements.filter((req) => req.trim() !== ""),
    }
    try {
      const response = await axios.post("/api/job/createJobs", cleanedFormData)
      toast.success(response.data?.message || "Job posted successfully!")
      setFormData({
        title: "",
        budget: "",
        duration: "",
        experienceLevel: "",
        proposalsToReview: "",
        category: "",
        hires: "",
        description: "",
        requirements: [""],
        skills: [],
      })
      fetchJobs()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job. Please try again.")
      console.error("Error posting job:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer for E-commerce Platform"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                  Budget <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  min={1}
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. $10000-20000 fixed"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Length
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Select Duration</option>
                  <option value="less than 1 month">less than 1 month</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proposalsToReview" className="block text-sm font-medium text-gray-700 mb-1">
                Max Proposals To Review
                </label>
                <input
                  type="number"
                  id="proposalsToReview"
                  name="proposalsToReview"
                  min="1"
                  // max="10"
                  value={formData.proposalsToReview}
                  placeholder="e.g. 3 proposals"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="hires" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Freelancers to Hire
                </label>
                <input
                  type="number"
                  id="hires"
                  name="hires"
                  min="1"
                  // max="10"
                  value={formData.hires}
                  placeholder="e.g. 1 freelancer"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Select Experience Level</option>
                  <option value="All">All</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div> 

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                 Job Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>Select Job Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.category}>{cat.category}</option>
                   ) )}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the job, project goals, and what you're looking for in a freelancer..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <button
                  type="button"
                  onClick={addRequirement}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <PlusIcon className="w-4 h-4 mr-1" /> Add Requirement
                </button>
              </div>

              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <MinusIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {formData.category && <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills Required <span className="text-red-500">*</span>
              </label>

              {/* Selected skills tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-700 hover:text-blue-900 focus:outline-none"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Skills search input */}
              <div className="relative">
                <div className="flex items-center relative">
                  <MagnifyingGlassIcon className="absolute left-3 text-gray-400 w-5 h-5" />
                  <input
                    ref={skillsInputRef}
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onKeyDown={handleSkillInputKeyDown}
                    onFocus={() => setIsSkillsDropdownOpen(true)}
                    placeholder="Search for skills..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Skills dropdown */}
                {isSkillsDropdownOpen && filteredSkills.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
                  >
                    {filteredSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                      >
                        <span>{skill}</span>
                        <CheckIcon className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                )}

                {isSkillsDropdownOpen && skillInput && filteredSkills.length === 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-4 text-sm text-gray-500">
                    No matching skills found
                  </div>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Search and select skills from the list or press Enter to add custom skills
              </p>
            </div>}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


