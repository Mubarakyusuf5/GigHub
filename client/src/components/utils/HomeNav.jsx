import React from 'react'
import { Link } from "react-router-dom";
import { Bars3BottomRightIcon, Bars3Icon, BellIcon, ChevronDownIcon, GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const HomeNav = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 lg:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src="/placeholder.svg?height=40&width=40" width={40} height={40} alt="GigHub Logo" />
              <span className="text-xl font-bold text-[#3A506B]">GigHub</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/" className="text-[#3A506B] hover:text-[#FF6B6B]">
                something
              </Link>
              <div className="relative group">
                <button className="text-[#3A506B] hover:text-[#FF6B6B] flex items-center">
                  Browse Categories <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                  <div className="py-1">
                    <Link to="#" className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]">
                      Design
                    </Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]">
                      Development
                    </Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-[#3A506B] hover:bg-[#F0F3F5]">
                      Writing
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="#" className="text-[#3A506B] hover:text-[#FF6B6B]">
                How It Works
              </Link>
            </div>

            {/* Search Bar */}
            {/* <div className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for freelancers or services..."
                  className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute h-5 w-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div> */}

            {/* CTA Buttons and Auth Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/login" className="text-[#3A506B] py-1.5 px-3 rounded-md border hover:text-[#FF6B6B]">
                Sign In
              </Link>
              <Link to={"/signup"} className="bg-[#3A506B] py-1.5 px-3 rounded-md hover:bg-[#4A607B] text-white">
                Sign Up
              </Link>            
            </div>
          <div className='lg:hidden'>
            <Bars3Icon className='h-8 w-8 cursor-pointer' />
          </div>
          </div>
        </div>
      </nav>
  )
}
