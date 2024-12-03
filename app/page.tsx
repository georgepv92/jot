'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { NavBar } from '@/components/nav-bar'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[linear-gradient(transparent_31px,rgb(220,220,220)_1px)] bg-[size:100%_32px] bg-white">
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-[calc(60vh-4rem)] mt-12">
        <h1 className="text-5xl sm:text-6xl font-montserrat font-bold italic text-gray-800 mb-6 text-center">Time is money</h1>
        <Button 
          onClick={() => router.push('/plan')}
          className="bg-black hover:bg-gray-800 text-white font-montserrat italic text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Start now
        </Button>
      </div>
    </div>
  )
}

