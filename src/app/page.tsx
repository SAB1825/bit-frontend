"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const Page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/sign-in')
    }, [router])
  return (
    <div className='justify-center align-center text-center'>Loading</div>
  )
}

export default Page