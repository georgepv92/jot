'use client'

import { NavBar } from '@/components/nav-bar'
import { useTaskStore } from '@/lib/store'
import { Card } from "@/components/ui/card"
import { 
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Legend
} from "recharts"
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay } from 'date-fns'

const categories = [
  { id: '1', name: 'Trading', color: '#3B82F6' },
  { id: '2', name: 'Crypto', color: '#10B981' },
  { id: '3', name: 'Wedding', color: '#EC4899' },
  { id: '4', name: 'Personal', color: '#8B5CF6' },
  { id: '5', name: 'Miles', color: '#F59E0B' },
  { id: '6', name: 'Coding', color: '#EF4444' },
]

export default function Analyze() {
  const tasks = useTaskStore((state) => state.tasks)
  
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  // Category breakdown data
  const categoryData = categories.map(category => ({
    name: category.name,
    value: tasks.filter(task => task.category === category.id).length,
    color: category.color
  })).filter(category => category.value > 0)

  // Weekly progress data
  const today = new Date()
  const weekStart = startOfWeek(today)
  const weekEnd = endOfWeek(today)
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const weeklyData = weekDays.map(day => ({
    name: format(day, 'EEE'),
    completed: tasks.filter(task => 
      task.status === 'completed' && 
      task.dueDate && 
      isSameDay(new Date(task.dueDate), day)
    ).length,
    total: tasks.filter(task => 
      task.dueDate && 
      isSameDay(new Date(task.dueDate), day)
    ).length
  }))

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-montserrat font-bold italic text-black mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <DashboardCard title="Total Tasks" value={totalTasks.toString()} />
          <DashboardCard title="Completed Tasks" value={completedTasks.toString()} />
          <DashboardCard title="Overall Completion Rate" value={`${completionRate}%`} />
          <DashboardCard title="In Progress" value={tasks.filter(task => task.status === 'in-progress').length.toString()} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-montserrat font-semibold italic mb-6 text-black">Category Breakdown</h2>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value})`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <h2 className="text-xl font-montserrat font-semibold italic mb-6 text-black">Weekly Progress</h2>
            <div className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" name="Completed" fill="#0EA5E9" />
                  <Bar dataKey="total" name="Total Tasks" fill="#E2E8F0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value }) {
  return (
    <div className="p-6 rounded-lg border bg-white shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-montserrat font-medium italic text-black mb-2">{title}</h2>
      <p className="text-3xl font-montserrat font-bold italic text-black">{value}</p>
    </div>
  )
}

