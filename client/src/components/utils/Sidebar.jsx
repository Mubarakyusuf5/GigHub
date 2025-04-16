import { NavLink } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"
import {
  HomeIcon,
  UserGroupIcon,
  TagIcon,
  CreditCardIcon,
  BanknotesIcon,
  ChartPieIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"

export const Sidebar = () => {
  const { logout } = useAuth()

  const navigationLinks = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Manage Users",
      url: "/admin/manage-users",
      icon: UserGroupIcon,
    },
    {
      title: "Manage Categories",
      url: "/admin/manage-categories",
      icon: TagIcon,
    },
    {
      title: "Transactions",
      url: "/admin/transactions",
      icon: CreditCardIcon,
    },
    {
      title: "Payment Request",
      url: "/admin/payment-request",
      icon: BanknotesIcon,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartPieIcon,
    },
  ]

  return (
    <aside className="w-[240px] min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 fixed shadow-lg hidden lg:block">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700/50">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-teal-400 rounded-md flex items-center justify-center text-white font-bold">
              GH
            </div>
            <h1 className="ml-3 text-xl font-bold text-white">GigHub</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <nav className="space-y-1">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.url}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-slate-700/50 text-white font-medium"
                      : "text-slate-300 hover:bg-slate-700/30 hover:text-white"
                  }`
                }
              >
                <link.icon className={`h-5 w-5 mr-3 transition-colors duration-200`} />
                <span className="text-sm">{link.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer with logout */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={() => logout()}
            className="flex items-center w-full px-4 py-3 text-sm text-slate-300 rounded-lg transition-colors duration-200 hover:bg-red-500/10 hover:text-red-400 group"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 group-hover:text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
