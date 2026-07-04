import { RefreshCw, BookMarked, Loader2, ArrowRight } from "lucide-react";
import StatusText from "../ui/StatusText";

export default function DashboardPage({ error, loading, pathways, studentId, onRefresh }) {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 neo-card bg-neo-yellow p-8">
        <div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-neo-black">Student Dashboard</h2>
          <p className="text-xl font-bold mt-2 bg-white inline-block px-3 py-1 border-4 border-neo-black shadow-[2px_2px_0px_rgba(17,17,17,1)]">
            Viewing saved pathways for Learner #{studentId}
          </p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="neo-btn bg-white hover:bg-gray-100 flex items-center gap-3 text-xl disabled:opacity-50"
        >
          <RefreshCw className={`w-6 h-6 stroke-[3] ${loading ? 'animate-spin' : ''}`} />
          REFRESH
        </button>
      </div>

      {/* States */}
      {loading && (
        <div className="flex flex-col items-center justify-center p-16 space-y-6 neo-card bg-white">
          <Loader2 className="w-12 h-12 animate-spin text-neo-black stroke-[3]" />
          <p className="font-black text-2xl uppercase">Loading your pathways...</p>
        </div>
      )}
      
      {error && (
        <div className="neo-card bg-neo-pink p-8 text-center transform rotate-1">
          <StatusText tone="error">Unable to load saved pathways. {error}</StatusText>
        </div>
      )}

      {/* Pathways Grid */}
      {!loading && !error && (
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-neo-black font-black text-4xl uppercase px-2">
            <BookMarked className="w-10 h-10 stroke-[3]" />
            Your Saved Pathways
          </div>
          
          {pathways.length === 0 ? (
            <div className="neo-card bg-white p-16 text-center border-dashed border-8 border-neo-black">
              <div className="w-24 h-24 bg-neo-yellow border-4 border-neo-black flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0px_rgba(17,17,17,1)] transform -rotate-3">
                <BookMarked className="w-12 h-12 stroke-[3]" />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4">No pathways yet</h3>
              <p className="text-xl font-bold max-w-md mx-auto">
                Complete the discovery quiz to generate and save your first career pathway.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pathways.map((pathway, idx) => {
                const colors = ['bg-neo-blue', 'bg-neo-pink', 'bg-neo-green', 'bg-neo-yellow'];
                const cardColor = colors[idx % colors.length];
                
                return (
                  <div key={pathway.id} className={`neo-card ${cardColor} p-8 flex flex-col neo-card-hover`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className="inline-flex items-center px-4 py-1 font-black text-sm uppercase bg-white border-4 border-neo-black shadow-[2px_2px_0px_rgba(17,17,17,1)]">
                        {pathway.status}
                      </span>
                      <button className="bg-white p-2 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] hover:bg-neo-black hover:text-white transition-colors" aria-label="View details">
                        <ArrowRight className="w-6 h-6 stroke-[3] -rotate-45" />
                      </button>
                    </div>
                    
                    <h3 className="text-3xl font-black uppercase mb-4 leading-tight bg-white p-3 border-4 border-neo-black shadow-[4px_4px_0px_rgba(17,17,17,1)] inline-block w-max max-w-full">
                      {pathway.title}
                    </h3>
                    
                    <p className="text-xl font-bold bg-white/90 p-4 border-4 border-neo-black mb-6 flex-1">
                      {pathway.description}
                    </p>
                    
                    {pathway.recommendation_summary && (
                      <div className="p-5 bg-neo-black text-white border-4 border-neo-black mt-auto">
                        <p className="text-xs font-black uppercase tracking-widest text-neo-yellow mb-3">Recommendation Summary</p>
                        <p className="text-lg font-bold leading-snug line-clamp-3">
                          {pathway.recommendation_summary}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
