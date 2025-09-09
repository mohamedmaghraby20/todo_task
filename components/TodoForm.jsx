"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema } from '@/lib/validations';
import useTodoStore from '@/store/todoStore';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const TodoForm = ({ todo, onCancel, isEditing = false }) => {
  const { addTodo, updateTodo, loading } = useTodoStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      status: todo?.status || 'not started'
    }
  });

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateTodo({ ...todo, ...data });
      } else {
        await addTodo(data);
        reset();
      }
      
      if (onCancel) onCancel();
    } catch (error) {
      // Error handled by store
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('title')}
          placeholder="Task title"
          error={errors.title}
        />
        {errors.title && (
          <p className="mt-1 text-xs text-danger-600">{errors.title.message}</p>
        )}
      </div>
      
      <div>
        <Textarea
          {...register('description')}
          placeholder="Description (optional)"
          rows="2"
          error={errors.description}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-danger-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Select
          {...register('status')}
          error={errors.status}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add Task')}
        </Button>
        
        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;
