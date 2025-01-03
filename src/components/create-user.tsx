"use client"

import { PropsWithChildren, useState } from 'react'
import { Modal } from './modal'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from '@/hooks/use-toast'
import { ClipboardCopy } from 'lucide-react'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const CreateStaffForm = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formLink, setFormLink] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { toast } = useToast()

  const generateForm = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/forms/create-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      console.log('Backend response:', data) 
      if (data.success) {
        setFormLink(data.formUrl)
        toast({
          title: "Form created successfully",
          description: "You can now share this link with the staff member"
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error: unknown) {
      console.error('Error generating form:', error) 
      toast({
        title: "Error creating form",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive"
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formLink)
    toast({
      title: "Link copied to clipboard"
    })
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Create Staff Form</h2>
          <Input 
            type="email" 
            placeholder="Enter staff email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p  className="text-sm text-muted-foreground mb-2">*Note: Make sure that email is correct*</p>
          <Button onClick={generateForm} className="w-full">
            Generate Form Link
          </Button>
          {formLink && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Share this link with the staff member:</p>
              <div className="flex items-center space-x-2 bg-muted p-2 rounded">
                <code className="text-xs sm:text-sm flex-1 break-all">{formLink}</code>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="shrink-0">
                  <ClipboardCopy className="h-4 w-4" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              </div>
                <p  className="text-sm text-muted-foreground mb-2">This is the only time you can see the link once you close this you cant get the link.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default CreateStaffForm

