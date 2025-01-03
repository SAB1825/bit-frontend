'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Edit } from "lucide-react"
import { Complaint, ComplaintFormData } from "@/types/complaints"
import { useToast } from "@/hooks/use-toast"

interface EditComplaintModalProps {
  complaint: Complaint
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const updateComplaint = async (complaintId: string, data: ComplaintFormData): Promise<Complaint> => {
  const response = await fetch(`${API_BASE_URL}/complaints/${complaintId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('Failed to update complaint')
  return response.json()
}

export function EditComplaintModal({ complaint }: EditComplaintModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<ComplaintFormData>({
    title: complaint.title,
    description: complaint.description,
    status: complaint.status,
    availableDate: complaint.availableDate,
    availableTime: complaint.availableTime,
  })

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: ComplaintFormData) => updateComplaint(complaint.complaintId, data),
    onSuccess: () => {
      setOpen(false)
      toast({
        title: "Complaint updated successfully",
      })
      queryClient.invalidateQueries({ queryKey: ['complaint', complaint.complaintId] })
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating complaint",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit className="h-4 w-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Complaint</DialogTitle>
          <DialogDescription>
            Make changes to your complaint here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'pending' | 'in-progress' | 'resolved') => 
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableDate">Available Date</Label>
            <Input
              id="availableDate"
              type="date"
              value={formData.availableDate.split('T')[0]}
              onChange={(e) => setFormData(prev => ({ ...prev, availableDate: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="availableTime">Available Time</Label>
            <Input
              id="availableTime"
              type="time"
              value={formData.availableTime}
              onChange={(e) => setFormData(prev => ({ ...prev, availableTime: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}