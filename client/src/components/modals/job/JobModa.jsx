import { useState, useRef, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { CheckIcon, MagnifyingGlassIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

export const JobModa = ({ onClose, fetchJobs }) => {

  const [formData, setFormData] = useState({
        category: "",
        skills: [],
      });
  // State for skills input and dropdown
  const [skills, setSkills] = useState([]) 
  const [categories, setCategories] = useState([]) //replace skill array from backend
  const [skillInput, setSkillInput] = useState("")
  const [filteredSkills, setFilteredSkills] = useState([])
  const [isSkillsDropdownOpen, setIsSkillsDropdownOpen] = useState(false)
  const skillsInputRef = useRef(null)
  const dropdownRef = useRef(null)

// for jobpost modal


useEffect(() => {
  const fetchCategory = async () => {
    try {
      const response = await axios.get("/api/displayCategory");
      setCategories(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch category.");
    }
  };
  fetchCategory();
}, []);

useEffect(() => {
  if (formData.category) {
    setSkills(categories.find((cat) => cat._id === formData.category)?.skills || []);
  }
}, [formData.category, categories]);



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


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.category) {
      toast.error("Job title is required")
      return
    }

    if (formData.skills.length === 0) {
      toast.error("At least one skill is required")
      return
    }

console.log(cleanedFormData)
    try {
      const response = await axios.post("/api/createJobs", formData)
      toast.success(response.data?.message || "Job posted successfully!")
      setFormData({
        category: "",
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
                    <option key={cat._id} value={cat._id}>{cat.category}</option>
                   ) )}
                </select>
              </div>
            {/* </div> */}

       

            {formData.category && 
            <div>
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
            </div>
            }
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


