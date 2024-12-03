'use client'

import { Filter, Trash2, MoreHorizontal, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { NavBar } from '@/components/nav-bar'
import { useTaskStore } from '@/lib/store'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const categories = [
  { id: '1', name: 'Trading', color: 'bg-blue-500' },
  { id: '2', name: 'Crypto', color: 'bg-green-500' },
  { id: '3', name: 'Wedding', color: 'bg-pink-500' },
  { id: '4', name: 'Personal', color: 'bg-purple-500' },
  { id: '5', name: 'Miles', color: 'bg-yellow-500' },
  { id: '6', name: 'Coding', color: 'bg-red-500' },
]

const statusColors = {
  'pending': 'text-yellow-600',
  'in-progress': 'text-blue-600',
  'completed': 'text-green-600'
}

export default function Track() {
  const { tasks, updateTaskStatus, deleteTask, updateTaskDueDate } = useTaskStore()

  const formatDate = (date: Date | null) => {
    if (!date) return "No due date"
    return format(date, "MMM d, yyyy") 
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-montserrat font-bold italic text-black">Track Tasks</h1>
          <Button variant="outline" className="font-montserrat italic rounded-full hover:bg-black hover:text-white transition-all duration-300">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        <div className="bg-white rounded-lg border shadow-md overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border-b font-montserrat italic text-sm font-medium text-gray-600">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition-colors">
              Task <span>↑↓</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition-colors">
              Category <span>↑↓</span>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-black transition-colors">
              Due Date <span>↑↓</span>
            </div>
            <div className="flex items-center space-x-1">
              Status
            </div>
          </div>
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-montserrat italic">
              No tasks to display
            </div>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 items-center">
                    <div className="font-montserrat font-medium">{task.title}</div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${categories.find(c => c.id === task.category)?.color}`} />
                      <span className="font-montserrat italic text-sm">{categories.find(c => c.id === task.category)?.name}</span>
                    </div>
                    <div className="font-montserrat italic text-sm">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left font-normal hover:bg-transparent p-0"
                          >
                            <span className="font-montserrat italic">
                              {formatDate(task.dueDate)}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={task.dueDate || undefined}
                            onSelect={(date) => date && updateTaskDueDate(task.id, date)}
                            initialFocus
                            className="rounded-md"
                            classNames={{
                              head_cell: "font-montserrat font-medium text-sm text-gray-500 w-9",
                              cell: "font-montserrat text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                              day_selected: "bg-black text-white hover:bg-black hover:text-white focus:bg-black focus:text-white",
                              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                              table: "w-full border-collapse",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center justify-between">
                      <DropdownMenu>
                        <DropdownMenuTrigger className={`font-montserrat italic text-sm ${statusColors[task.status]}`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'pending')}>
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'in-progress')}>
                            In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateTaskStatus(task.id, 'completed')}>
                            Completed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

