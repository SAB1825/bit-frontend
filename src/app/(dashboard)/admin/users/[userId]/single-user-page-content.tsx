"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { fetchUserById, deleteUser } from "@/lib/queries"
import { Trash2 } from "lucide-react"

export default function SingleUserPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', params.userId],
    queryFn: () => fetchUserById(params.userId as string),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-list'] })
      router.push('/admin/users')
      toast({ title: "User deleted successfully" })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete user",
        variant: "destructive"
      })
    }
  })

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse text-gray-600">Loading...</div>
    </div>
  )
  
  if (!user) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-gray-600">User not found</div>
    </div>
  )

  const userDetails = [
    { label: "Email", value: user.email },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Role", value: user.role },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Department", value: user.department },
    { label: "Quarter Number", value: user.quarterNumber },
    { label: "Quarter Name", value: user.quarterName },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-white border-b">
          <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
          <Button 
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border-0"
          >
            <Trash2 className="w-4 h-4" />
            Delete User
          </Button>
        </div>

        <div className="divide-y divide-gray-100">
          {userDetails.map((item, index) => (
            <div 
              key={index} 
              className="flex px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <dt className="w-1/3 flex-shrink-0 text-sm font-medium text-gray-500">
                {item.label}
              </dt>
              <dd className="w-2/3 text-sm text-gray-900">
                {item.value || "—"}
              </dd>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white max-w-md rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900">
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-white border-gray-200 text-gray-600 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(params.userId as string)}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}