import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  BellAlertIcon,
  BellIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../Context/AuthContext";
import { DropdownMenu } from "./dropdownNav";
import axios from "axios";
import toast from "react-hot-toast";
import { NotificationModal } from "../modals/NotificationModal";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNotitfy, setNotitfy] = useState(false);
  const [profile, setProfile] = useState("");
  const mobileMenuRef = useRef(null);
  const notifyMenuRef = useRef(null);
  const { user } = useAuth();

  const fetchProfile = async () => {
    try {
      if (user?.role === "Client") {
        const response = await axios.get(`/api/profile/displayClientProfile`);
        setProfile(response.data.client[0]);
      } else if (user?.role === "Freelancer") {
        const response = await axios.get(`/api/profile/displayFrlncrProfile`);
        // console.log(response.data.freelancer[0])
        setProfile(response.data.freelancer[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error displaying profile!");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)
        ) {
          setIsMobile(false);
        } 
        // if(notifyMenuRef.current && !notifyMenuRef.current.contains(e.target)){
        //   setNotitfy(false)
        // }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const mobileMenu = () => {
    setIsMobile(prevMobile => !prevMobile)
  };

  const notifyMenu = () => {
    setNotitfy(prevNotify => !prevNotify)
  };
  return (
    <nav
      className={`bg-white shadow-sm sticky top-0 z-10 ${
        user?.role === "Admin" ? "hidden" : ""
      }`}
    >
      <div className="px-4 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex space-x-11">
            <div className="flex items-center gap-3">
              <div onClick={mobileMenu} className="lg:hidden">
                <Bars3Icon className="h-8 w-8 cursor-pointer " />
              </div>

              {/* Logo */}
              <Link
                to={
                  user?.role === "Client" ? `/client/dashboard` : `/dashboard`
                }
                className="flex items-center space-x-2"
              >
                <img
                  src="/placeholder.svg"
                  width={40}
                  height={40}
                  alt="GigHub Logo"
                />
                <span className="text-xl font-bold text-[#3A506B]">GigHub</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              {user?.role === "Client" ? (
                <>
                  <Link
                    to="/client/find-freelancers"
                    className="text-[#3A506B] hover:text-[#FF6B6B]"
                  >
                    Find Freelancers
                  </Link>
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
                  <Link
                    to="/find-jobs"
                    className="text-[#3A506B] hover:text-[#FF6B6B]"
                  >
                    Find Jobs
                  </Link>
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
          </div>

          {/* CTA Buttons and Auth Links */}
          <div className="flex items-center space-x-4">
            <div>
            <BellIcon onClick={notifyMenu} className={` h-7 w-7 cursor-pointer `} />

            <NotificationModal isNotify={isNotitfy} notifyMenuRef={notifyMenuRef} />
            </div>
            <div
              onClick={toggleMenu}
              className="h-12 w-12 rounded-full bg-gray-300 cursor-pointer overflow-hidden"
            >
              <img
                loading="lazy"
                src={`${import.meta.env.VITE_BACKEND_URL}/${
                  profile?.profilePicture
                }`}
                alt={profile?.profilePictur}
                className="h-full w-full object-cover"
              />
            </div>
            {/* dropdown menu */}
            <div>
              <DropdownMenu
                isOpen={isOpen}
                profile={profile}
                
              />
            </div>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div ref={mobileMenuRef} className={`bg-red-400 w-[250px] lg:hidden h-[100vh] p-2 transition-all duration-300 absolute ${isMobile ? "left-0" : "-left-[250px]"} overflow-hidden flex flex-col`}>
      {user?.role === "Client" ? (
                <>
                  <Link
                    to="/client/find-freelancers"
                    className="text-[#3A506B] hover:bg-teal-100"
                  >
                    Find Freelancers
                  </Link>
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
                  <Link
                    to="/find-jobs"
                    className="text-[#3A506B] hover:bg-teal-100 p-2 bg-white rounded-md"
                  >
                    Find Jobs
                  </Link>
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
    </nav>
  );
};
