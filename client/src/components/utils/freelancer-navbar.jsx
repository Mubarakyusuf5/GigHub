"use client"

import { useState } from "react"
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentCheckIcon,
  BellIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

export const FreelancerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(3) // Example notification count

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white font-bold rounded-lg p-2 mr-2">FL</div>
                <span className="text-xl font-bold text-gray-900">FreelanceHub</span>
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <a
                href="/freelancer/find-jobs"
                className="border-b-2 border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <BriefcaseIcon className="h-5 w-5 mr-1.5" />
                Find Jobs
              </a>
              <a
                href="/freelancer/proposals"
                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1.5" />
                My Proposals
              </a>
              <a
                href="/freelancer/projects"
                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-1.5" />
                Active Projects
              </a>
              <a
                href="/freelancer/messages"
                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1.5" />
                Messages
              </a>
              <a
                href="/freelancer/earnings"
                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                <CurrencyDollarIcon className="h-5 w-5 mr-1.5" />
                Earnings
              </a>
            </div>
          </div>

          {/* Search, notifications, and profile */}
          <div className="hidden sm:flex items-center">
            {/* Search */}
            <div className="relative mr-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {/* Notifications */}
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative mr-3">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative flex items-center">
              <div className="flex items-center">
                <button className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <UserCircleIcon className="h-8 w-8 text-gray-600" />
                </button>
                <div className="ml-2 hidden md:block">
                  <div className="text-sm font-medium text-gray-900">Alex Johnson</div>
                  <div className="text-xs text-gray-500">Web Developer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/freelancer/find-jobs"
              className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 text-base font-medium"
            >
              <div className="flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2" />
                Find Jobs
              </div>
            </a>
            <a
              href="/freelancer/proposals"
              className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium"
            >
              <div className="flex items-center">
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                My Proposals
              </div>
            </a>
            <a
              href="/freelancer/projects"
              className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium"
            >
              <div className="flex items-center">
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                Active Projects
              </div>
            </a>
            <a
              href="/freelancer/messages"
              className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium"
            >
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                Messages
              </div>
            </a>
            <a
              href="/freelancer/earnings"
              className="border-l-4 border-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-800 block pl-3 pr-4 py-2 text-base font-medium"
            >
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 mr-2" />
                Earnings
              </div>
            </a>
          </div>

          {/* Mobile profile section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-10 w-10 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Alex Johnson</div>
                <div className="text-sm font-medium text-gray-500">Web Developer</div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative">
                <BellIcon className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <a
                href="/freelancer/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="/freelancer/settings"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

