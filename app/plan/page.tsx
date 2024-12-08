'use client'

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { NavBar } from '@/components/nav-bar'
import { useTaskStore, Task } from '@/lib/store'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  color: string
}

const categories: Category[] = [
  { id: '1', name: 'Trading', color: 'bg-blue-500' },
  { id: '2', name: 'Crypto', color: 'bg-green-500' },
  { id: '3', name: 'Wedding', color: 'bg-pink-500' },
  { id: '4', name: 'Personal', color: 'bg-purple-500' },
  { id: '5', name: 'Miles', color: 'bg-yellow-500' },
  { id: '6', name: 'Coding', color: 'bg-red-500' },
]

export default function Plan() {
  const [newTask, setNewTask] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [date, setDate] = useState<Date | undefined>()
  const addTask = useTaskStore((state) => state.addTask)
  const router = useRouter()

  const handleAddTask = () => {
    if (newTask.trim() !== '' && selectedCategory !== '') {
      addTask({
        title: newTask,
        date: date ? date.toISOString() : new Date().toISOString(),
        category: selectedCategory,
        completed: false
      })
      
      setNewTask('')
      setSelectedCategory('')
      setDate(undefined)
      router.push('/track')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-montserrat font-bold italic text-black mb-8">New Task</h1>
        <div className="bg-white rounded-lg border shadow-md p-6">
          <Input 
            placeholder="What needs to be done?" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="text-lg font-montserrat italic mb-6"
          />
          <div className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
                  {date ? format(date, "MMM d, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="p-2"
                  classNames={{
                    caption: "flex justify-center py-2 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    head_row: "grid grid-cols-7 mb-1",
                    head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] text-center",
                    row: "grid grid-cols-7 mt-2",
                    cell: "h-8 w-8 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            onClick={handleAddTask}
            className="w-full bg-black hover:bg-gray-800 text-white font-montserrat italic rounded-full mt-6 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  )
}

