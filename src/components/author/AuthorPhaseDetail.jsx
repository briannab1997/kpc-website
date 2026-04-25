import { X, CheckCircle, Clock, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusIcon = {
  Completed: <CheckCircle className="w-4 h-4 text-green-600" />,
  "In Progress": <Clock className="w-4 h-4 text-yellow-500" />,
  "Not Started": <Circle className="w-4 h-4 text-gray-300" />,
};

export default function AuthorPhaseDetail({ phase, authorTasks, workflowTasks, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{phase.name}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">
          {phase.description && (
            <p className="text-gray-600 mb-6">{phase.description}</p>
          )}
          <div className="space-y-3">
            {workflowTasks.map((task) => {
              const authorTask = authorTasks.find(t => t.workflow_task_id === task.id);
              const status = authorTask?.status || "Not Started";
              return (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="mt-0.5">{statusIcon[status] || statusIcon["Not Started"]}</div>
                  <div>
                    <p className="font-medium text-gray-900">{task.name}</p>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-0.5">{task.description}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{status}</p>
                  </div>
                </div>
              );
            })}
            {workflowTasks.length === 0 && (
              <p className="text-gray-500 text-center py-8">No tasks for this phase yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
