export default function AuthorProjectHeader({ authorRecord, overallProgress, currentPhase, totalPhases, completedPhases }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {authorRecord?.full_name || authorRecord?.name || "Your Project"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {currentPhase ? `Current phase: ${currentPhase.name}` : "Getting started"}
              {" · "}
              {completedPhases} of {totalPhases} phases complete
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-red-600">{overallProgress}%</p>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fee2e2" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="#dc2626" strokeWidth="3"
                  strokeDasharray={`${overallProgress} ${100 - overallProgress}`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
