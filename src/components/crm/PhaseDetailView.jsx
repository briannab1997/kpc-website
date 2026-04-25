import { supabase } from "@/api/supabaseClient";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Completed": "bg-green-100 text-green-700",
  "Blocked": "bg-red-100 text-red-700",
};

export default function PhaseDetailView({ phase, author, authorTasks, workflowTasks, onClose, onUpdate }) {
  const phaseTasks = workflowTasks.filter(wt => wt.phase_id === phase.id);

  const handleStatusChange = async (authorTaskId, newStatus) => {
    await supabase.from('crm_author_tasks').update({ status: newStatus }).eq('id', authorTaskId);
    onUpdate();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{phase.name}</h2>
            <p className="text-gray-500 text-sm">{author.name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {phaseTasks.map(wt => {
            const authorTask = authorTasks.find(at => at.task_id === wt.id);
            const currentStatus = authorTask?.status || "Not Started";
            return (
              <div key={wt.id} className="flex items-center justify-between p-4 border rounded-lg">
                <p className="font-medium text-gray-800">{wt.name}</p>
                <select
                  value={currentStatus}
                  onChange={(e) => authorTask && handleStatusChange(authorTask.id, e.target.value)}
                  className={`text-sm rounded-full px-3 py-1 border-0 font-medium ${statusColors[currentStatus] || statusColors["Not Started"]}`}
                >
                  {Object.keys(statusColors).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
