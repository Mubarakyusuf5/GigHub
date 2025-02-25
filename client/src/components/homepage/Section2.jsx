import { GlobeAltIcon, PhoneIcon, ShieldCheckIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const Section2 = () => {
  return (
    <section className="py-12 border-b ">
        <h2 className="text-3xl font-medium text-center mb-16">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: GlobeAltIcon,
              title: "Wide Talent Pool",
              description: "Access thousands of skilled professionals worldwide.",
            },
            { 
                icon: ShieldCheckIcon, 
                title: "Secure Payments", description: "Safe and hassle-free transactions." },
            { 
                icon: UserGroupIcon, 
                title: "Verified Freelancers", description: "Work with trusted experts." },
            { 
                icon: PhoneIcon, 
                title: "24/7 Support", description: "We're here to help anytime you need it." },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <item.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
  )
}
