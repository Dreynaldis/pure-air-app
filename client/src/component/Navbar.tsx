import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <div className='pb-20'>
        
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src='../../public/cloud.svg' className="h-8" alt="Pure Air Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pure Air</span>
    </a>
    
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <span>Hello, World</span>
        <span>
            <Link to="/login" className="ml-5 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Login</Link>
        </span>
    </div>
  </div>
</nav>



      </div>
  )
}

export default Navbar