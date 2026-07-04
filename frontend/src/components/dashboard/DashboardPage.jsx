import { RefreshCw, BookMarked, Loader2, ArrowRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function DashboardPage({ error, loading, pathways, studentId, onRefresh }) {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-min-structure-light">
        <div>
          <h2 className="text-3xl font-semibold text-min-text-main">Student Dashboard</h2>
          <p className="text-sm text-min-text-muted mt-1">
            Viewing saved pathways for Learner #{studentId}
          </p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="min-btn-secondary text-sm h-10"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-min-accent" />
          <p className="font-medium text-min-text-muted">Loading your pathways...</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-center">
          <StatusText tone="error">Unable to load saved pathways. {error}</StatusText>
        </div>
      )}

      {/* Pathways Grid */}
      {!loading && !error && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-min-text-main font-semibold text-lg">
            <BookMarked className="w-5 h-5 text-min-accent" />
            Your Saved Pathways
          </div>
          
          {pathways.length === 0 ? (
            <div className="min-card py-20 px-6 text-center border-dashed">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-min-structure-light">
                <BookMarked className="w-5 h-5 text-min-text-muted" />
              </div>
              <h3 className="text-lg font-medium text-min-text-main mb-2">No pathways yet</h3>
              <p className="text-sm text-min-text-muted max-w-sm mx-auto">
                Complete the discovery quiz to generate and save your first career pathway.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pathways.map((pathway) => (
                <div key={pathway.id} className="min-card p-6 flex flex-col group hover:border-min-accent transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-min-accent border border-blue-100">
                      {pathway.status}
                    </span>
                    <button className="text-min-text-muted group-hover:text-min-accent transition-colors" aria-label="View details">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-min-text-main mb-2">
                    {pathway.title}
                  </h3>
                  
                  <p className="text-sm text-min-text-muted mb-6 flex-1 line-clamp-3">
                    {pathway.description}
                  </p>
                  
                  {pathway.recommendation_summary && (
                    <div className="pt-4 border-t border-min-structure-light mt-auto">
                      <p className="text-xs font-semibold text-min-text-main uppercase tracking-wider mb-2">Summary</p>
                      <p className="text-sm text-min-text-muted line-clamp-2">
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
