import { X } from 'lucide-react';
import TodoForm from './TodoForm';
import { Button } from './ui/button';

const CreateTaskModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Create New Task</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <TodoForm onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
