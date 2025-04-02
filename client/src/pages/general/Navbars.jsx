import React from 'react'
import { FreelancerNavbar } from '../../components/utils/freelancer-navbar'
import { ClientNavbar } from '../../components/utils/client-navbar'
import { PaymentButton } from './Payment'

export const Navbars = () => {
  return (
    <div>
        <FreelancerNavbar />
        <ClientNavbar />
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Navbar Page</h1>
          <p className="text-gray-600">Choose a navbar from the options above.</p>
          <PaymentButton amount={100} jobId={1} clientEmail={"yusufmubarak460@gmail.com"} clientName={"Mubarak Yusuf"} />
        </div>
    </div>
  )
}
