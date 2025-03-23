// import { useEffect, useState } from "react";
// import {
//   BriefcaseIcon,
//   UsersIcon,
//   DocumentTextIcon,
//   ChevronRightIcon,
//   CalendarIcon,
//   CurrencyDollarIcon,
//   ClockIcon,
//   UserGroupIcon,
//   FaceSmileIcon,
// } from "@heroicons/react/24/outline";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { format, formatDistanceToNow } from "date-fns";
// import { formatNaira } from "../../components/Data";
// import { ViewProposal } from "../../components/modals/job/ViewProposal";

// export const TestDetails = () => {
//     const [activeTab, setActiveTab] = useState("jobs");
//       const [jobs, setJobs] = useState({});
//       const [showModal, setShowModal] = useState(false)
//       const [selectedJob, setSelectedJob] = useState(null)
//       const { id } = useParams(); // Extract user ID from the URL
//       // const navigate = useNavigate();
    
//       const fetchJobDetails = async () => {
//         try {
//           const response = await axios.get(`/api/job/displayJobById/${id}`);
    
//           setJobs(response?.data);
//         } catch (error) {
//           toast.error(
//             error.response?.data?.message || "Error fetching job details"
//           );
//         }
//       };
    
//       useEffect(() => {
//         fetchJobDetails();
//       }, [id]);
    
//       const tabs = [
//         {
//           title: "View Job Details",
//           tab: "jobs",
//           icon: <BriefcaseIcon className="w-4 h-4" />,
//         },
//         {
//           title: "Recommended Freelancers",
//           tab: "recommended",
//           icon: <UsersIcon className="w-4 h-4" />,
//         },
//         {
//           title: "Proposals",
//           tab: "proposal",
//           icon: <DocumentTextIcon className="w-4 h-4" />,
//         },
//         {
//           title: "Hired",
//           tab: "hire",
//           icon: <DocumentTextIcon className="w-4 h-4" />,
//         },
//       ];
    
//       const handleViewModal = (proposal) => {
//         setSelectedJob(proposal);
//         setShowModal(true);
//       };
//   return (
//     <div>

// <div className="w-full lg:w-64 shrink-0">
//           <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20">
//             {tabs.map(({ title, tab, icon }, index) => (
//               <button
//                 key={index}
//                 className={`flex items-center w-full px-4 py-3 text-left transition-colors duration-200 ${
//                   activeTab === tab
//                     ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-medium"
//                     : "text-gray-700 hover:bg-gray-50"
//                 }`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 <span className="mr-3">{icon}</span>
//                 <span>{title}</span>
//                 {activeTab === tab && (
//                   <ChevronRightIcon className="w-4 h-4 ml-auto" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {activeTab === "proposal" && (
//                     <div className="space-y-6">
//                       <h2 className="text-xl font-semibold mb-4">
//                         Proposals ({jobs?.proposals.length})
//                       </h2>
        
//                       <div className="space-y-4">
//                         {jobs?.proposals.map((proposal) => (
//                           <div
//                             key={proposal.id}
//                             className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                           >
//                             <div className="flex justify-between items-start">
//                               <h3 className="font-medium text-lg">
//                                 {proposal.freelancer}
//                               </h3>
//                               <span className="text-sm text-gray-500">
//                                 {proposal.submittedOn
//             ? formatDistanceToNow(new Date(proposal.submittedOn), { addSuffix: true })
//             : "Unknown"}
//                               </span>
//                             </div>
        
//                             <div className="mt-2">
//                               <span className="font-bold text-gray-900">
//                                 {formatNaira(proposal.bidAmount)}
//                               </span>
//                             </div>
        
//                             <div className="mt-3">
//                               <p className="text-gray-700 line-clamp-3">
//                                 {proposal.coverLetter}
//                               </p>
//                             </div>
        
//                             <div className="mt-4 flex justify-end space-x-4">
//                               <button onClick={() => handleViewModal(proposal)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
//                                 View Details
//                               </button>
        
//                               <button className=" bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
//                                 Hire
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       {showModal && <ViewProposal jobdata={selectedJob} onClose={() => setShowModal(false)} />}
//                     </div>
//                   )}
//     </div>
//   )
// }
