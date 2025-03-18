import { ChartBarIcon, ChartPieIcon, HomeIcon, PresentationChartLineIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const links = [
    { title: "Dashboard", url: "/admin/dashboard", icon: HomeIcon },
    { title: "Manage Users", url: "/admin/manage-users", icon: UserGroupIcon },
    { title: "Manage Categories", url: "/admin/manage-categories", icon: UserGroupIcon },
    { title: "Transactions", url: "/admin/transactions", icon: UserGroupIcon },
    { title: "Analytics", url: "/analytics", icon: ChartPieIcon },
  ];
  return (
    <div className="w-[240px] min-h-screen bg-red-300 absolute px-5 pb-3">
      <h1 className="h-14 text-2xl font-bold flex items-center justify-start mb-8">GigHub</h1>
      <ul className="space-y-1">
        {links.map(({ url, title, icon: Icon }, index) => (
          <li key={index}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-xl  transition-all text-sm hover:bg-blue-700 hover:text-white duration-300 
              ${isActive ? "bg-red-900 text-white" : " text-slate-600"}`
              }
            >
              {<Icon className="h-6 w-6 mr-3" />}
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
