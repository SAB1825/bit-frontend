"use client"
import React from 'react';
import { useParams, useRouter } from 'next/navigation'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, UserPlus, Users } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Form schema remains the same
const formSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  phoneNumber: z.string().nonempty('Phone number is required'),
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  bloodGroup: z.string().nonempty('Blood group is required'),
  aadharNumber: z.string().nonempty('Aadhar number is required'),
  vehicleNumber: z.string().nonempty('Vehicle number is required'),
  department: z.string().nonempty('Department is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  age: z.string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().min(1)),

  quarterNumber: z.string().nonempty('Quarter number is required'),
  quarterName: z.string().nonempty('Quarter name is required'),
  inmates: z.array(
    z.object({
      name: z.string().nonempty('Name is required'),
      relation: z.string().nonempty('Relation is required'),
      age: z.string()
  .transform((val) => parseInt(val, 10))
  .pipe(z.number().min(1)),
    })
  ).nonempty('At least one inmate is required')
})
  type FormData = z.infer<typeof formSchema>
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const StaffRegister = () => {
  const { token } = useParams()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      dateOfBirth: '',
      bloodGroup: '',
      aadharNumber: '',
      vehicleNumber: '',
      department: '',
      permanentAddress: '',
      age: 0,
      quarterNumber: '',
      quarterName: '',
      inmates: [{ name: '', relation: '', age: 0 }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'inmates'
  })
  console.log(token)
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/submit/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!response.ok) throw new Error('Failed to submit form')
      router.push('/success')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Staff Registration</h2>
          </div>

          {/* Security notice using regular styling instead of Alert component */}
          <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex gap-2">
              <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-amber-800">
                <p className="font-medium">Security Notice:</p>
                <ul className="list-disc ml-4 mt-2 space-y-1 text-sm">
                  <li>Do not share this link with anyone</li>
                  <li>Complete the form in one session</li>
                  <li>Ensure all information is accurate</li>
                  <li>Keep your registration token confidential</li>
                </ul>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">First Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Blood Group</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="aadharNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Aadhar Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Vehicle Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Department</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-gray-300 focus:border-blue-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Permanent Address</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-gray-300 focus:border-blue-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quarterNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Quarter Number</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quarterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Quarter Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-300 focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900">Inmates Information</h3>
                </div>
                {fields.map((item, index) => (
                  <div key={item.id} className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`inmates.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-300 focus:border-blue-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inmates.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Relation</FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-300 focus:border-blue-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`inmates.${index}.age`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Age</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="border-gray-300 focus:border-blue-500" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={() => remove(index)}
                      className="mt-2"
                    >
                      Remove Inmate
                    </Button>
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => append({ name: '', relation: '', age: 0 })}
                  className="w-full"
                >
                  Add Another Inmate
                </Button>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit Registration
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default StaffRegister