import React, { useState } from 'react'
import SideBar from './Sidebar/SideBar'
import { useAuth } from '../../context/authContex'

function AdminMain({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const{logout} =  useAuth()
 const handleLogout = () => {
   logout()
 }
  return (
   <>
   <section className='m-1 space-y-4'>

   
 

  <header className="bg-gradient-to-r from-purple-600 to-indigo-600 border-b border-gray-200">
    <div className=" px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
          AD
        </div>
        <div>
          <p className="text-sm font-medium leading-none">Admin User</p>
          <p className="text-sm text-white">admin@example.com</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={openModal}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd"  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <nav className="space-y-2">
            <a href="#profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Profile</a>
            <a href="#reset-password" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Reset Password</a>
            <a onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Logout</a>
          </nav>
          <button
            onClick={closeModal}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </header>

   <div className='grid grid-cols-12 sideandmain gap-3  '>
<div className='grid col-span-3 bg-gray-400   rounded-xl'>

   <SideBar/>
</div>
   <div className='grid col-span-9'> 

  <main className='bg-gray-400 rounded-xl overflow-y-auto h-[635px]'>
    {children}
  </main>
   </div>
   </div>
   </section>
   </>
  )
}

export default AdminMain