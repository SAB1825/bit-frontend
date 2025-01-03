import { CreateGuest } from '@/components/create-guest'
import { DashboardPage } from '@/components/dashboard-page'
import ProtectedRoute from '@/components/protected-route'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React from 'react'
import { GuestPageContent } from './guest-page-content'

const GuestPage = () => {
  return (
    <ProtectedRoute>
        <DashboardPage title='Guest' cta={
          <CreateGuest>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Guest
            </Button>
          </CreateGuest>
        }>
          <GuestPageContent />
        </DashboardPage>
    </ProtectedRoute>
  )
}

export default GuestPage