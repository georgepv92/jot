import { create } from 'zustand'

export interface Task {
  id: string
  title: string
  category: string
  dueDate: Date | null
  status: 'pending' | 'in-progress' | 'completed'
}

interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTaskStatus: (id: string, status: Task['status']) => void
  deleteTask: (id: string) => void
  updateTaskDueDate: (id: string, date: Date | null) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTaskStatus: (id, status) => 
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, status } : task
      )
    })),
  deleteTask: (id) => 
    set((state) => ({
      tasks: state.tasks.filter(task => task.id !== id)
    })),
  updateTaskDueDate: (id, date) => 
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, dueDate: date } : task
      )
    })),
}))

