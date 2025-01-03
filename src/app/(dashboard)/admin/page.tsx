import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import AdminPageContent from './admin-page-content'

const AdminPag = () => {
  return (
    <AdminProtectedRoute>
     <DashboardPage title="Admin Dashboard">
        <AdminPageContent />
     </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default AdminPag