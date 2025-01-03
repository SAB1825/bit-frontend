import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import React from 'react'
import SettingsPageContent from './settings-page-content'

const SettingsPage = () => {
  return (
    <ProtectedRoute>
        <DashboardPage title="Account Settings">
            <SettingsPageContent />
        </DashboardPage>

    </ProtectedRoute>
  )
}

export default SettingsPage