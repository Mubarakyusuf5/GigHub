import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/utils/Sidebar'
import { AdminNav } from '../../components/utils/AdminNav'
// import { AddCategoryModal } from '../../components/modals/category/AddCategoryModal'
import { AddCategoryModal } from '../../components/modals/category/AddCategoryModal'
import { UpdateCategoryModal } from '../../components/modals/category/UpdateCategoryModal'
import { ViewCategoryModal } from '../../components/modals/category/ViewCategoryModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ArrowPathIcon, MagnifyingGlassIcon, PencilIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DataTable from 'react-data-table-component'
import { DeleteModal } from '../../components/modals/DeleteModal'


// Custom Action Button component for table actions
const ActionButton = ({ icon: Icon, onClick, ariaLabel, bgColor }) => (
  <button
    onClick={onClick}
    className={`p-1.5 rounded-full ${bgColor} text-white hover:opacity-80 transition-all duration-200 shadow-sm`}
    aria-label={ariaLabel}
  >
    <Icon className="w-4 h-4" />
  </button>
)

// Custom styles for DataTable
const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#fff",
      color: "#374151",
      borderBottom: "1px solid #e5e7eb",
      borderTopLeftRadius: "0.75rem",
      borderTopRightRadius: "0.75rem",
    },
  },
  headCells: {
    style: {
      fontSize: "0.875rem",
      fontWeight: "600",
      textTransform: "uppercase",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "12px",
      paddingBottom: "12px",
      width: "150px"
    },
  },
  rows: {
    style: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9fafb",
      },
      "&:hover": {
        backgroundColor: "#f3f4f6",
        transition: "all 0.2s ease",
      },
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e5e7eb",
      borderBottomLeftRadius: "0.75rem",
      borderBottomRightRadius: "0.75rem",
    },
  },
}

export const ManageCtgry = () => {
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [categoryData, setcategoryData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const { user } = useAuth();

  const fetchCategory = async () => {
    try {
      setRefreshing(true)
      const response = await axios.get("/api/cat/displayCategory")
      const data = response.data
      setcategoryData(data)
      setFilteredData(data)
      setLoading(false)
      setRefreshing(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch categories")
      console.error("Failed to fetch categories:", error)
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(categoryData)
    } else {
      const filtered = categoryData.filter((cat) => {
        const searchTerm = search.toLowerCase()
        return (
          (cat.category && cat.category.toLowerCase().includes(searchTerm)) ||
          (cat.skills && cat.skills.includes(searchTerm)) //fix filter
        )
      })
      setFilteredData(filtered)
    }
  }, [search, categoryData])

  const handleUpdateBtn = (categoryData) => {
    setSelectedCategory(categoryData)
    setShowUpdateModal(true)
  }

  const handleViewModal = (categoryData) => {
    setSelectedCategory(categoryData)
    setShowViewModal(true)
  }

  const handleDeleteModal = (categoryData) => {
    setSelectedCategory(categoryData)
    setShowDeleteModal(true)
  }

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/cat/deleteCategory/${id}`)
      toast.success(response.data.message)
      setShowDeleteModal(false)
      fetchCategory()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting category. Please try again.")
      console.error("Failed to delete category:", error)
    }
  }

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const columns = [
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Skills",
      selector: (row) => row.skills.join(", "),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          {/* <ActionButton
            icon={EyeIcon}
            onClick={() => handleViewModal(row)}
            ariaLabel="View user"
            bgColor="bg-blue-500"
          /> */}
          <ActionButton
            icon={PencilIcon}
            onClick={() => handleUpdateBtn(row)}
            ariaLabel="Edit user"
            bgColor="bg-yellow-500"
          />
          <ActionButton
            icon={TrashIcon}
            onClick={() => handleDeleteModal(row)}
            ariaLabel="Delete user"
            bgColor="bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar />
      <div className="w-full lg:ml-[240px]">
        <AdminNav isOpen={isOpen} click={handleToggle} />
        <div className="p-6 lg:p-8">
          {/* Header section */}
          <div className="flex flex-col gap-6 mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#00539c] font-poppins">Manage Categories</h1>
              

             {/* Action Bar */}
             <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="py-2.5 px-4 bg-[#eea47f] text-white rounded-lg hover:bg-[#e8956f] transition-colors flex items-center justify-center shadow-sm"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create Category
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search category or skills..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-[#00539c] focus:border-[#00539c] bg-white shadow-sm transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Refresh button */}
              <button
                onClick={fetchCategory}
                disabled={refreshing}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-all duration-200 text-slate-700"
              >
                <ArrowPathIcon
                  className={`h-5 w-5 mr-2 ${refreshing ? "animate-spin text-[#00539c]" : "text-slate-500"}`}
                />
                <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
            </div>
          </div>
          </div>

          {/* Table section */}
          {loading ? (
            <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-md border border-slate-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#00539c] animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-[#eea47f] animate-spin animation-delay-150"></div>
              </div>
              <p className="text-lg font-medium text-slate-700 mt-4">Loading categories...</p>
            </div>
          </div>
          ) : (
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                responsive
                noDataComponent={
                  <div className="flex flex-col items-center justify-center p-10">
                    <p className="text-lg font-medium text-gray-500 mb-2">No categories found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && <AddCategoryModal fetchCategory={fetchCategory} onClose={() => setShowModal(false)} />}
      {showUpdateModal && (
        <UpdateCategoryModal categoryData={selectedCategory} fetchCategory={fetchCategory} onClose={() => setShowUpdateModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedCategory._id)} />
      )}
      {showViewModal && <ViewCategoryModal onClose={() => setShowViewModal(false)} categoryData={selectedCategory} />}
    </div>
  )
}

