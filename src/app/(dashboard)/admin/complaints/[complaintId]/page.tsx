import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import AdminSingleComplaintPageContent from './admin-single-complaint'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title="Complaints">
            <AdminSingleComplaintPageContent />a  
        </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default page