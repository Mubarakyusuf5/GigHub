import React from 'react'
import { ChatModal } from '../../components/modals/ChatModal'
import { useNavigate } from 'react-router-dom'
import { AnalyticsAdmin } from '../admin/AnalyticsAdmin'
import { AnalyticsClient } from '../client/AnalyticsClient'
import { AnalyticsFrlcr } from '../freelancer/AnalyticsFrlcr'

export const Analytics = () => {
  const user = "Client"
  return (
    <div className=' min-h-screen px-4 lg:px-10 py-7'>
      {/* <ChatModal /> */}
      {
        user === "Admin" && <AnalyticsAdmin /> ||
        user === "Client" && <AnalyticsClient /> ||
        user === "Freelancer" && <AnalyticsFrlcr /> ||
        user === null && <div> Unauthorized access</div>
      }
    </div>
  )
}
