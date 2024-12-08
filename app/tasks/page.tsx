'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useTaskStore } from '@/lib/store'

export default function Tasks() {
  const { tasks, addTask, toggleTask } = useTaskStore()
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() => {
    console.log('Current tasks:', tasks)
  }, [tasks])

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    console.log('Attempting to add task:', newTaskTitle)
    
    try {
      await addTask({ 
        title: newTaskTitle,
        completed: false,
        date: new Date().toISOString(),
        category: 'default'
      })
      console.log('Task added successfully')
    } catch (error) {
      console.error('Error adding task:', error)
    }

    setNewTaskTitle('')
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold mb-8 text-black">Tasks</h1>
          <form onSubmit={handleAddTask} className="mb-4">
            <input
              type="text"
              placeholder="New task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black placeholder-gray-500"
            />
            <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Task
            </button>
          </form>
          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={`${task.completed ? 'line-through' : ''} text-black`}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

