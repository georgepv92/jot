"use client"

import { useEffect } from 'react'
import { useTaskStore } from '@/lib/store'

export function LayoutWrapper({ 
  children,
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  useEffect(() => {
    console.log('LayoutWrapper mounted, loading tasks...')
    useTaskStore.getState().loadTasks()
  }, [])

  return (
    <body className={className}>
      {children}
    </body>
  )
} 