"use client"

import { useState } from 'react';
import useTodoStore from '@/store/todoStore';
import TodoForm from './TodoForm';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteTodo, toggleTodoStatus, loading } = useTodoStore();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(todo.id);
    }
  };

  const handleToggleStatus = () => {
    toggleTodoStatus(todo.id);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <TodoForm
          todo={todo} 
          isEditing 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`font-medium ${todo.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {todo.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(todo.status)}`}>
              {todo.status}
            </span>
          </div>
          
          {todo.description && (
            <p className={`text-sm mb-3 ${todo.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 border-t">
        <button
          onClick={handleToggleStatus}
          disabled={loading}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            todo.status === 'completed'
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {todo.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        
        <button
          onClick={() => setIsEditing(true)}
          disabled={loading}
          className="px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
        >
          Edit
        </button>
        
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
