import { CheckCircle, Clock, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const statusIcon = {
  completed: <CheckCircle className="w-5 h-5 text-green-600" />,
  in_progress: <Clock className="w-5 h-5 text-yellow-500" />,
  not_started: <Circle className="w-5 h-5 text-gray-300" />,
};

const statusLabel = {
  completed: "Completed",
  in_progress: "In Progress",
  not_started: "Not Started",
};

export default function AuthorPipeline({ phases, authorTasks, getPhaseStatus, calculatePhaseProgress, onPhaseClick }) {
  return (
    <div className="space-y-4">
      {phases.map((phase) => {
        const status = getPhaseStatus(phase.id);
        const progress = calculatePhaseProgress(phase.id);
        return (
          <Card
            key={phase.id}
            className="cursor-pointer hover:shadow-md transition-shadow border-red-100"
            onClick={() => onPhaseClick(phase)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {statusIcon[status]}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{phase.name}</p>
                    <p className="text-sm text-gray-500">{statusLabel[status]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-32 bg-gray-100 rounded-full h-2 hidden sm:block">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-10 text-right">{progress}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
