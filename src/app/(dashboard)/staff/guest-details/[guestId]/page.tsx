import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import React from 'react'
import SingleGuestsPageContent from './single-guest-page-content'

const page = () => {
  return (
    <ProtectedRoute>
        <DashboardPage title="Guest Details">
            <SingleGuestsPageContent />
        </DashboardPage>
    </ProtectedRoute>
  )
}

export default page