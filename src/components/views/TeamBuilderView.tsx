import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Plus, 
  Search, 
  Trophy, 
  Filter, 
  ArrowRight
} from 'lucide-react';

export const TeamBuilderView: React.FC = () => {
  const { 
    teams, 
    setSelectedTeam, 
    setIsCreateTeamModalOpen, 
    currentUser 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'recruiting' | 'hackathon' | 'startup' | 'my'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filteredTeams = teams.filter((team) => {
    // Tab filter
    if (activeFilter === 'recruiting' && !team.isRecruiting) return false;
    if (activeFilter === 'hackathon' && team.category !== 'Hackathon Squad') return false;
    if (activeFilter === 'startup' && team.category !== 'Startup Incubator') return false;
    if (activeFilter === 'my') {
      const isMember = team.members.some((m) => m.userId === currentUser.id);
      if (!isMember) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = team.name.toLowerCase().includes(q);
      const matchTagline = team.tagline.toLowerCase().includes(q);
      const matchRole = team.rolesNeeded.some((r) => 
        r.title.toLowerCase().includes(q) || 
        r.skillsRequired.some((s) => s.toLowerCase().includes(q))
      );
      const matchTags = team.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchRole && !matchTags) return false;
    }

    // Department filter
    if (selectedDept !== 'all') {
      const hasDeptMember = team.members.some((m) => m.department === selectedDept);
      const hasDeptRoleNeeded = team.rolesNeeded.some((r) => r.department === selectedDept);
      if (!hasDeptMember && !hasDeptRoleNeeded) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-white border border-indigo-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              Multidisciplinary Team Builder
            </span>
            <span className="text-xs text-slate-500">
              {teams.filter((t) => t.isRecruiting).length} Squads Recruiting Now
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Form Teams Across Departments
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Bridge Engineering, Design, AI, Hardware, and Business. Join existing squads or recruit peers with complementary skillsets for upcoming hackathons and startups.
          </p>
        </div>

        <button
          id="team-builder-create-team-btn"
          onClick={() => setIsCreateTeamModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-purple-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Team</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Teams ({teams.length})
            </button>
            <button
              onClick={() => setActiveFilter('recruiting')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'recruiting'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recruiting ({teams.filter((t) => t.isRecruiting).length})
            </button>
            <button
              onClick={() => setActiveFilter('hackathon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'hackathon'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hackathon Squads
            </button>
            <button
              onClick={() => setActiveFilter('startup')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'startup'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Startup Incubator
            </button>
            <button
              onClick={() => setActiveFilter('my')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === 'my'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Squads
            </button>
          </div>

          {/* Department Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
            >
              <option value="all">All Departments</option>
              <option value="Computer Science & Eng">Computer Science</option>
              <option value="Electronics & Comm">Electronics & Comm</option>
              <option value="Mechanical & Robotics">Mechanical & Robotics</option>
              <option value="Biotech & Biomedical">Biotech & Biomedical</option>
              <option value="Design & Creative Media">Design</option>
              <option value="Management & FinTech">Business & FinTech</option>
            </select>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams by name, required role (e.g. 'Figma', 'Embedded', 'PyTorch'), or keywords..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
          />
        </div>
      </div>

      {/* Teams Grid */}
      {filteredTeams.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-base font-bold text-slate-800">No teams matching criteria</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms, clearing department filters, or create your own squad!
          </p>
          <button
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Create This Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTeams.map((team) => {
            const isMember = team.members.some((m) => m.userId === currentUser.id);
            const openRolesCount = team.rolesNeeded.reduce(
              (acc, r) => acc + (r.openSlots - r.filledSlots),
              0
            );

            return (
              <div
                key={team.id}
                id={`team-card-${team.id}`}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {team.category}
                      </span>
                      {team.targetHackathon && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-purple-600" />
                          {team.targetHackathon}
                        </span>
                      )}
                    </div>

                    {team.isRecruiting ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {openRolesCount > 0 ? `${openRolesCount} Open Slots` : 'Recruiting'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                        Roster Full
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-xs text-purple-700 font-semibold mt-0.5">
                    {team.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {team.description}
                  </p>

                  {/* Open Roles Needed Box */}
                  {team.rolesNeeded.length > 0 && (
                    <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Needed Multidisciplinary Roles:
                      </p>
                      {team.rolesNeeded.map((role) => (
                        <div key={role.id} className="flex items-center justify-between text-xs">
                          <span className="text-slate-800 font-medium">{role.title}</span>
                          <span className="text-[10px] text-purple-700 font-semibold">
                            {role.department.split('&')[0]} &bull; {role.openSlots - role.filledSlots} slot
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {team.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Roster & Action */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {team.members.map((member) => (
                        <img
                          key={member.userId}
                          src={member.avatar}
                          alt={member.name}
                          title={`${member.name} (${member.roleTitle})`}
                          className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {team.members.length} members
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isMember ? 'Open Workspace' : 'View & Apply'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
