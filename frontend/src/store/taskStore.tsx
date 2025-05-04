import { create } from "zustand";
import axios from "axios";

interface Recurrence {
  frequency: string;
  interval: number;
  startDate: string;
  endDate?: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string;
  recurrence: Recurrence[];
}

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: number, task: Omit<Task, "id">) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ tasks: Task[] }>("/task/v1/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ tasks: response.data.tasks });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("/task/v1/create", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await get().fetchTasks(); // Refresh tasks after creation
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/task/v1/update/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await get().fetchTasks(); // Refresh tasks after update
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/task/v1/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await get().fetchTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  },
}));