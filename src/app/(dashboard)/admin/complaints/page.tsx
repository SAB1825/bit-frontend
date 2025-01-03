import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import { AdminComplaintPageContent } from './admin-complaint'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title="Complaints">
            <AdminComplaintPageContent />
        </DashboardPage>
    </AdminProtectedRoute>
)
}

export default page