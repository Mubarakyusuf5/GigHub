import { HiredFreelancerCard } from "./hire"

export default function HiredFreelancersSection() {
  // Sample data
  const hiredFreelancers = [
    {
      id: "hire-1",
      freelancer: {
        id: "freelancer-1",
        fullname: "Alex Johnson",
        title: "Senior Web Developer",
        rating: 4.8,
      },
      hiredOn: "2023-05-15T10:30:00Z",
      bidAmount: 2500,
      coverLetter:
        "I'm excited to work on your project. With over 8 years of experience in web development, I've successfully delivered similar projects for clients in your industry. My approach focuses on clean code, responsive design, and performance optimization. I'm confident I can exceed your expectations and deliver a high-quality solution within your timeline.",
    },
  ]

  const handleRemove = (id) => {
    console.log(`Remove freelancer with ID: ${id}`)
  }

  const handleViewDetails = (id) => {
    console.log(`View details for freelancer with ID: ${id}`)
  }

  const handleReview = (id) => {
    console.log(`Review freelancer with ID: ${id}`)
  }

  const handleMessage = (id) => {
    console.log(`Message freelancer with ID: ${id}`)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Hired Freelancers</h2>

      <div className="space-y-6">
        {hiredFreelancers.map((hire) => (
          <HiredFreelancerCard
            key={hire.id}
            hire={hire}
            onRemove={handleRemove}
            onViewDetails={handleViewDetails}
            onReview={handleReview}
            onMessage={handleMessage}
          />
        ))}
      </div>
    </div>
  )
}
