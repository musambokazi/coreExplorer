import { RefreshCw, BookMarked, Loader2, ArrowRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function DashboardPage({ error, loading, pathways, studentId, onRefresh }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-gray-200/60 shadow-sm">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-deep">Student Dashboard</h2>
          <p className="text-gray-500 font-medium mt-1">Viewing saved pathways for Learner #{studentId}</p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="btn-secondary px-5 py-2.5 text-sm flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-indigo" />
          <p className="font-medium text-sm">Loading your pathways...</p>
        </div>
      )}
      
      {error && (
        <div className="glass-panel p-6 rounded-2xl border-red-200 bg-red-50/50 flex flex-col items-center text-center">
          <StatusText tone="error">Unable to load saved pathways. {error}</StatusText>
        </div>
      )}

      {/* Pathways Grid */}
      {!loading && !error && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-brand-deep font-bold text-xl px-2">
            <BookMarked className="w-6 h-6 text-brand-indigo" />
            Your Saved Pathways
          </div>
          
          {pathways.length === 0 ? (
            <div className="glass-panel p-12 rounded-3xl text-center border-dashed border-2 border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookMarked className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No pathways yet</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Complete the discovery quiz to generate and save your first career pathway.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pathways.map((pathway) => (
                <div key={pathway.id} className="glass-panel p-8 rounded-3xl group hover:border-brand-indigo/30 transition-all cursor-default">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-50 text-green-600 border border-green-100">
                      {pathway.status}
                    </span>
                    <button className="text-gray-400 hover:text-brand-indigo transition-colors" aria-label="View details">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-deep mb-2">{pathway.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-6">{pathway.description}</p>
                  
                  {pathway.recommendation_summary && (
                    <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Recommendation Summary</p>
                      <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                        {pathway.recommendation_summary}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
