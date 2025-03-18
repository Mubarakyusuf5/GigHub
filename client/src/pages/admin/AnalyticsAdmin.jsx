import React from 'react'

export const AnalyticsAdmin = () => {
  return (
    <div className='flex '>
          {/* <ChatCard /> */}
          <Sidebar />
          <div className='w-full ml-[240px]'>
            <AdminNav />
            <div className='min-h-[100vh] px-4 lg:px-8 py-8'>
          Admin Analytics
            </div>
          </div>
          </div>
  )
}
