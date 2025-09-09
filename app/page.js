'use client';

import CreateTaskModal from '@/components/CreateTaskModal';
import Header from '@/components/Header';
import TaskStats from '@/components/TaskStats';
import TodoList from '@/components/TodoList';
import useTodoStore from '@/store/todoStore';
import { useEffect, useState } from 'react';


export default function Home() {
  const { fetchTodos, todos, error, clearError } = useTodoStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    todo.description?.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <Header
          onCreateTask={() => setShowCreateModal(true)}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-danger-50 border border-danger-200 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-danger-600 text-sm">{error}</p>
              <button
                onClick={clearError}
                className="text-danger-400 hover:text-danger-600 text-lg"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6">
          <TaskStats />
        </div>

        {/* Todo List */}
        <div className="mt-6">
          <TodoList
            todos={filteredTodos}
            onCreateTask={() => setShowCreateModal(true)}
          />
        </div>

        {/* Create Task Modal */}
        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      </div>
    </div>
  );
}