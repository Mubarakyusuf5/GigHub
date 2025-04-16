import {
  BellIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserIcon,
  HomeIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  PhotoIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { UserAccountSetting } from "../../components/accountSetting/UserAccountSetting";
import { FreeProfileSetting } from "../../components/accountSetting/FreeProfileSetting";
import { useAuth } from "../../Context/AuthContext";
import { ClientProfileSetting } from "../../components/accountSetting/ClientProfileSetting";
import { UserPaymentSetting } from "../../components/accountSetting/UserPaymentSetting";
import { UserSupportSetting } from "../../components/accountSetting/UserSupportSetting";
import toast from "react-hot-toast";
import axios from "axios";

export const AccountSetting = () => {
  const [profile, setProfile] = useState(null);
  const { tab } = useParams();
  const { user } = useAuth();

  const tabs = [
    {
      title: "Profile Settings",
      tab: "profile",
      Icon: UserIcon,
      description: "Manage your personal information and preferences",
    },
    {
      title: "Account Security",
      tab: "account",
      Icon: ShieldCheckIcon,
      description: "Manage your account details and preferences",
    },
    {
      title: "Payment Information",
      tab: "payment",
      Icon: CreditCardIcon,
      description: "Your bank account details for receiving payments",
    },
    {
      title: "Notifications",
      tab: "notification",
      Icon: BellIcon,
      description: "Configure how you receive notifications and updates",
    },
    {
      title: "Support & Legal",
      tab: "support",
      Icon: QuestionMarkCircleIcon,
      description: "Get help and review legal documents",
    },
  ];

  const fetchProfile = async () => {
    try {
      if (user?.role === "Client") {
        const response = await axios.get(`/api/profile/displayClientProfile`);
        setProfile(response?.data?.client[0]);
      } else if (user?.role === "Freelancer") {
        const response = await axios.get(`/api/profile/displayFrlncrProfile`);
        setProfile(response?.data?.freelancer[0]);
      }
    } catch (error) {
      console.log("account", error);
      toast.error(error.response?.data?.message || "Error displaying profile!");
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen">
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:sticky lg:top-20">
              <nav className="flex flex-col">
                {tabs.map(({ title, tab, Icon }, index) => (
                  <NavLink
                    to={`/account-settings/${tab}`}
                    key={index}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3.5 text-sm transition-colors duration-200 relative ${
                        index !== tabs.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      } ${
                        isActive
                          ? "text-blue-700 font-medium bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full"></div>
                        )}
                        <Icon
                          className={`h-5 w-5 mr-3 ${
                            isActive ? "text-blue-600" : "text-gray-500"
                          }`}
                        />
                        <span>{title}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {tabs.find((t) => t.tab === tab)?.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {tabs.find((t) => t.tab === tab)?.description}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                {tab === "profile" &&
                  (profile &&
                    (user?.role === "Freelancer" ? (
                      <FreeProfileSetting profile={profile} />
                    ) : (
                      <ClientProfileSetting profile={profile} />
                    )))}

                {tab === "account" && profile && (
                  <UserAccountSetting profile={profile} />
                )}

                {tab === "payment" && profile && (
                  <UserPaymentSetting profile={profile} />
                )}

                {tab === "notification" && ( //remove no need
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Email Notifications
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Receive email notifications about your account
                            activity
                          </p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="emailToggle"
                            className="sr-only"
                            defaultChecked
                          />
                          <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            SMS Notifications
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Receive text messages for important updates
                          </p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="smsToggle"
                            className="sr-only"
                          />
                          <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Marketing Communications
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Receive updates about new features and promotions
                          </p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            id="marketingToggle"
                            className="sr-only"
                            defaultChecked
                          />
                          <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "support" && <UserSupportSetting />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your stylesheet for the toggle switches
/*
.dot {
  transition: transform 0.3s ease-in-out;
}
input:checked ~ .dot {
  transform: translateX(100%);
}
input:checked ~ .block {
  background-color: #3b82f6;
}
*/
