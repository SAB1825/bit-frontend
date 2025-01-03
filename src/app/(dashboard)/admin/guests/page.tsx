import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import { AdminGuestPageContent } from './admin-guest-page-content'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title="Guests">
            <AdminGuestPageContent />
        </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default page