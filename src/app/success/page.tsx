"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const RegistrationSuccess = () => {
  const handleSignIn = () => {
    window.location.href = '/signin';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Registration Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for filling out your information. Your account has been created successfully.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleSignIn}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Sign In with Email
          </Button>
          
          <p className="text-sm text-gray-500">
            You can now access your account using your email address
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegistrationSuccess;