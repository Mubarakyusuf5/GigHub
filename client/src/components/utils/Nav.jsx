"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
  HomeIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { useAuth } from "../../Context/AuthContext"
import { DropdownMenu } from "./dropdownNav"
import axios from "axios"
import toast from "react-hot-toast"
import { NotificationModal } from "../modals/NotificationModal"

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isNotify, setIsNotify] = useState(false)
  const [profile, setProfile] = useState("")
  const [notificationCount, setNotificationCount] = useState(0)
  const mobileMenuRef = useRef(null)
  const notifyMenuRef = useRef(null)
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()

  const fetchProfile = async () => {
    try {
      if (user?.role === "Client") {
        const response = await axios.get(`/api/profile/displayClientProfile`)
        setProfile(response.data.client[0])
      } else if (user?.role === "Freelancer") {
        const response = await axios.get(`/api/profile/displayFrlncrProfile`)
        setProfile(response.data.freelancer[0])
      }
    } catch (error) {
      console.log("nav", error)
      toast.error(error.response?.data?.message || "Error displaying profile!")
    }
  }
  // console.log(profile._id)

  const links = {
    freelancerLinks: [
      { title: "Dashboard", path: "/dashboard" },
      { title: "Find Jobs", path: "/find-jobs" },
      { title: "Analytics", path: "/analytics" },
      { title: "Messages", path: "/message" },
    ],
    clientLinks: [
      { title: "Dashboard", path: "/client/dashboard" },
      { title: "Find Freelancers", path: "/client/find-freelancers" },
      { title: "Analytics", path: "/analytics" },
      { title: "Messages", path: "/message" },
    ],
  };

  useEffect(() => {
    fetchProfile()
    // Example notification count - in a real app, you would fetch this
    setNotificationCount(3)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close mobile menu when clicking outside
      if (
        isMobile &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-mobile-toggle]")
      ) {
        setIsMobile(false)
      }

      // Close notification panel when clicking outside
      if (
        isNotify &&
        notifyMenuRef.current &&
        !notifyMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-notify-toggle]")
      ) {
        setIsNotify(false)
      }

      // Close profile dropdown when clicking outside
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("[data-profile-toggle]")
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isNotify, isOpen])

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  const toggleMobileMenu = () => {
    setIsMobile((prevState) => !prevState)
  }

  const toggleNotify = () => {
    setIsNotify((prevState) => !prevState)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and desktop navigation */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              data-mobile-toggle
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              aria-expanded={isMobile}
            >
              <span className="sr-only">Open main menu</span>
              {isMobile ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>

            {/* Logo */}
            <Link
              to={user?.role === "Client" ? `/client/dashboard` : `/dashboard`}
              className="flex items-center space-x-2 ml-2 lg:ml-0"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-teal-400 rounded-md flex items-center justify-center text-white font-bold">
                GH
              </div>
              <span className="text-xl font-bold text-gray-800">GigHub</span>
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden lg:flex lg:ml-10">
              <div className="flex space-x-6">
                {user?.role === "Client" ? (
                  <>
                  {
                    links.clientLinks.map((link) => (
                      <Link
                        key={link.title}
                        to={link.path}
                        className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))
                  }
                  </>
                ) : (
                  <>
                    {links.freelancerLinks.map((link) => (
                      <Link
                        key={link.title}
                        to={link.path}
                        className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right side: Notifications and Profile */}
          <div className="flex items-center lg:space-x-4">
            {/* Notifications button with indicator */}
            <div className="relative">
              <button
                data-notify-toggle
                onClick={toggleNotify}
                className="p-1.5 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                aria-label="View notifications"
              >
                <BellIcon className="h-6 w-6" />
                {/* {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                    {notificationCount}
                  </span>
                )} */}
              </button>

              {/* Notification dropdown container */}
              <div
                ref={notifyMenuRef}
                className={`${isNotify ? "block" : "hidden"}`}
              >
                <NotificationModal isNotify={isNotify} notifyMenuRef={notifyMenuRef} />
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                data-profile-toggle
                onClick={toggleMenu}
                className="lg:flex items-center hidden text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                id="user-menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden hidden lg:block">
                  {profile?.profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${profile.profilePicture}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-gray-500" />
                  )}
                </div>
              </button>

              {/* Profile dropdown container */}
              <div ref={dropdownRef}>
                <DropdownMenu setIsOpen={setIsOpen} isOpen={isOpen} profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isMobile ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className="p-4">
          {/* Logo in mobile menu */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to={user?.role === "Client" ? `/client/dashboard` : `/dashboard`}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-teal-400 rounded-md flex items-center justify-center text-white font-bold">
                GH
              </div>
              <span className="text-lg font-bold text-gray-800">GigHub</span>
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* User profile info in mobile menu */}
          <div className="py-3 border-t border-b border-gray-200 mb-4">
            <div className="flex items-center px-2 py-2">
              <div className="flex-shrink-0 mr-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                  {profile?.profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${profile.profilePicture}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-gray-500" />
                  )}
                </div>
              </div>
              <div>
                <div className="text-base font-medium text-gray-800">
                  {user?.role === "Client" && profile?.companyName}
                  {user?.role === "Freelancer" && profile?.user?.fullname}
                </div>
                <div className="text-sm font-medium text-gray-500">{user?.role || "User"}</div>
              </div>
            </div>
          </div>

          {/* Mobile navigation links */}
          <div className="space-y-1 pb-3">
            {user?.role === "Client" ? (
              <>
              {links.clientLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  {link.title === "Dashboard" ? (
                    <HomeIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Find Freelancers" ? (
                    <BriefcaseIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Analytics" ? (
                    <ChartBarIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Messages" ? (
                    <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : null}
                  {link.title}
                  </Link>
                ))}
              </>
            ) : (
              <>
                {links.freelancerLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={toggleMobileMenu}
                  >
                    {link.title === "Dashboard" ? (
                      <HomeIcon className="mr-3 h-5 w-5 text-gray-500" />
                    ) : link.title === "Find Jobs" ? (
                      <BriefcaseIcon className="mr-3 h-5 w-5 text-gray-500" />
                    ) : link.title === "Analytics" ? (
                      <ChartBarIcon className="mr-3 h-5 w-5 text-gray-500" />
                    ) : link.title === "Messages" ? (
                      <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-500" />
                    ) : null}
                    {link.title}
                  </Link>
                ))}
              </>
            )}

            {/* Additional mobile menu items */}
            <div className="pt-4 mt-2 border-t border-gray-200">
              <Link
                to={`/profileFree/${profile?.user?._id}`}
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <UserIcon className="mr-3 h-5 w-5 text-gray-500" />
                Your Profile
              </Link>
              <Link
                to="/account-settings/profile"
                className="flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-500" />
                Account settings
              </Link>
              <button
                // to="/logout"
                className="flex items-center w-full px-3 py-2 text-base font-medium rounded-md  text-red-600 hover:bg-red-50"
                onClick={() => logout()}
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 " />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-25 lg:hidden z-30" onClick={toggleMobileMenu}></div>
      )}
    </nav>
  )
}

