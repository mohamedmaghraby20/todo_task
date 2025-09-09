import { create } from 'zustand';
import { todoAPI } from '@/services/todo-api';

const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  // Fetch all todos
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await todoAPI.getAll();
      set({ todos: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add new todo
  addTodo: async (todoData) => {
    set({ loading: true, error: null });
    try {
      const response = await todoAPI.create(todoData);
      set(state => ({
        todos: [response.data, ...state.todos],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Update todo
  updateTodo: async (todoData) => {
    set({ loading: true, error: null });
    try {
      const response = await todoAPI.update(todoData);
      set(state => ({
        todos: state.todos.map(todo => 
          todo.id === todoData.id ? response.data : todo
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      await todoAPI.delete(id);
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Toggle todo status
  toggleTodoStatus: async (id) => {
    const todo = get().todos.find(t => t.id === id);
    if (!todo) return;

    const newStatus = todo.status === 'completed' ? 'not started' : 'completed';
    await get().updateTodo({ ...todo, status: newStatus });
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useTodoStore;
