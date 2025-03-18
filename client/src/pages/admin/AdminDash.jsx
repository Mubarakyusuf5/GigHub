import React from 'react'
import { ChatCard } from '../../components/cards/ChatCard'
import { Sidebar } from '../../components/utils/Sidebar'
import { AdminNav } from '../../components/utils/AdminNav'
import { DocumentCurrencyDollarIcon } from '@heroicons/react/24/outline'

export const AdminDash = () => {
  return (
    <div className='flex '>
      {/* <ChatCard /> */}
      <Sidebar />
      <div className='w-full ml-[240px]'>
        <AdminNav />
        <div className='min-h-[100vh] px-4 lg:px-6 py-8'>
          <div className=' rounded-md flex space-x-3 mb-7'>
            <div className='bg-purple-200 rounded-md p-3 w-full'>
              <div>
              <p>Escrow payment</p>
              <p>$40000</p>
              </div>
              <DocumentCurrencyDollarIcon className='w-6 h-6' />
            </div>
            <div className='bg-purple-200 rounded-md p-3 w-full'>
              <div>
              <p>Revenue generated</p>
              <p>$400</p>
              </div>
              <DocumentCurrencyDollarIcon className='w-6 h-6' />
            </div>
            <div className='bg-purple-200 rounded-md p-3 w-full'>
              <div>
              <p>Total Freelancers</p>
              <p>40</p>
              </div>
              <DocumentCurrencyDollarIcon className='w-6 h-6' />
            </div>
            <div className='bg-purple-200 rounded-md p-3 w-full'>
              <div>
              <p>Total Clients</p>
              <p>20</p>
              </div>
              <DocumentCurrencyDollarIcon className='w-6 h-6' />
            </div>
          </div>
      AdminDash
        </div>
      </div>
      </div>
  )
}
