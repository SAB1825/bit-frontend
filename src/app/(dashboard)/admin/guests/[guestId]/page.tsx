import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import AdminSingleGuestPageContent from './admin-single-guest-page'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title="Guests">
            <AdminSingleGuestPageContent />
            </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default page