import { useEffect, useState } from "react";
import {
  XMarkIcon,
  StarIcon,
  MapPinIcon,
  BriefcaseIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export const FreelancerProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState("");
  const { user } = useAuth();
  const { id } = useParams()
  const navigate = useNavigate()
  // console.log(id)
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile/displayFrlncrProfileById/${id}`);
        setProfile(response?.data?.freelancer[0]);
        // console.log(response?.data)
      } catch (error) {
        console.log("profileFree", error);
        toast.error(
          error.response?.data?.message || "Error displaying profile!"
        );
      }
    };

    fetchProfile();
  }, [id]);


  const profileData = {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Full Stack Developer",
    rating: 4.9,
    reviews: 47,
    hourlyRate: "$45",
    location: "New York, USA",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "AWS",
      "Redux",
      "Express",
      "GraphQL",
      "Docker",
    ],
    experience: "Expert",
    completedProjects: 78,
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Full stack developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud infrastructure. I've worked with startups and enterprise clients across fintech, e-commerce, and SaaS industries.",
    languages: ["English (Native)", "Spanish (Conversational)"],
    education: [
      {
        degree: "M.S. Computer Science",
        institution: "Stanford University",
        year: "2015-2017",
      },
      {
        degree: "B.S. Computer Science",
        institution: "University of California, Berkeley",
        year: "2011-2015",
      },
    ],
    workHistory: [
      {
        title: "Senior Developer",
        company: "TechCorp Inc.",
        duration: "2019 - Present",
        description:
          "Lead developer for enterprise SaaS platform serving 50,000+ users. Implemented microservices architecture and reduced server costs by 35%.",
      },
      {
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2017 - 2019",
        description:
          "Built and scaled the company's main product from initial concept to 10,000 active users. Implemented CI/CD pipeline and automated testing.",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        description:
          "A full-featured e-commerce platform with payment processing, inventory management, and analytics dashboard.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["React", "Node.js", "MongoDB"],
      },
      {
        title: "Financial Dashboard",
        description:
          "Real-time financial analytics dashboard with data visualization and reporting features.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["React", "D3.js", "Firebase"],
      },
      {
        title: "Social Media App",
        description:
          "Mobile-first social platform with real-time messaging and content sharing.",
        image: "/placeholder.svg?height=300&width=500",
        tags: ["React Native", "GraphQL", "AWS"],
      },
    ],
    testimonials: [
      {
        client: "Sarah Miller",
        company: "DesignHub",
        content:
          "Alex delivered exceptional work on our project. His technical expertise and communication skills made the development process smooth and efficient.",
        rating: 5,
      },
      {
        client: "Michael Chen",
        company: "TechStart Inc.",
        content:
          "Working with Alex was a great experience. He understood our requirements quickly and delivered high-quality code ahead of schedule.",
        rating: 5,
      },
      {
        client: "Jessica Williams",
        company: "E-commerce Solutions",
        content:
          "Alex helped us rebuild our entire platform. His attention to detail and problem-solving skills were invaluable to our project's success.",
        rating: 4.8,
      },
    ],
    availability: "Available (20-30 hrs/week)",
    responseTime: "Usually responds within 2 hours",
    memberSince: "January 2019",
    lastActive: "2 hours ago",
    successRate: 95,
    onTimeDelivery: 98,
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      website: "https://alexjohnson.dev",
    },
  };

  const stats = [
    { title: "Experience Level", Icon: BriefcaseIcon },
    { title: "Projects Completed", Icon: BriefcaseIcon },
    { title: "Success Rate", Icon: CheckCircleIcon },
    { title: "On-time Delivery", Icon: ClockIcon },
  ];
  const tabs = [
    {
      title: "Overview",
      tab: "overview",
    },
    {
      title: "Reviews",
      tab: "reviews",
    },
  ];

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return stars;
  };

  const navi = ()=>{
    navigate("/account-settings/profile")
  }

  return (
    <div>
      <div>
        <div className="bg-white rounded-xl overflow-hidden relative">
          {/* Profile header */}
          <div className="bg-gray-50 h-32 relative border-b border-gray-200">
            <div className="absolute -bottom-16 left-8 sm:left-10">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    profile?.profilePicture
                  }`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile content */}
          <div className="pt-20 px-6 sm:px-10 pb-10">
            {/* Basic info section */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8">
              <div>
                <div className="flex items-center mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mr-3">
                    {profile?.user?.fullname}
                  </h1>
                  <div className="flex items-center gap-2">
                    {profile?.github && (
                      <a
                        href={profile?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300"
                        title="GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {profile?.linkedin && (
                      <a
                        href={profile?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300"
                        title="LinkedIn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    {profile?.website && (
                      <a
                        href={profile?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-300"
                        title="Personal Website"
                      >
                        <GlobeAltIcon className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-lg text-gray-600 mt-1">
                  {profile?.title}
                </p>

                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {renderStars(profileData.rating)}
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {profileData.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    {profileData.reviews} reviews
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
                    {profile?.state}
                  </div>  
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  Member since {profile?.createdAt}
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                {user?.role === "Client" && (
                  <div className="flex mt-4 sm:mt-0 space-x-3">
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors duration-300">
                      <HeartIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors duration-300">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                      Message
                    </button>
                  </div>
                )}
                {user?.role === "Freelancer" && (
                  <button onClick={navi} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {stats.map(({ title, Icon }, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                >
                  <div className="flex items-center text-gray-500 mb-1">
                    <Icon className="h-4 w-4 mr-1" />
                    <span className="text-sm">{title}</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {title === "Experience Level" && profile?.experienceLevel}
                    {title === "Projects Completed" &&
                      profileData.completedProjects}
                    {title === "On-time Delivery" &&
                      `${profileData.onTimeDelivery}%`}
                    {title === "Success Rate" && `${profileData.successRate}%`}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabs navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav
                className="flex space-x-8 overflow-x-auto"
                aria-label="Profile tabs"
              >
                {tabs.map(({ title, tab }, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {title}
                    {tab === "reviews" && ` (${profileData.reviews})`}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* About section */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      About
                    </h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile?.bio}
                    </p>
                  </section>

                  {/* Skills section */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile?.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Client Reviews
                    </h2>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <div className="flex items-center mr-1">
                        {renderStars(profileData.rating)}
                      </div>
                      <span className="font-medium text-blue-700">
                        {profileData.rating}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({profileData.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {profileData.testimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {testimonial.client}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {testimonial.company}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {renderStars(testimonial.rating)}
                            <span className="ml-1 text-sm text-gray-700">
                              {testimonial.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{testimonial.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};