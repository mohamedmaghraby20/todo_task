"use client"

import useTodoStore from '@/store/todoStore';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error } = useTodoStore();

  if (loading && todos.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;