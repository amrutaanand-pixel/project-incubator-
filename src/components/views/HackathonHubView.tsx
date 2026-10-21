import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Trophy, 
  Clock, 
  Users, 
  CheckCircle 
} from 'lucide-react';

export const HackathonHubView: React.FC = () => {
  const { hackathons, setIsCreateTeamModalOpen, addToast } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-amber-50 to-white border border-purple-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-purple-600" />
            National & Global Hackathon Hub
          </span>
          <span className="text-xs text-slate-500">
            {hackathons.length} Tracked Competitions
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Hackathon Hub & Squad Recruitment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Participate in premier national hackathons like Smart India Hackathon (SIH 2026), international developer summits, and win global grants with your campus team.
        </p>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hackathons.map((h) => (
          <div
            key={h.id}
            id={`hackathon-card-${h.id}`}
            className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Banner Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={h.banner}
                  alt={h.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                {/* Badges on Banner */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-md text-purple-800 border border-purple-200 shadow-xs">
                    {h.mode}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 shadow-xs">
                    {h.prizePool}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold drop-shadow-xs">{h.organizer}</span>
                  <span className="flex items-center gap-1 font-medium bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    Deadline: {h.deadlineDate}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {h.description}
                </p>

                {/* Key Details Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Event Dates
                    </span>
                    <span className="text-slate-900 font-medium">{h.startDate} - {h.endDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Campus Squads Formed
                    </span>
                    <span className="text-emerald-700 font-bold">{h.teamsFormedCount} Teams</span>
                  </div>
                </div>

                {/* Themes / Tracks */}
                <div className="mt-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Problem Tracks & Themes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {h.themes.map((theme, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 pt-0 flex flex-wrap items-center gap-2.5">
              <button
                id={`recruit-for-hackathon-${h.id}`}
                onClick={() => {
                  setIsCreateTeamModalOpen(true);
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Form Squad for This</span>
              </button>

              <button
                onClick={() => {
                  addToast(
                    'info',
                    'Tracking Hackathon',
                    `You are now tracking ${h.title}. You'll receive deadline alerts and squad updates.`
                  );
                }}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Track Event</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
