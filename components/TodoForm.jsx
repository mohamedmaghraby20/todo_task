"use client"

import useTodoStore from '@/store/todoStore';
import { useState } from 'react';

const TodoForm = ({ todo, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    status: todo?.status || 'not started'
  });

  const { addTodo, updateTodo, loading } = useTodoStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    try {
      if (isEditing) {
        await updateTodo({ ...todo, ...formData });
      } else {
        await addTodo(formData);
      }
      
      if (!isEditing) {
        setFormData({ title: '', description: '', status: 'not started' });
      }
      
      if (onCancel) onCancel();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <div>
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !formData.title.trim()}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Task' : 'Add Task')}
        </button>
        
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
