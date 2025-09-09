import { Check, Edit2, Trash2, RotateCcw } from 'lucide-react';
import useTodoStore from '@/store/todoStore';
import { Button } from './ui/button';

const TodoActions = ({ todo, onEdit }) => {
  const { deleteTodo, toggleTodoStatus, loading } = useTodoStore();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(todo.id);
    }
  };

  const handleToggleStatus = () => {
    toggleTodoStatus(todo.id);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant={todo.status === 'completed' ? 'secondary' : 'success'}
        onClick={handleToggleStatus}
        disabled={loading}
      >
        {todo.status === 'completed' ? (
          <><RotateCcw className="w-3 h-3" /> Undo</>
        ) : (
          <><Check className="w-3 h-3" /> Done</>
        )}
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={onEdit}
        disabled={loading}
      >
        <Edit2 className="w-3 h-3" />
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={handleDelete}
        disabled={loading}
        className="text-danger-600 hover:text-danger-700 hover:bg-danger-50"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default TodoActions;
