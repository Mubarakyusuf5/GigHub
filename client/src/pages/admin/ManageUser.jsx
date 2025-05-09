"use client"

import { useEffect, useState } from "react"
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, ArrowPathIcon, XMarkIcon, KeyIcon } from "@heroicons/react/24/outline"
import DataTable from "react-data-table-component"
import axios from "axios"
import toast from "react-hot-toast"
import { AdminNav } from "../../components/utils/AdminNav"
import { Sidebar } from "../../components/utils/Sidebar"
import { DeleteModal } from "../../components/modals/DeleteModal"
import { AddUserModal } from "../../components/modals/user/AddUserModal"
import { UpdateUserModal } from "../../components/modals/user/UpdateUserModal"
import { UpdatePasswordModal } from "../../components/modals/user/UpdatePasswordModal"
// import { useAuth } from "../../Context/AuthContext";

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
      backgroundColor: "#ffffff",
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
  // pagination: {
  //   style: {
  //     borderTop: "1px solid #e5e7eb",
  //     borderBottomLeftRadius: "0.75rem",
  //     borderBottomRightRadius: "0.75rem",
  //   },
  // },
}

export const ManageUser = () => {
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [userData, setUserData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  // const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      setRefreshing(true)
      const response = await axios.get("/api/user/displayUser")
      const data = response.data
      setUserData(data)
      setFilteredData(data)
      setLoading(false)
      setRefreshing(false)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users")
      console.error("Failed to fetch users:", error)
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredData(userData)
    } else {
      const filtered = userData.filter((user) => {
        const searchTerm = search.toLowerCase()
        return (
          (user.fullname && user.fullname.toLowerCase().includes(searchTerm)) ||
          (user.email && user.email.toLowerCase().includes(searchTerm)) ||
          (user.role && user.role.toLowerCase().includes(searchTerm)) ||
          (user.status && user.status.toLowerCase().includes(searchTerm))
        )
      })
      setFilteredData(filtered)
    }
  }, [search, userData])

  const handleUpdateBtn = (userData) => {
    setSelectedUser(userData)
    setShowUpdateModal(true)
  }

  const handleViewModal = (userData) => {
    setSelectedUser(userData)
    setShowViewModal(true)
  }

  const handlePasswordModal = (userData) => {
    setSelectedUser(userData)
    setShowPasswordModal(true)
  }

  const handleDeleteModal = (userData) => {
    setSelectedUser(userData)
    setShowDeleteModal(true)
  }

  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(`/api/user/deleteUser/${id}`)
      toast.success(response.data.message)
      setShowDeleteModal(false)
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user. Please try again.")
      console.error("Failed to delete user:", error)
    }
  }

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
    // console.log(isOpen)
  }
  // console.log(isOpen)

  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Suspended"
              ? "bg-yellow-100 text-yellow-800"
              : row.status === "Active"
                ? "bg-green-100 text-green-800"
                : row.status === "Blocked"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.status}
        </span>
      ),
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
            icon={KeyIcon}
            onClick={() => handlePasswordModal(row)}
            ariaLabel="update password"
            bgColor="bg-gray-500"
          />
          <ActionButton
            icon={TrashIcon}
            onClick={() => handleDeleteModal(row)}
            ariaLabel="Delete user"
            bgColor="bg-red-500"
          />
          
        </div>
      ),
      // ignoreRowClick: true,
      // allowOverflow: true,
      // button: true,
    },
  ]
  // console.log(selectedUser._id)

  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className=" w-full lg:ml-[240px]">
        <AdminNav isOpen={isOpen} click={handleToggle} />
        <div className="p-6 lg:p-8">
          {/* Header section */}
          <div className="flex flex-col gap-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#00539c] font-poppins">Manage Users</h1>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="py-2.5 px-4 bg-[#eea47f] text-white rounded-lg hover:bg-[#e8956f] transition-colors flex items-center justify-center shadow-sm"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Create New User
            </button>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
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
                onClick={fetchUsers}
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
              <p className="text-lg font-medium text-slate-700 mt-4">Loading users...</p>
            </div>
          </div>
          ) : (
            <div className="rounded-xl overflow-x-auto shadow-md">
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                // paginationPerPage={10}
                // paginationRowsPerPageOptions={[10, 25, 50, 100]}
                customStyles={customStyles}
                highlightOnHover
                pointerOnHover
                responsive
                noDataComponent={
                  <div className="flex flex-col items-center justify-center p-10">
                    <p className="text-lg font-medium text-gray-500 mb-2">No users found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                  </div>
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showModal && <AddUserModal fetchUsers={fetchUsers} onClose={() => setShowModal(false)} />}
      {showUpdateModal && (
        <UpdateUserModal userData={selectedUser} fetchUsers={fetchUsers} onClose={() => setShowUpdateModal(false)} />
      )}
      {showPasswordModal && (
        <UpdatePasswordModal userData={selectedUser} fetchUsers={fetchUsers} onClose={() => setShowPasswordModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={() => handleDeleteBtn(selectedUser._id)} />
      )}
      {showViewModal && <ViewUserModal onClose={() => setShowViewModal(false)} userData={selectedUser} />}
    </div>
  )
  
}

