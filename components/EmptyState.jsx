import { Plus, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';

const EmptyState = ({ onCreateTask }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
        <ClipboardList className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Create your first task to achieve more
      </p>
      <Button onClick={onCreateTask}>
        <Plus className="w-4 h-4" />
        Create task
      </Button>
    </div>
  );
};

export default EmptyState;
