'use client'

import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import SingleComplaintPageContent from './single-complaint-page-content'
import { fetchComplaint } from '@/lib/queries'



export default function ComplaintPage() {
  const params = useParams()
  const complaintId = params.complaintId as string

  const { data: complaint, isLoading, error } = useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => fetchComplaint(complaintId),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading complaint</div>
  if (!complaint) return <div>Complaint not found</div>

  return (
    <ProtectedRoute>
        <DashboardPage title={complaint.title}>
            <SingleComplaintPageContent />
        </DashboardPage>
    </ProtectedRoute>
  )
}