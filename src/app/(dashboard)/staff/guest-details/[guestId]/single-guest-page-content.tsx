"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { deleteGuest, fetchGuestById } from "@/lib/queries"



export default function SingleGuestPageContent() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: guest, isLoading } = useQuery({
    queryKey: ['guest', params.guestId],
    queryFn: () => fetchGuestById(params.guestId as string),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests-list'] })
      queryClient.invalidateQueries({ queryKey: ['guests-stats'] })
      router.push('/staff/guest-details')
      toast({ title: "Guest deleted successfully" })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete guest",
        variant: "destructive"
      })
    }
  })

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (!guest) return <div className="flex justify-center items-center h-screen">Guest not found</div>

  return (
    <div className=" min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center mb-6 p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Guest Details</h1>
          <Button 
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete Guest
          </Button>
        </div>

        <div className="space-y-6 p-6">
          {[
            { label: "Guest ID", value: guest.guestId },
            { label: "Guest Count", value: guest.count },
            { label: "Phone Number", value: guest.phoneNo },
            { label: "Check In", value: new Date(guest.checkIn).toLocaleDateString() },
            { label: "Check Out", value: new Date(guest.checkOut).toLocaleDateString() },
            { label: "Booked By", value: guest.user.username },
          ].map((item, index) => (
            <div key={index} className="flex border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-600 w-1/3">{item.label}:</p>
              <p className="text-gray-800 w-2/3">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-800">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete the guest record.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(params.guestId as string)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    //TODO : ADD EDIT MODE
  )
}

