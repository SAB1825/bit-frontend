'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Trash2, Clock, Calendar, User, FileText } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { EditComplaintModal } from "@/components/edit-complaint-modal"
import { deleteComplaint, fetchComplaint } from "@/lib/queries"


export default function SingleComplaintPageContent() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const complaintId = params.complaintId as string

  const { data: complaint, isLoading } = useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => fetchComplaint(complaintId),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => {
      toast({
        title: "Complaint deleted successfully",
      })
      router.push('/staff/complaints')
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      queryClient.invalidateQueries({ queryKey: ['complaintStats'] })
    },
    onError: (error) => {
      toast({
        title: "Error deleting complaint",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!complaint) {
    return <div>Complaint not found</div>
  }

  const handleDelete = () => {
    deleteMutation.mutate(complaintId)
  }

  return (
    <div className="space-y-6">
      {/* Main Complaint Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{complaint.title}</CardTitle>
              <CardDescription>Complaint ID: {complaint.complaintId}</CardDescription>
            </div>
            <Badge
              variant={
                complaint.status === "resolved"
                  ? "success"
                  : complaint.status === "in-progress"
                  ? "warning"
                  : "default"
              }
              className="text-sm"
            >
              {complaint.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4" />
              <h3 className="font-semibold">Description</h3>
            </div>
            <p className="text-sm">{complaint.description}</p>
          </div>

          {/* Image Section */}
          {complaint.imageUrl && (
            <div className="relative h-48 w-full sm:w-96">
              <Image
                src={complaint.imageUrl}
                alt="Complaint image"
                fill
                className="rounded-md object-cover"
              />
            </div>
          )}

          {/* Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">Submitted by</span>
              </div>
              <p className="font-medium">{complaint.user.username}</p>
              <p className="text-sm text-muted-foreground">{complaint.user.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Available Date</span>
              </div>
              <p className="font-medium">
                {format(new Date(complaint.availableDate), "PPP")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Available Time</span>
              </div>
              <p className="font-medium">{complaint.availableTime}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Created At</span>
              </div>
              <p className="font-medium">
                {format(new Date(complaint.createdAt), "PPP")}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <EditComplaintModal complaint={complaint} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  complaint and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      {/* Edit Modal will be added in the next step */}
    </div>
  )
}