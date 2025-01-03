'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Modal } from './modal'
import { PropsWithChildren } from 'react'
import { DialogTitle } from './ui/dialog'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateComplaintInput, createComplaintSchema } from '@/schemas/complaint-schema'
import { createComplaint } from '@/lib/queries'





export default function ComplaintForm({ children }: PropsWithChildren) {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      queryClient.invalidateQueries({ queryKey: ['complaintStats'] })
      setIsOpen(false)
      toast({
        title: "Created successfully",
      })
    },
    onError: (error: Error) => {
      if (error.message === 'Please login first') {
        router.push('/sign-in')
      }
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const form = useForm<CreateComplaintInput>({
    resolver: zodResolver(createComplaintSchema),
    defaultValues: {
      title: "",
      description: "",
      availableTiming: {
        date: undefined,
        time: "",
      },
    },
  })

  async function onSubmit(values: z.infer<typeof createComplaintSchema>) {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('availableDate', values.availableTiming.date.toISOString());
    formData.append('availableTime', values.availableTiming.time);
    
    if (values.image) {
      formData.append('image', values.image);
    }
    
    mutation.mutate(formData);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue('image', file)
    }
  }

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 21; hour++) {
      for (const minute of ['00', '30']) {
        const time = `${hour.toString().padStart(2, '0')}:${minute}`;
        slots.push(time);
      }
    }
    return slots;
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="max-w-2xl p-6"
      >
        <DialogTitle className="sr-only">Register a Complaint</DialogTitle>
        <div className="bg-white rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Register a Complaint</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title of your complaint" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a brief title for your complaint.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your complaint in detail"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a detailed description of your complaint.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableTiming"
                render={() => (
                  <FormItem>
                    <FormLabel>Available Date and Time for Repair</FormLabel>
                    <div className="flex flex-col space-y-4">
                      <FormField
                        control={form.control}
                        name="availableTiming.date"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                {...field}
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availableTiming.time"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time slot" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {generateTimeSlots().map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormDescription>
                      Choose a convenient date and time for the repair. Time slots are available in 30-minute intervals.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem className="space-y-2">
                <FormLabel>Upload Image (Optional)</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    <div className="flex-shrink-0">
                      {!imagePreview ? (
                        <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                          <span className="text-gray-500 text-sm">No image</span>
                        </div>
                      ) : (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription className="text-sm">
                  Upload an image related to your complaint (if applicable).
                </FormDescription>
              </FormItem>
              <div className="flex justify-end space-x-3 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Complaint
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  )
}

