import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import React from 'react'
import ProfilePageContent from './profile-page-content'

const ProfilePage = () => {
  return (
    <ProtectedRoute>
        <DashboardPage title='Profile'>
            <ProfilePageContent />
        </DashboardPage>
    </ProtectedRoute>
  )
}

export default ProfilePage