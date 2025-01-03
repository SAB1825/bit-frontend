'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <motion.div 
        className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">
            Your account is not authorized to access this application. Please contact your administrator.
          </p>
          <Link href="/sign-in">
            <motion.button
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Sign In
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}