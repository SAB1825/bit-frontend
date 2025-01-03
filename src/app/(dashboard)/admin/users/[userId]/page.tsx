import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import SingleUserPage from './single-user-page-content'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title='User Details'>
            <SingleUserPage />
        </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default page