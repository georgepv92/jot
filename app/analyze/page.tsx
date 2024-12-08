'use client'

import { NavBar } from '@/components/nav-bar'
import { useTaskStore } from '@/lib/store'

export default function Analyze() {
  const { tasks } = useTaskStore()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // Category breakdown data
  const categoryBreakdown = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-montserrat font-bold italic text-black mb-8">Analytics</h1>
        
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="font-montserrat italic text-lg mb-2">Total Tasks</h2>
            <p className="text-3xl font-bold">{totalTasks}</p>
          </div>
          <div className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="font-montserrat italic text-lg mb-2">Completed Tasks</h2>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>
          <div className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="font-montserrat italic text-lg mb-2">Completion Rate</h2>
            <p className="text-3xl font-bold">{completionRate}%</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg border shadow-md p-6">
          <h2 className="font-montserrat italic text-lg mb-4">Category Breakdown</h2>
          <div className="space-y-4">
            {Object.entries(categoryBreakdown).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="font-montserrat">{category}</span>
                <span className="font-montserrat font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

