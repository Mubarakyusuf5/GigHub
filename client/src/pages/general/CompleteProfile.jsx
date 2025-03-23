import React from 'react'
import { FrlncrKYC } from '../freelancer/FrlncrKYC'
import { ClientKYC } from '../client/ClientKYC'

export const CompleteProfile = () => {
  // const { user } = useAuth()
  const user = "Client"
  return (
    <div>
      {user === "Freelancer" && <FrlncrKYC />}
      {user === "Client" && <ClientKYC />}
    </div>
  )
}
