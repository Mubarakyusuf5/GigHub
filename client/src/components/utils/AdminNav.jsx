import { BellIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const AdminNav = () => {
  return (
    <nav className='flex justify-between items-center w-full bg-white h-14 px-4 lg:px-6 sticky top-0 '>
        <h3 className='text-2xl font-bold'>Good Morning, Admin</h3>
        {/* <div>input</div> */}
        <div className='space-x-4 flex items-center'>
            <BellIcon className='h-9 w-9 p-1 bg-gray-100 transition-all duration-300 hover:bg-gray-200 text-gray-700 rounded-full cursor-pointer' />
            <div className='h-11 w-11 rounded-full bg-gray-100 cursor-pointer'></div>
        </div>
    </nav>
  )
}
