"use client"

import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoActions from './TodoActions';
import { cn } from '@/lib/utils';
import Badge from './Badge';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border">
        <TodoForm 
          todo={todo} 
          isEditing 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              'font-medium text-sm truncate',
              todo.status === 'completed' 
                ? 'line-through text-gray-500' 
                : 'text-gray-900'
            )}>
              {todo.title}
            </h3>
            <Badge status={todo.status} />
          </div>
          
          {todo.description && (
            <p className={cn(
              'text-xs text-gray-600 line-clamp-2',
              todo.status === 'completed' && 'text-gray-400'
            )}>
              {todo.description}
            </p>
          )}
        </div>
        
        <TodoActions 
          todo={todo} 
          onEdit={() => setIsEditing(true)} 
        />
      </div>
    </div>
  );
};

export default TodoItem;
