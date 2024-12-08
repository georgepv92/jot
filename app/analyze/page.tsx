'use client'

import { NavBar } from '@/components/nav-bar'
import { useTaskStore } from '@/lib/store'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { startOfWeek, eachDayOfInterval, endOfWeek, format, parseISO } from 'date-fns'

const categories = [
  { id: '1', name: 'Trading', color: '#0088FE' },
  { id: '2', name: 'Crypto', color: '#00C49F' },
  { id: '3', name: 'Wedding', color: '#FFBB28' },
  { id: '4', name: 'Personal', color: '#FF8042' },
  { id: '5', name: 'Miles', color: '#8884d8' },
  { id: '6', name: 'Coding', color: '#FF6B6B' },
]

export default function Analyze() {
  const { tasks } = useTaskStore()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // Category breakdown data for pie chart
  const categoryData = categories.map(cat => ({
    name: cat.name,
    value: tasks.filter(task => task.category === cat.id).length,
    color: cat.color
  })).filter(cat => cat.value > 0)

  // Weekly completion data
  const today = new Date()
  const weekStart = startOfWeek(today)
  const weekEnd = endOfWeek(today)
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const weeklyData = weekDays.map(day => {
    const dayStr = format(day, 'yyyy-MM-dd')
    const dayTasks = tasks.filter(task => 
      format(parseISO(task.date), 'yyyy-MM-dd') === dayStr
    )
    
    return {
      day: format(day, 'EEE'),
      total: dayTasks.length,
      completed: dayTasks.filter(task => task.completed).length
    }
  })

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Category Breakdown with Pie Chart */}
          <div className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="font-montserrat italic text-lg mb-4">Category Breakdown</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Progress Graph */}
          <div className="bg-white rounded-lg border shadow-md p-6">
            <h2 className="font-montserrat italic text-lg mb-4">Weekly Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Total Tasks" fill="#8884d8" />
                  <Bar dataKey="completed" name="Completed" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

