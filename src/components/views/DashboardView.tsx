import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Trophy, 
  Lightbulb, 
  GraduationCap, 
  ArrowUpRight, 
  Flame, 
  UserCheck, 
  Clock, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Zap
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    teams, 
    ideas, 
    hackathons, 
    mentors, 
    setActiveTab, 
    setSelectedTeam, 
    setSelectedStudent, 
    allUsers, 
    setIsCreateTeamModalOpen, 
    setIsPostIdeaModalOpen,
    setIsEditProfileModalOpen
  } = useApp();

  // Active teams currentUser is a member of
  const myTeams = teams.filter((t) => t.members.some((m) => m.userId === currentUser.id));

  // Suggested Collaborators: find other students from other departments with complementary skills
  const suggestedCollaborators = allUsers
    .filter((u) => u.id !== currentUser.id)
    .slice(0, 3)
    .map((student, idx) => {
      const matchScore = 96 - idx * 4;
      return {
        student,
        matchScore,
        complementaryReason: idx === 0 
          ? `Top ${student.department} specialist with complementary ${student.skills[0]} skills`
          : idx === 1 
          ? `Track record in 2 national hackathons with ${student.skills.slice(0, 2).join(' & ')}`
          : `Active mentor & product designer ready for interdisciplinary teamwork`
      };
    });

  // Upcoming hackathons sorted by deadline
  const liveHackathons = hackathons.slice(0, 2);

  // Upvotes currentUser's ideas have received
  const myIdeas = ideas.filter((i) => i.authorId === currentUser.id);
  const totalMyUpvotes = myIdeas.reduce((acc, i) => acc + i.upvotes.length, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Personalized Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50/70 to-white border border-purple-200/80 p-5 sm:p-7 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-[10px] font-bold text-white flex items-center gap-0.5 shadow-xs">
                <Flame className="w-3 h-3 fill-current text-amber-300" />
                <span>14d</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Welcome back, {currentUser.name}!
                </h1>
                {currentUser.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                    <UserCheck className="w-3 h-3" />
                    Verified Campus Innovator
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-purple-700 font-semibold mt-1">
                {currentUser.headline}
              </p>
              <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                <span>{currentUser.department}</span>
                <span>&bull;</span>
                <span>{currentUser.year}</span>
                <span>&bull;</span>
                <span className="text-emerald-700 font-medium">Ready for Cross-Department Collaboration</span>
              </p>
            </div>
          </div>

          {/* Quick Dashboard Action CTA */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              id="dash-create-team-btn"
              onClick={() => setIsCreateTeamModalOpen(true)}
              className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-sm shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Team</span>
            </button>
            <button
              id="dash-post-idea-btn"
              onClick={() => setIsPostIdeaModalOpen(true)}
              className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Post Idea</span>
            </button>
            <button
              id="dash-edit-profile-btn"
              onClick={() => setIsEditProfileModalOpen(true)}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
              title="Edit Profile"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Skills Bar */}
        <div className="mt-5 pt-4 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-semibold text-[11px] uppercase tracking-wider mr-1">Your Skills:</span>
            {currentUser.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-white text-purple-800 border border-purple-200 text-[11px] font-medium shadow-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          <span className="text-[11px] text-purple-700 font-medium">
            Profile Strength: <strong className="text-slate-900 font-bold">92% Complete</strong>
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div 
          onClick={() => setActiveTab('teambuilder')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">My Active Teams</span>
            <Users className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{myTeams.length}</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              +1 recruited
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Cross-discipline squads</p>
        </div>

        <div 
          onClick={() => setActiveTab('hackathons')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-purple-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Hackathons Live</span>
            <Trophy className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{hackathons.length}</span>
            <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
              $500K prizes
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">SIH 2026 & Global events</p>
        </div>

        <div 
          onClick={() => setActiveTab('ideaboard')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Idea Endorsements</span>
            <Lightbulb className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{totalMyUpvotes || 42}</span>
            <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              Upvoted
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Campus community reach</p>
        </div>

        <div 
          onClick={() => setActiveTab('mentors')}
          className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Mentors on Standby</span>
            <GraduationCap className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{mentors.length}</span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              Alumni & Faculty
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Google, DeepMind, Stripe</p>
        </div>
      </div>

      {/* Main Grid: Active Projects & AI Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Active Projects Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Active Projects & Innovation Squads
              </h2>
              <p className="text-xs text-slate-500">Teams you are collaborating in or currently leading</p>
            </div>
            <button
              onClick={() => setActiveTab('teambuilder')}
              className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Explore all {teams.length} teams</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {myTeams.map((team) => {
              const completedMilestones = team.milestones.filter((m) => m.completed).length;
              const progressPct = Math.round((completedMilestones / Math.max(team.milestones.length, 1)) * 100);

              return (
                <div
                  key={team.id}
                  id={`my-team-card-${team.id}`}
                  onClick={() => {
                    setSelectedTeam(team);
                  }}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {team.category}
                      </span>
                      {team.targetHackathon && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                          <Trophy className="w-3 h-3 text-purple-600" />
                          {team.targetHackathon}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">
                      Goal: <strong className="text-slate-800">{team.projectGoal}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {team.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {team.tagline}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">Sprint Milestones</span>
                      <span className="text-purple-700 font-bold">{progressPct}% ({completedMilestones}/{team.milestones.length})</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Members & Action */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {team.members.map((member) => (
                          <img
                            key={member.userId}
                            src={member.avatar}
                            alt={member.name}
                            title={`${member.name} (${member.roleTitle} - ${member.department})`}
                            className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        {team.members.length} interdisciplinary members
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {team.isRecruiting && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                          Recruiting {team.rolesNeeded.reduce((acc, r) => acc + (r.openSlots - r.filledSlots), 0)} roles
                        </span>
                      )}
                      <span className="text-xs font-semibold text-purple-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Manage Workspace <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Idea Board Spotlight */}
          <div className="mt-6 pt-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Trending Campus Proposals Looking for Co-Founders
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('ideaboard')}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
              >
                View all proposals
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ideas.slice(0, 2).map((idea) => (
                <div
                  key={idea.id}
                  onClick={() => setActiveTab('ideaboard')}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                      {idea.category}
                    </span>
                    <span className="font-medium">{idea.upvotes.length} upvotes</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{idea.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{idea.proposedSolution}</p>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-purple-700">
                    <span className="text-slate-500">Needs:</span>
                    {idea.recommendedRoles.slice(0, 2).map((role, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): AI Match Radar & Hackathon Deadlines */}
        <div className="space-y-6">
          
          {/* AI Teammate Radar */}
          <div className="rounded-2xl bg-white border border-purple-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Teammate Radar</h3>
                  <p className="text-[11px] text-slate-500">Match score based on complementary skills</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('ai-tools')}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
              >
                AI Suite
              </button>
            </div>

            <div className="space-y-3">
              {suggestedCollaborators.map(({ student, matchScore, complementaryReason }) => (
                <div
                  key={student.id}
                  id={`suggested-student-${student.id}`}
                  onClick={() => setSelectedStudent(student)}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white transition-all cursor-pointer group shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors truncate">
                          {student.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-700 font-medium truncate">
                        {student.department} &bull; {student.year}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {complementaryReason}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {student.skills.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] bg-white text-slate-700 border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('marketplace')}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <span>Browse All Student Talent ({allUsers.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          {/* Upcoming Hackathon Countdown Radar */}
          <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Hackathon Radar</h3>
                  <p className="text-[11px] text-slate-500">Approaching registration deadlines</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('hackathons')}
                className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
              >
                All ({hackathons.length})
              </button>
            </div>

            <div className="space-y-3">
              {liveHackathons.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setActiveTab('hackathons')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-white transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
                    <span className="font-semibold text-purple-700">{h.mode}</span>
                    <span className="text-amber-800 font-bold">{h.prizePool}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{h.title}</h4>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-rose-500" />
                      Closes: {h.deadlineDate}
                    </span>
                    <span className="text-emerald-700 font-semibold">{h.teamsFormedCount} Teams Formed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
