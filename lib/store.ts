import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from './supabase'

export interface Task {
  id: string
  title: string
  date: string
  category: string
  completed: boolean
  created_at?: string
}

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'created_at'>) => Promise<void>
  toggleTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  loadTasks: () => Promise<void>
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      loadTasks: async () => {
        console.log('Store: Loading tasks...')
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('date', { ascending: false })
        
        if (error) {
          console.error('Store: Error loading tasks:', error)
          return
        }
        
        console.log('Store: Tasks loaded:', data)
        set({ tasks: data || [] })
      },

      addTask: async (task) => {
        console.log('Store: Adding task:', task)
        try {
          const { data, error } = await supabase
            .from('tasks')
            .insert([task])
            .select()
            .single()

          if (error) {
            console.error('Store: Error adding task:', error)
            throw error
          }

          console.log('Store: Task added successfully:', data)
          set((state) => ({
            tasks: [...state.tasks, data]
          }))
        } catch (error) {
          console.error('Store: Error in addTask:', error)
          throw error
        }
      },

      toggleTask: async (id) => {
        const task = get().tasks.find((t) => t.id === id)
        if (!task) return

        const { error } = await supabase
          .from('tasks')
          .update({ completed: !task.completed })
          .eq('id', id)

        if (error) {
          console.error('Error toggling task:', error)
          return
        }

        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        }))
      },

      deleteTask: async (id) => {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('Error deleting task:', error)
          return
        }

        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id)
        }))
      },
    }),
    {
      name: 'task-store',
      onRehydrateStorage: () => {
        console.log('Store: Rehydrating...')
        return (state) => {
          console.log('Store: Rehydrated state:', state)
        }
      }
    }
  )
)

