import {
  UserIcon,
  ChartBarIcon,
  CreditCardIcon,
  BellIcon,
  WindowIcon,
  MoonIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useAuth } from "../../Context/AuthContext"


export const DropdownMenu =({isOpen, profile})=> {
  const { logout } = useAuth()
  return (
    <div className={ ` ${isOpen ? "block": "hidden"} w-[280px] rounded-xl border bg-white absolute right-[20px] lg:right-[40px] top-[70px] shadow-lg `}>
      <div className="space-y-4 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-12 w-12">
            <img
            loading="lazy"
              src={`${import.meta.env.VITE_BACKEND_URL}/${profile?.profilePicture}` || "/placeholder.svg" }
              alt="Profile picture"
              className="rounded-full object-cover h-full w-full"
            />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="font-semibold tracking-tight">{profile?.user?.fullname}</h2>
            <p className="text-sm text-muted-foreground">{profile?.user?.role}</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* <nav className="space-y-1"> */}
          {/* <Link
            to="/profile/:id"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <UserIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Your profile</span>
          </Link> */}

          {/* <Link
            to="#"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <ChartBarIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Stats and trends</span>
          </Link>

          <Link
            to="#"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <CreditCardIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Membership plan</span>
          </Link>

          <Link
            to="#"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <BellIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Connects</span>
          </Link>

          <Link
            to="#"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <WindowIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Apps and Offers</span>
          </Link> */}
        {/* </nav> */}

        {/* <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /> */}

        <div className="space-y-1">
          <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 active:bg-gray-200">
            <div className="flex items-center space-x-3">
              <MoonIcon className="h-4 w-4 text-gray-600" />
              <span>Theme: Light</span>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-gray-600" />
          </button>

          <Link
            to="/account-settings"
            className="flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 active:bg-gray-200"
          >
            <Cog6ToothIcon className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium">Account settings</span>
          </Link>

          <button
          onClick={() => logout()}
            className="flex items-center w-full space-x-3 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50 active:bg-red-100"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

