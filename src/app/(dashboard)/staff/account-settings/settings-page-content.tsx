"use client"
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { handleLogout } from '@/lib/queries'
import React from 'react'

const SettingsPageContent = () => {
  return (
    <div className=" flex p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold ">Logout</CardTitle>
          <CardDescription className="">
            Are you sure you want to logout?
          </CardDescription>
        </div>
        <div className="flex justify-center">
          <Button 
            
            onClick={() => handleLogout()}
            className="w-full max-w-[200px]"
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPageContent