import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";

export default function PhaseBoard({ phases, authorTasks, workflowTasks, onPhaseClick, onUpdate }) {
  const getTasksForPhase = (phaseId) => workflowTasks.filter(wt => wt.phase_id === phaseId);
  const getAuthorTask = (taskId) => authorTasks.find(at => at.task_id === taskId);

  const statusColors = {
    "Not Started": "bg-gray-100 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
  };

  const handleStatusChange = async (authorTaskId, newStatus) => {
    await supabase.from('crm_author_tasks').update({ status: newStatus }).eq('id', authorTaskId);
    onUpdate();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {phases.map(phase => {
        const phaseTasks = getTasksForPhase(phase.id);
        const completedCount = phaseTasks.filter(wt => getAuthorTask(wt.id)?.status === 'Completed').length;
        return (
          <div key={phase.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 text-sm">{phase.name}</h3>
              <span className="text-xs text-gray-500">{completedCount}/{phaseTasks.length}</span>
            </div>
            <div className="space-y-2">
              {phaseTasks.map(wt => {
                const authorTask = getAuthorTask(wt.id);
                const currentStatus = authorTask?.status || "Not Started";
                return (
                  <div key={wt.id} className="bg-white rounded p-2 border text-xs">
                    <p className="font-medium text-gray-800 mb-1">{wt.name}</p>
                    <select
                      value={currentStatus}
                      onChange={(e) => authorTask && handleStatusChange(authorTask.id, e.target.value)}
                      className={`w-full text-xs rounded px-1 py-0.5 border-0 ${statusColors[currentStatus] || statusColors["Not Started"]}`}
                    >
                      {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 text-xs text-red-600"
              onClick={() => onPhaseClick(phase)}
            >
              View Details
            </Button>
          </div>
        );
      })}
    </div>
  );
}
