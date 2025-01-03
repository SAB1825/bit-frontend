"use client"
import { DashboardPage } from '@/components/dashboard-page';
import ProtectedRoute from '@/components/protected-route';
import React from 'react'
import  DashboardPageContent  from './dashboard-page-content';

const page = () => {
  
  return (
    <ProtectedRoute>
      <DashboardPage title = "Dashboard">
        <DashboardPageContent />
      </DashboardPage>
    </ProtectedRoute>
  )
}

export default page
