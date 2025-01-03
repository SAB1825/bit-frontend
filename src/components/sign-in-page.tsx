'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const images = [
  "01.jpg",
  
]
const API_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;

export const SignInPage = () => {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`${API_BASE_URL}/auth/check`, { credentials: 'include' })
      if (response.ok) {
        router.push('/staff')
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google?redirect=/user`
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="hidden md:block md:w-[60%] relative overflow-hidden shadow-2xl">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={img}
              alt={`BIT Campus ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold text-white mb-2">Bannari Amman Institute of Technology</h3>
              <p className="text-xl text-gray-200">Empowering minds, shaping futures</p>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full bg-white`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{
                scale: index === currentImageIndex ? 1 : 0.8,
                opacity: index === currentImageIndex ? 1 : 0.6,
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      <div className="w-full md:w-[40%] flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back</h2>
            <p className="text-xl text-gray-600">Please sign in to continue.</p>
          </div>
          <motion.button
            onClick={handleLogin}
            className="w-full flex items-center justify-center bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg px-6 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-8 w-8 mr-4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48">
              <defs>
                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible"/>
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
            </svg>
            Sign in with Google
          </motion.button>
          <div className="mt-8">
            <p className="text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300">
                Contact your administrator
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

