import { create } from "zustand";
import axios, { head } from "axios";


const BACKEND_URL ="https://stunning-couscous-pq97w54grjrf7g55-3000.app.github.dev"
axios.defaults.withCredentials = true;
interface UserState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axios.post<{ token2: string }>(`${BACKEND_URL}/api/v1/login`, { email, password });
      // set({ token: response.data.token2 });
      console.log("Login successful:", response.data.token2);
      // localStorage.setItem("token", response.data.token2);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
    set({ loading: false });
  },

  register: async (username, email, password) => {
    set({ loading: true });
    try {
      await axios.post(`${BACKEND_URL}/api/v1/register`, 
        { username, email, password  }
      );
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
    set({ loading: false });
  },

  logout: () => {
    set({ token: null });
    localStorage.removeItem("token");
  },
}));