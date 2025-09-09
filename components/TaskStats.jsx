import useTodoStore from "@/store/todoStore";

const TaskStats = () => {
  const { todos } = useTodoStore();
  
  const completedCount = todos.filter(todo => todo.status === 'completed').length;
  const totalCount = todos.length;

  if (totalCount === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-3">
      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-600">
          <span className="font-medium text-success-600">{completedCount}</span> completed
        </div>
        <div className="text-gray-600">
          <span className="font-medium text-primary-600">{totalCount - completedCount}</span> remaining
        </div>
        <div className="text-gray-600">
          <span className="font-medium">{totalCount}</span> total
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
