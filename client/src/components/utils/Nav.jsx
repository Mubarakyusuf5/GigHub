import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  BellAlertIcon,
  BellIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const user = "Client";

  ""

  const toggleMenu = ()=>{
    setIsOpen(isOpen => !isOpen)
    console.log(isOpen ? "close" : "open")
  }

  const mobileMenu =()=>{

  }
  return (
    <nav className={`bg-white shadow-sm sticky top-0 z-10 ${user === "Admin" ? "hidden" : ""}`}>
      <div className="px-4 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={user === "Client" ? `/client/dashboard` : `/dashboard`}
            className="flex items-center space-x-2"
          >
            <img
              src="/placeholder.svg?height=40&width=40"
              width={40}
              height={40}
              alt="GigHub Logo"
            />
            <span className="text-xl font-bold text-[#3A506B]">GigHub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {user === "Client" ? (
              <>
                <Link to="/" className="text-[#3A506B] hover:text-[#FF6B6B]">
                  Home
                </Link>
                <div className="relative group">
                  <button className="text-[#3A506B] hover:text-[#FF6B6B] flex items-center">
                    client Categories{" "}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    {/* <div className="py-1">
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Design
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Development
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Writing
                      </Link>
                    </div> */}
                  </div>
                </div>
                <Link
                  to="/analytics"
                  className="text-[#3A506B] hover:text-[#FF6B6B]"
                >
                  Analytics
                </Link>
                <Link
                  to="/message"
                  className="text-[#3A506B] hover:text-[#FF6B6B]"
                >
                  Messages
                  {/* <BellIcon className="ml-1 h-4 w-4" /> */}
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-[#3A506B] hover:text-[#FF6B6B]">
                  Home
                </Link>
                <div className="relative group">
                  <button className="text-[#3A506B] hover:text-[#FF6B6B] flex items-center">
                    Browse Categories{" "}
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    <div className="py-1">
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Design
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Development
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]"
                      >
                        Writing
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  to="/analytics"
                  className="text-[#3A506B] hover:text-[#FF6B6B]"
                >
                  Analytics
                </Link>
                <Link
                  to="/message"
                  className="text-[#3A506B] hover:text-[#FF6B6B]"
                >
                  Messages
                </Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for freelancers or services..."
                className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute h-5 w-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* CTA Buttons and Auth Links */}
          <div className="hidden lg:flex items-center space-x-4">
            <BellIcon className={` h-7 w-7 cursor-pointer ${isOpen ? "text-red-500" : ""} `} />
            <div onClick={toggleMenu} className="h-12 w-12 rounded-full object-cover bg-gray-300 cursor-pointer">
              <img src="/placeholder.svg?height=40&width=40" alt="" className="h-full w-full rounded-full" />
            </div>
          </div>
          <div className="lg:hidden">
            <Bars3Icon className="h-8 w-8 cursor-pointer " />
          </div>
        </div>
      </div>
    </nav>
  );
};
