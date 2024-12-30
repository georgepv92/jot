'use client'

import { useState } from 'react'
import { Filter, Trash2, MoreHorizontal, Calendar as CalendarIcon, Pencil } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
  const { tasks, toggleTask, deleteTask, updateTask } = useTaskStore()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editDate, setEditDate] = useState<Date>()
  const [editCompleted, setEditCompleted] = useState(false)

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditCategory(task.category)
    setEditDate(new Date(task.date))
    setEditCompleted(task.completed)
  }

  const handleUpdate = async () => {
    if (!editingTask) return

    await updateTask(editingTask.id, {
      title: editTitle,
      category: editCategory,
      date: editDate?.toISOString() || editingTask.date,
      completed: editCompleted,
    })

    setEditingTask(null)
  }

  const formatDate = (date: string) => {
    if (!date) return "No due date"
    return format(new Date(date), "MMM d, yyyy") 
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
          <div className="grid grid-cols-4 gap-4 p-4 border-b font-montserrat italic text-sm font-medium text-gray-600">
            <div>Task</div>
            <div>Category</div>
            <div>Date</div>
            <div>Status</div>
          </div>
          {tasks.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-montserrat italic">
              No tasks to display
            </div>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-4 gap-4 p-4 items-center">
                    <div className="font-montserrat font-medium">{task.title}</div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${categories.find(c => c.id === task.category)?.color}`} />
                      <span className="font-montserrat italic text-sm">
                        {categories.find(c => c.id === task.category)?.name}
                      </span>
                    </div>
                    <div className="font-montserrat italic text-sm">
                      {formatDate(task.date)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`font-montserrat italic text-sm ${task.completed ? 'text-green-600' : 'text-yellow-600'}`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(task)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
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
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-montserrat italic">Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Task title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="font-montserrat italic"
            />
            <Select value={editCategory} onValueChange={setEditCategory}>
              <SelectTrigger className="font-montserrat italic">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="font-montserrat italic"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${category.color}`} />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full font-montserrat italic justify-start text-left">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editDate ? format(editDate, "MMM d, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editDate}
                  onSelect={setEditDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="status"
                checked={editCompleted}
                onCheckedChange={(checked) => setEditCompleted(checked as boolean)}
              />
              <label
                htmlFor="status"
                className="text-sm font-montserrat italic"
              >
                Mark as completed
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setEditingTask(null)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

