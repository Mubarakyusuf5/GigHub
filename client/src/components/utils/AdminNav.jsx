import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ChartPieIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export const AdminNav = ({ isOpen, click }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const mobileMenuRef = useRef(null);
  const notifyMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();

    const links = [
      { title: "Dashboard", url: "/admin/dashboard", icon: HomeIcon },
      { title: "Manage Users", url: "/admin/manage-users", icon: UserGroupIcon },
      { title: "Manage Categories", url: "/admin/manage-categories", icon: UserGroupIcon },
      { title: "Transactions", url: "/admin/transactions", icon: UserGroupIcon },
      { title: "Payment Request", url: "/admin/payment", icon: UserGroupIcon },
      { title: "Analytics", url: "/analytics", icon: ChartPieIcon },
    ];

  useEffect(() => {
    // fetchProfile()
    // Example notification count - in a real app, you would fetch this
    setNotificationCount(3);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close mobile menu when clicking outside
      if (
        isMobile &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-mobile-toggle]")
      ) {
        setIsMobile(false);
      }

      // Close notification panel when clicking outside
      if (
        isNotify &&
        notifyMenuRef.current &&
        !notifyMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-notify-toggle]")
      ) {
        setIsNotify(false);
      }

      // Close profile dropdown when clicking outside
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest("[data-profile-toggle]")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isNotify, isDropdownOpen]);

  const toggleMenu = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMobileMenu = () => {
    setIsMobile((prevState) => !prevState);
  };

  const toggleNotify = () => {
    setIsNotify((prevState) => !prevState);
  };

  return (
    <nav className="flex justify-between items-center w-full bg-white h-14 px-4 lg:px-6 sticky top-0 z-20 border-b shadow-sm ">
      {/* <div onClick={click} className='cursor-pointer lg:hidden p-1 hover:bg-gray-100 rounded-xl'>
        <Bars3Icon className='w-8 h-8' />
      </div> */}
      <button
        data-mobile-toggle
        onClick={toggleMobileMenu}
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
        aria-expanded={isMobile}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      </button>
      <h3 className="text-2xl font-bold hidden lg:block">
        Good Morning, Admin
      </h3>
      <div className="space-x-4 flex items-center">
        <BellIcon className="h-9 w-9 p-1 bg-gray-100 transition-all duration-300 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer" />
        <div className="h-11 w-11 rounded-full bg-gray-100 cursor-pointer"></div>
        {/* {isOpen && "yeeeeeakojo"} */}
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-y-0  left-0 z-40 w-64 bg-white shadow-lg transform ${
            isMobile ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-4">
            {/* Logo in mobile menu */}
            <div className="flex items-center justify-between mb-6">
              <Link
                to={`/admin/dashboard`}
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
                    {/* {profile?.profilePicture ? (
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${profile.profilePicture}`}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-gray-500" />
                    )} */}
                    <UserCircleIcon className="h-full w-full text-gray-500" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {user?.fullname}
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {user?.role || "User"}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile navigation links */}
            <div className="space-y-1 pb-3">
              {links.map((link) => (
                <Link
                  key={link.title}
                  to={link.url}
                  className="flex items-center text-sm px-3 py-2 font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  {link.title === "Dashboard" ? (
                    <HomeIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Manage Users" ? (
                    <UserGroupIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Manage Categories" ? (
                    <ChartBarIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Transactions" ? (
                    <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Payment Request" ? (
                    <ChatBubbleLeftRightIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : link.title === "Analytics" ? (
                    <ChartPieIcon className="mr-3 h-5 w-5 text-gray-500" />
                  ) : null}
                  {link.title}
                </Link>
              ))}

              {/* Additional mobile menu items */}
              <div className="pt-4 mt-2 border-t border-gray-200 text-sm">
                <Link
                  to="/account-settings"
                  className="flex items-center px-3 py-2 font-medium rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={toggleMobileMenu}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-500" />
                  Account settings
                </Link>
                <button
                  // to="/logout"
                  className="flex items-center w-full px-3 py-2 font-medium rounded-md  text-red-600 hover:bg-red-50"
                  onClick={() => logout()}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 " />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {/* Overlay for mobile menu */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 lg:hidden z-30"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};
