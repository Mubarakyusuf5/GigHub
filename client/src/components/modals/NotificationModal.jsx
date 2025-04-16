import React from 'react'

export const NotificationModal = ({isNotify, notifyMenuRef}) => {
  return (
    <div ref={notifyMenuRef} className={`bg-white absolute top-[60px] ${isNotify ? "block" : "hidden"} border shadow-lg right-0 lg:right-3 p-2 w-[300px] rounded-md h-[200px] overflow-y-auto flex justify-center items-center`}>
        <p className='text-sm text-slate-500'>No Notifications </p>
    </div>
  )
}
