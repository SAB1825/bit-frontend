import AdminProtectedRoute from '@/components/admin-protected-route'
import { DashboardPage } from '@/components/dashboard-page'
import React from 'react'
import { UserPageContent } from './users-page-content'
import CreateUserSteps from '@/components/create-user'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

const page = () => {
  return (
    <AdminProtectedRoute>
        <DashboardPage title='Users' cta={<CreateUserSteps>
          <Button>
            <PlusIcon />
          Create user

          </Button>
        </CreateUserSteps>}>
            <UserPageContent />
        </DashboardPage>
    </AdminProtectedRoute>
  )
}

export default page