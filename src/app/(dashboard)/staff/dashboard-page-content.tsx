'use client'

import { ComplaintStats } from '@/components/complaint-stats'
import { GuestStats } from '@/components/guest-stats'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Clock, Users, FileText, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import ActivityTable from '@/components/activtiy-table'
import Link from 'next/link'
const quickActions = [
  { icon: Users, title: "View All Guests", href: "/staff/guests" },
  { icon: FileText, title: "Manage Complaints", href: "/staff/complaints" },
  { icon: Settings, title: "Settings", href: "/staff/account-settings" }
];
const DashboardPageContent = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
     
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center  p-4 rounded-lg shadow-sm"
      >
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className='font-semibold mb-4 text-lg text-gray-700'>Guest Statistics</h2>
            <GuestStats />
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className='font-semibold mb-4 text-lg text-gray-700'>Complaints Overview</h2>
            <ComplaintStats />
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">Recent Activity</h2>
          <ActivityTable />
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {quickActions.map((action, index) => (
          <QuickActionCard 
            key={index}
            icon={action.icon} 
            title={action.title} 
            href={action.href}
          />
        ))}
      </motion.div>
    </div>
  )
}
interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  href: string;
}const QuickActionCard = ({ icon: Icon, title, href }: QuickActionCardProps) => (
  <Link href={href}>
    <Card className="p-4 hover:bg-gray-100 cursor-pointer transition-colors duration-300 flex items-center space-x-3">
      <Icon className="h-6 w-6 text-gray-600" />
      <h3 className="font-semibold text-gray-700">{title}</h3>
    </Card>
  </Link>
)

export default DashboardPageContent
