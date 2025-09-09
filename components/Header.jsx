import { CirclePlus, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header = ({ onCreateTask, searchValue, onSearchChange }) => {
  return (
    <div className="space-y-6">
      {/* App Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-primary-600 rounded-lg p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Todo Task</h1>
        </div>
        </div>

      {/* Search and Create */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onCreateTask} className="cursor-pointer">
         <CirclePlus />
        </Button>
      </div>
    </div>
  );
};

export default Header;
