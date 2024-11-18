import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { handleToastError, handleToastSuccess } from '../utils/toast'

const Navbar = () => {
  
  const [username, setUsername] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const token = Cookies.get('token')
    const name = Cookies.get('username')
    if (!token || !name) {
      setIsLoggedIn(false)
      setUsername(null)
      Cookies.remove('token')
      Cookies.remove('username')
      handleToastError('Please login') 
      navigate('/login')
    } else {
      setUsername(name)
      try {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/check`, {headers : {'authorization' : token}})
        
        setIsLoggedIn(true)
        
      } catch (error: any) {
        setIsLoggedIn(false)
        if (error.response.data.message === "Token is required" || error.response.data.message === "Invalid token") {
          console.error('Token is required')
          handleToastError('Please Login again')
          navigate('/login')
      } else {
          console.error("Error Check Login", error)
          handleToastError('Failed to check Login, please try again')
      }
      }
    }
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('name')
    setIsLoggedIn(false)
    setUsername(null)
    handleToastSuccess('Successfully logged out')
    navigate('/login')
  }

  return (
    <>
      {isLoggedIn !== null ? (
        <div className="pb-20">
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/cloud.svg" className="h-8" alt="Pure Air Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Pure Air
              </span>
            </a>
    
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <span className="mr-5 text-white">Welcome back, {username}</span>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 dark:text-white md:dark:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <span>
                  <Link
                    to="/login"
                    className="ml-5 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Login
                      </Link>
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
    ) : null}
    </>
  )
}

export default Navbar