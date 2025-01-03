import ComplaintForm from '@/components/create-complaint'
import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { ComplaintPageContent } from './complaint-page-content'

const page = () => {
  return (
    <ProtectedRoute>
        <DashboardPage title='Complaints' cta={
          <ComplaintForm>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Create complaint
            </Button>
          </ComplaintForm>
        }>
          <ComplaintPageContent />
        </DashboardPage>
    </ProtectedRoute>
  )
}

export default page