import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/general/Home";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { FrgtPass } from "./pages/auth/FrgtPass";
import { VerifyOTP } from "./pages/auth/VerifyOTP";
import { AdminDash } from "./pages/admin/AdminDash";
import { ClientDash } from "./pages/client/ClientDash";
import { FreeDash } from "./pages/freelancer/FreeDash";
import { ManageUser } from "./pages/admin/ManageUser";
import { ManageCtgry } from "./pages/admin/ManageCtgry";
import { HomeNav } from "./components/utils/HomeNav";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Message } from "./pages/general/Message";
import { Nav } from "./components/utils/Nav";
import { Analytics } from "./pages/general/Analytics";
import { ResetPass } from "./pages/auth/ResetPass";
import { JobDetail } from "./pages/client/JobDetail";
import { KYC } from "./pages/general/KYC";
import { SkillSelector } from "./components/modals/job/SkillSelector";
import { JobModa } from "./components/modals/job/JobModa";
import { Transactions } from "./pages/admin/Transactions";
import { Profile } from "./pages/general/Profile";
import { FrlncrJobDetail } from "./pages/freelancer/FrlncrJobDetail";
import { ProposalPage } from "./pages/freelancer/ProposalPage";
import { ViewProposal } from "./components/modals/job/ViewProposal";

axios.defaults.baseURL = "http://localhost:6500";
axios.defaults.withCredentials = true;

export const App = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isFrgtPage = location.pathname === "/forgot-password";
  const isResetPage = location.pathname === "/reset-password/:token";
  const isOTPPage = location.pathname === "/verify-otp";
  const isKYCPage = location.pathname === "/complete-profile";
  const user = "Client";
  return (
    <div>
      {/* <HomeNav /> */}
      <Toaster position="top-center" duration={3000} />
      {/* {user === "Client" || user === "Freelancer" ?
      (!isSignInPage && !isSignupPage && !isFrgtPage  && !isOTPPage && !isResetPage && !isKYCPage && <Nav />) :
      user === "Admin" ? (<p className='hidden'>admin</p>)
      :
      (!isSignInPage && !isSignupPage && !isFrgtPage  && !isOTPPage && !isResetPage && !isKYCPage && <HomeNav />)} */}
      {!isSignInPage &&
        !isSignupPage &&
        !isFrgtPage &&
        !isOTPPage &&
        !isResetPage &&
        !isKYCPage &&
        (user === "Client" || user === "Freelancer" ? <Nav /> : <HomeNav />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<FrgtPass />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
        {/* <Route path="/verify-otp" element={<VerifyOTP />} /> */}
        <Route path="/message" element={<Message />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/complete-profile" element={<KYC />} />
        <Route path="/viewProposal" element={<ViewProposal />} />
        {/* <Route path="/SkillSelector" element={<SkillSelector />} /> */}

        <Route path="/admin/dashboard" element={<AdminDash />} />
        <Route path="/admin/manage-users" element={<ManageUser />} />
        <Route path="/admin/manage-categories" element={<ManageCtgry />} />
        <Route path='/admin/transactions' element={<Transactions />} />

        <Route path="/client/dashboard" element={<ClientDash />} />
        <Route path="/client/job-details/:id" element={<JobDetail />} />

        <Route path="/dashboard" element={<FreeDash />} />
        <Route path="/job-detail/:id" element={<FrlncrJobDetail />} />
        <Route path="/proposal/:id" element={<ProposalPage />} />
        <Route path="/profile" element={<Profile />} />

        <Route
          path="/unauthorized"
          element={
            <div className="flex justify-center items-center mt-36 text-3xl font-medium">
              Unauthorized Access
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center mt-36 text-3xl font-medium">
              404 Page not found
            </div>
          }
        />
      </Routes>
    </div>
  );
};
