export default function GanttTimeline({ phases, authorTasks, workflowTasks, author, onUpdate }) {
  const getPhaseProgress = (phaseId) => {
    const phaseTasks = workflowTasks.filter(wt => wt.phase_id === phaseId);
    if (phaseTasks.length === 0) return 0;
    const completed = phaseTasks.filter(wt => {
      const at = authorTasks.find(a => a.task_id === wt.id);
      return at?.status === 'Completed';
    }).length;
    return Math.round((completed / phaseTasks.length) * 100);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 mb-4">{author.name} - Publishing Timeline</h3>
      {phases.map((phase, index) => {
        const progress = getPhaseProgress(phase.id);
        const taskCount = workflowTasks.filter(wt => wt.phase_id === phase.id).length;
        return (
          <div key={phase.id} className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-800">{phase.name}</span>
                <span className="text-xs text-gray-500">{progress}% ({taskCount} tasks)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${progress === 100 ? 'bg-green-500' : 'bg-red-600'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
