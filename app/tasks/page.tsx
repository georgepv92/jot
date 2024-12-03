'use client'

import { useState, useEffect } from 'react'
import { useSupabase } from '../supabase-provider'
import Layout from '@/components/Layout'

interface Task {
  id: number
  title: string
  is_complete: boolean
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const supabase = useSupabase()

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) console.log('Error fetching tasks:', error)
    else setTasks(data || [])
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTaskTitle, is_complete: false }])
      .select()

    if (error) console.log('Error adding task:', error)
    else {
      setTasks([...tasks, ...data])
      setNewTaskTitle('')
    }
  }

  async function toggleTaskCompletion(id: number, is_complete: boolean) {
    const { error } = await supabase
      .from('tasks')
      .update({ is_complete: !is_complete })
      .eq('id', id)

    if (error) console.log('Error updating task:', error)
    else {
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, is_complete: !is_complete } : task
      ))
    }
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold mb-8 text-black">Tasks</h1>
          <form onSubmit={addTask} className="mb-4">
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
                  checked={task.is_complete}
                  onChange={() => toggleTaskCompletion(task.id, task.is_complete)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={`${task.is_complete ? 'line-through' : ''} text-black`}>{task.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

