"use client"
import useTodoStore from '@/store/todoStore';
import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

const TodoList = ({ onCreateTask }) => {
  const { todos, loading, error } = useTodoStore();

  if (loading && todos.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-danger-600 text-sm">Error: {error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return <EmptyState onCreateTask={onCreateTask} />;
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
