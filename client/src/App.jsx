import React, { useEffect } from "react";
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
// import { KYC } from "./pages/general/KYC";
// import { SkillSelector } from "./components/modals/job/SkillSelector";
// import { JobModa } from "./components/modals/job/JobModa";
import { Transactions } from "./pages/admin/Transactions";
import { Profile1 } from "./pages/general/Profile1";
import { FrlncrJobDetail } from "./pages/freelancer/FrlncrJobDetail";
import { ProposalPage } from "./pages/freelancer/ProposalPage";
import { ViewProposal } from "./components/modals/job/ViewProposal";
import { CompleteProfile } from "./pages/general/CompleteProfile";
import { TokenExpiryModal } from "./components/modals/TokenExpiryModal";
import { Preview } from "./pages/client/Preview";
import { SkillSelector } from "./components/modals/job/SkillSelector";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { AccountSetting } from "./pages/general/AccountSetting";
import { Navbars } from "./pages/general/Navbars";
import { TestDetails } from "./pages/client/TestDetails";
import { FindFreelancer } from "./pages/client/FindFreelancer";
import { FindJobs } from "./pages/freelancer/FindJobs";
// import { FreelancerCard } from "./pages/general/freelancer-profile-view-usage";
import { FreelancerProfile } from "./pages/freelancer/FreelancerProfile";
// import { ClientProfile } from "./pages/client/ClientProfile";
import { ClientProfileView } from "./pages/general/freelancer-profile-view";
import { ClientCard } from "./pages/general/freelancer-profile-view-usage";
import HiredFreelancersSection from "./test/usage";
import { RequestPayment } from "./pages/admin/RequestPayment";
import { ScrollToTop } from "./components/ScrollToTop";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = BACKEND_URL;
axios.defaults.withCredentials = true;

export const App = () => {
  const location = useLocation();
  const isSignInPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isFrgtPage = location.pathname === "/forgot-password";
  const isResetPage = location.pathname === "/reset-password/:token";
  const isOTPPage = location.pathname === "/verify-otp";
  const isKYCPage = location.pathname === "/complete-profile";
  // const user = "Client";
  const { user } = useAuth()
  return (
    // <AuthProvider>
      <div className="">
        <ScrollToTop />
        {/* <HomeNav /> */}
        <Toaster position="top-center" duration={3000} />
        {/* token expiry modal */}
        {user && <TokenExpiryModal />}
        
        {!isSignInPage &&
          !isSignupPage &&
          !isFrgtPage &&
          !isOTPPage &&
          !isResetPage &&
          !isKYCPage &&
          (user?.role === "Client" || user?.role === "Freelancer" ? <Nav /> : !user && <HomeNav />)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<FrgtPass />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
          {/* <Route path="/verify-otp" element={<VerifyOTP />} /> */}
          <Route path="/message" element={<Message />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/viewProposal" element={<ViewProposal />} />
          {/* <Route path="/account-settings" element={<AccountSetting />} /> */}
          <Route path="/account-settings/:tab" element={<AccountSetting />} />
          {/* <Route path="/account-settings/profile" element={<AccountSetting />} /> */}
          <Route path="/preview" element={<Preview />} />
          <Route path="/navs" element={<Navbars />} />
          <Route path="/detail" element={<TestDetails />} />

          {/* admin */}
          <Route path="/admin/dashboard" element={<AdminDash />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
          <Route path="/admin/manage-categories" element={<ManageCtgry />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/payment-request" element={<RequestPayment />} />

          {/* Client */}
          <Route path="/client/dashboard" element={<ClientDash />} />
          <Route path="/client/job-details/:id" element={<JobDetail />} />
          <Route path="/client/find-freelancers" element={<FindFreelancer />} />
          <Route path="/profileClient" element={<ClientCard />} />

          {/* Freelancer */}
          <Route path="/dashboard" element={<FreeDash />} />
          <Route path="/job-detail/:id" element={<FrlncrJobDetail />} />
          <Route path="/proposal/:id" element={<ProposalPage />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/profile" element={<Profile1 />} />
          <Route path="/profileFree/:id" element={<FreelancerProfile />} />
          {/* <Route path="/profil" element={<FreelancerCard />} /> */}

          {/* testing purpose */}
          <Route path="/hire" element={<HiredFreelancersSection />} />

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
    // </AuthProvider>
  );
};
