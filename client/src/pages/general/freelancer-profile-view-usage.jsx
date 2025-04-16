import { useState } from "react"
import { ClientProfileView } from "./freelancer-profile-view"

export const ClientCard =()=> {
  const [isOpen, setIsOpen] = useState(true)

  // Sample client data
  const clientData = {
    id: "client-123",
    name: "Sarah Johnson",
    company: "Innovate Solutions Inc.",
    location: "San Francisco, CA",
    industry: "Technology",
    companySize: "50-100 employees",
    memberSince: "Jan 2021",
    about:
      "Innovate Solutions is a technology company specializing in custom software development and digital transformation. We work with talented freelancers to deliver high-quality solutions to our clients across various industries. Our focus is on creating innovative, scalable, and user-friendly applications that solve real business problems.",
    website: "https://innovatesolutions.com",
    email: "sarah.johnson@innovatesolutions.com",
    phone: "+1 (415) 555-7890",
    profilePicture: "/placeholder.svg?height=200&width=200",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/innovatesolutions",
      github: "https://github.com/innovatesolutions",
      website: "https://innovatesolutions.com",
    },
    verificationStatus: {
      payment: true,
      identity: true,
      email: true,
    },
    stats: {
      projectsPosted: 24,
      hiredFreelancers: 18,
      totalSpent: "$87,500",
      avgResponseTime: "2 hours",
      completionRate: 95,
    },
    projects: [
      {
        id: "proj-1",
        title: "E-commerce Website Redesign",
        description:
          "Looking for an experienced web designer to redesign our e-commerce platform with a focus on improving user experience and conversion rates. The project includes redesigning the homepage, product pages, checkout process, and implementing responsive design.",
        budget: "$5,000 - $7,500",
        status: "active",
        date: "Posted 2 days ago",
        applicants: 12,
        category: "Web Design",
      },
      {
        id: "proj-2",
        title: "Mobile App Development - iOS & Android",
        description:
          "We need a skilled mobile developer to create native iOS and Android applications for our existing web service. The app should include user authentication, profile management, push notifications, and core features of our platform.",
        budget: "$10,000 - $15,000",
        status: "active",
        date: "Posted 1 week ago",
        applicants: 8,
        category: "Mobile Development",
      },
      {
        id: "proj-3",
        title: "Brand Identity Design",
        description:
          "Seeking a creative graphic designer to develop a complete brand identity for our new product line. The project includes logo design, color palette, typography, and basic brand guidelines document.",
        budget: "$2,000 - $3,500",
        status: "completed",
        date: "Completed on May 15, 2023",
        applicants: 15,
        category: "Graphic Design",
      },
    ],
    reviews: [
      {
        id: "rev-1",
        freelancerName: "Michael Chen",
        freelancerAvatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        date: "June 10, 2023",
        comment:
          "Sarah and her team at Innovate Solutions were fantastic to work with. Clear requirements, prompt feedback, and timely payments. I would definitely work with them again on future projects.",
        projectTitle: "Mobile App Development",
      },
      {
        id: "rev-2",
        freelancerName: "Emily Rodriguez",
        freelancerAvatar: "/placeholder.svg?height=80&width=80",
        rating: 4,
        date: "April 22, 2023",
        comment:
          "Great client with a clear vision. Communication was excellent throughout the project. The only challenge was some scope changes midway, but we were able to accommodate them with timeline adjustments.",
        projectTitle: "Brand Identity Design",
      },
      {
        id: "rev-3",
        freelancerName: "David Wilson",
        freelancerAvatar: "/placeholder.svg?height=80&width=80",
        rating: 5,
        date: "March 5, 2023",
        comment:
          "One of the best clients I've worked with on this platform. Sarah provided detailed requirements, was responsive to questions, and paid promptly. The project was well-organized and a pleasure to work on.",
        projectTitle: "E-commerce Website Redesign",
      },
    ],
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Client Profile Demo</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
      >
        View Client Profile
      </button>

      <ClientProfileView isOpen={isOpen} onClose={() => setIsOpen(false)} client={clientData} />
    </div>
  )
}

