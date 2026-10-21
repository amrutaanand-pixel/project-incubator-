import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, UserRole, User } from '../../types';
import { 
  ShieldCheck, 
  Users, 
  Lightbulb, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  TrendingUp, 
  Activity, 
  Search, 
  UserPlus, 
  Ban, 
  RotateCcw, 
  LogOut, 
  ArrowLeft, 
  Clock, 
  Layers, 
  Sparkles
} from 'lucide-react';

const DEPARTMENTS: Department[] = [
  'Computer Science & Eng',
  'Electronics & Comm',
  'Mechanical & Robotics',
  'Biotech & Biomedical',
  'Design & Creative Media',
  'Management & FinTech',
  'Data Science & AI'
];

export const AdminPortalView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    teams, 
    ideas, 
    hackathons, 
    mentors, 
    toggleUserVerification, 
    toggleUserBan,
    changeUserRole,
    deleteUser,
    adminCreateUser,
    deleteTeam,
    toggleTeamRecruiting,
    deleteIdea,
    toggleIdeaFeature,
    createHackathon,
    adminAuditLogs,
    switchPortal,
    logout,
    addToast 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'teams' | 'ideas' | 'events' | 'logs' | 'analytics'>('users');

  // User search and filters
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'unverified' | 'suspended'>('all');

  // Create user modal state
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [newUserDept, setNewUserDept] = useState<Department>('Computer Science & Eng');
  const [newUserHeadline, setNewUserHeadline] = useState('');

  // Team search
  const [teamSearch, setTeamSearch] = useState('');

  // Idea search
  const [ideaSearch, setIdeaSearch] = useState('');

  // New hackathon state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventOrganizer, setNewEventOrganizer] = useState('');
  const [newEventPrize, setNewEventPrize] = useState('');
  const [newEventDeadline, setNewEventDeadline] = useState('');
  const [newEventMode, setNewEventMode] = useState<'Online' | 'Hybrid' | 'In-Person'>('Hybrid');
  const [newEventThemes, setNewEventThemes] = useState('AI, HealthTech, Robotics');

  // Filtered users
  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.skills.some(s => s.toLowerCase().includes(userSearch.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesDept = deptFilter === 'all' || u.department === deptFilter;
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'verified' ? u.isVerified :
      statusFilter === 'unverified' ? !u.isVerified :
      statusFilter === 'suspended' ? u.isBanned : true;

    return matchesSearch && matchesRole && matchesDept && matchesStatus;
  });

  // Filtered teams
  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.tagline.toLowerCase().includes(teamSearch.toLowerCase())
  );

  // Filtered ideas
  const filteredIdeas = ideas.filter(i =>
    i.title.toLowerCase().includes(ideaSearch.toLowerCase()) ||
    i.authorName.toLowerCase().includes(ideaSearch.toLowerCase())
  );

  const handleAdminCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      addToast('error', 'Incomplete Form', 'Name and email are required.');
      return;
    }

    adminCreateUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      department: newUserDept,
      headline: newUserHeadline.trim() || `${newUserRole.toUpperCase()} in ${newUserDept}`
    });

    setIsCreateUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserHeadline('');
  };

  const handleCreateHackathon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    createHackathon({
      title: newEventTitle.trim(),
      organizer: newEventOrganizer.trim() || 'Campus Incubator & Tech Directorate',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80',
      description: `Official campus hackathon with track prizes in ${newEventThemes}.`,
      prizePool: newEventPrize.trim() || '$10,000 in Grants',
      mode: newEventMode,
      location: newEventMode === 'Online' ? 'Discord & Virtual Hub' : 'Campus Innovation Complex, Hall B',
      startDate: '2026-11-10',
      endDate: '2026-11-12',
      deadlineDate: newEventDeadline || '2026-11-01',
      themes: newEventThemes.split(',').map(t => t.trim()).filter(Boolean),
      eligibility: 'All Enrolled Students & Cross-University Teams',
      registrationLink: 'https://incubator.campus.edu/register',
      isFeatured: true
    });

    setNewEventTitle('');
    setNewEventOrganizer('');
    setNewEventPrize('');
    setNewEventDeadline('');
  };

  return (
    <div id="admin-site-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* Top Administrative Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-amber-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Admin Wordmark & Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  Campus Incubator Admin
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Control Site
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                User Governance, Squad Auditing & Policy Oversight
              </p>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="hidden xl:flex items-center gap-6 text-xs text-slate-600 font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">TOTAL USERS</span>
              <span className="text-amber-800 font-bold tabular-nums">{allUsers.length}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">ACTIVE TEAMS</span>
              <span className="text-indigo-700 font-bold tabular-nums">{teams.length}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">PROPOSALS</span>
              <span className="text-emerald-700 font-bold tabular-nums">{ideas.length}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">SUSPENDED</span>
              <span className="text-rose-600 font-bold tabular-nums">{allUsers.filter(u => u.isBanned).length}</span>
            </div>
          </div>

          {/* Top Actions: Switch to User Site & Log Out */}
          <div className="flex items-center gap-2.5">
            <button
              id="admin-switch-to-user-site-btn"
              onClick={() => switchPortal('user')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
              <span>Back to User Site</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 text-xs font-medium transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'users'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Management ({allUsers.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('teams')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'teams'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Team & Squad Oversight ({teams.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('ideas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'ideas'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Idea Moderation ({ideas.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'events'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Hackathon Operations ({hackathons.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('logs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'logs'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Audit Logs ({adminAuditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Ecosystem Health</span>
          </button>
        </div>

        {/* TAB 1: User Management & Access Control */}
        {activeAdminTab === 'users' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Top Bar: Search, Filters & Add User */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              <div className="flex-1 flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative min-w-[240px] flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search users by name, email, or skill..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="mentor">Mentors</option>
                  <option value="admin">Administrators</option>
                </select>

                {/* Department Filter */}
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-700 focus:outline-none focus:border-amber-500 max-w-[180px]"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-700 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                  <option value="suspended">Suspended / Banned</option>
                </select>
              </div>

              {/* Add User Button */}
              <button
                id="admin-add-user-btn"
                onClick={() => setIsCreateUserModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <UserPlus className="w-4 h-4" />
                <span>Enroll New User</span>
              </button>

            </div>

            {/* Users Table */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium">
                    <tr>
                      <th className="p-3">User & Identity</th>
                      <th className="p-3">Department & Year</th>
                      <th className="p-3">Role Assignment</th>
                      <th className="p-3">ID Verification</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500">
                          No users matched your search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Name & Avatar */}
                          <td className="p-3 flex items-center gap-3">
                            <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate flex items-center gap-1.5">
                                {u.name}
                                {u.id === currentUser.id && (
                                  <span className="text-[9px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-mono">YOU</span>
                                )}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">{u.email}</p>
                            </div>
                          </td>

                          {/* Department & Year */}
                          <td className="p-3 text-slate-700">
                            <div className="font-medium">{u.department}</div>
                            <div className="text-[10px] text-slate-500">{u.year}</div>
                          </td>

                          {/* Role with Change Dropdown */}
                          <td className="p-3">
                            <select
                              value={u.role}
                              onChange={(e) => changeUserRole(u.id, e.target.value as UserRole)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none ${
                                u.role === 'admin'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : u.role === 'mentor'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-800 border-slate-200'
                              }`}
                            >
                              <option value="student">STUDENT</option>
                              <option value="mentor">MENTOR</option>
                              <option value="admin">ADMIN</option>
                            </select>
                          </td>

                          {/* Verification Toggle */}
                          <td className="p-3">
                            <button
                              onClick={() => toggleUserVerification(u.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                u.isVerified
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900'
                              }`}
                              title="Click to toggle institutional verification"
                            >
                              {u.isVerified ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Verified</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Unverified</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Account Status (Active vs Suspended) */}
                          <td className="p-3">
                            {u.isBanned ? (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-max">
                                <Ban className="w-3 h-3 text-rose-600" />
                                SUSPENDED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-max">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                ACTIVE
                              </span>
                            )}
                          </td>

                          {/* Actions: Ban/Unban & Delete */}
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Toggle Ban */}
                              <button
                                onClick={() => toggleUserBan(u.id, 'Administrative policy review')}
                                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                                  u.isBanned
                                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                                }`}
                                title={u.isBanned ? 'Reinstate user' : 'Suspend user account'}
                              >
                                {u.isBanned ? <RotateCcw className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                              </button>

                              {/* Delete */}
                              {u.id !== currentUser.id && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to permanently delete ${u.name}?`)) {
                                      deleteUser(u.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                                  title="Permanently remove user"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Team & Squad Oversight */}
        {activeAdminTab === 'teams' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Filter squads by name or goal..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {filteredTeams.length} Total Registered Squads
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTeams.map((team) => (
                <div key={team.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm">{team.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                          {team.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{team.tagline}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Disband and remove squad "${team.name}"?`)) {
                          deleteTeam(team.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer shrink-0"
                      title="Disband squad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <p className="font-medium text-amber-800 text-[11px] mb-1">Target Event:</p>
                    <p>{team.targetHackathon || 'Campus Incubator Venture Track'}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-500">Roster:</span>
                      <span className="font-bold text-slate-800">{team.members.length} Members</span>
                    </div>

                    <button
                      onClick={() => toggleTeamRecruiting(team.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                        team.isRecruiting
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {team.isRecruiting ? 'Recruiting: OPEN' : 'Recruiting: CLOSED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Idea Moderation */}
        {activeAdminTab === 'ideas' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={ideaSearch}
                  onChange={(e) => setIdeaSearch(e.target.value)}
                  placeholder="Search proposals by title or author..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {filteredIdeas.length} Active Community Proposals
              </span>
            </div>

            <div className="space-y-3">
              {filteredIdeas.map((idea) => (
                <div key={idea.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{idea.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        {idea.category}
                      </span>
                      {idea.status === 'incubating' && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          INCUBATOR GRANT CANDIDATE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">{idea.problemStatement}</p>
                    <p className="text-[11px] text-slate-500">
                      Author: <strong className="text-purple-700">{idea.authorName}</strong> ({idea.authorDepartment}) &bull; {idea.upvotes.length} Community Upvotes
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleIdeaFeature(idea.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        idea.status === 'incubating'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Promote to Incubator Seed Grant candidate"
                    >
                      {idea.status === 'incubating' ? 'Fund Candidate' : 'Promote to Grant'}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Permanently remove proposal "${idea.title}"?`)) {
                          deleteIdea(idea.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                      title="Moderate and delete proposal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Hackathon Event Operations */}
        {activeAdminTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Event Provisioning Form */}
              <form onSubmit={handleCreateHackathon} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    Provision Campus Hackathon
                  </h3>
                  <p className="text-xs text-slate-500">Publish a new competitive track to all student squads.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Hackathon Title</label>
                  <input
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. National Smart Mobility Hackathon 2026"
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Organizer</label>
                    <input
                      type="text"
                      value={newEventOrganizer}
                      onChange={(e) => setNewEventOrganizer(e.target.value)}
                      placeholder="e.g. Ministry of Tech / University"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Prize Pool</label>
                    <input
                      type="text"
                      value={newEventPrize}
                      onChange={(e) => setNewEventPrize(e.target.value)}
                      placeholder="e.g. $25,000 + Venture Grant"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Mode</label>
                    <select
                      value={newEventMode}
                      onChange={(e) => setNewEventMode(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Online">Online</option>
                      <option value="In-Person">In-Person</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Registration Deadline</label>
                    <input
                      type="date"
                      value={newEventDeadline}
                      onChange={(e) => setNewEventDeadline(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Themes / Tracks (comma-separated)</label>
                  <input
                    type="text"
                    value={newEventThemes}
                    onChange={(e) => setNewEventThemes(e.target.value)}
                    placeholder="e.g. Generative AI, Robotics, AgriTech"
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Hackathon to Community</span>
                </button>
              </form>

              {/* Active Hackathons Roster */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Published Campus Hackathons ({hackathons.length})</h3>
                {hackathons.map((hack) => (
                  <div key={hack.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900 text-xs">{hack.title}</p>
                      <p className="text-[11px] text-amber-800 font-mono mt-0.5">{hack.prizePool} &bull; {hack.mode}</p>
                      <p className="text-[10px] text-slate-500 mt-1">Deadline: {hack.deadlineDate}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono border border-slate-200">
                      {hack.registeredUserIds.length} Registered
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: Security & Audit Logs */}
        {activeAdminTab === 'logs' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Immutable Administrative Activity Audit Trail
                </h3>
                <p className="text-xs text-slate-500">Chronological history of security, role changes, and content moderation.</p>
              </div>
              <span className="text-xs text-amber-900 font-mono bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold">
                {adminAuditLogs.length} Records Logged
              </span>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium">
                  <tr>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Administrator</th>
                    <th className="p-3">Action Description</th>
                    <th className="p-3">Target Entity</th>
                    <th className="p-3">Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {adminAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/75 transition-colors">
                      <td className="p-3 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3 font-semibold text-slate-900">{log.adminName}</td>
                      <td className="p-3 text-slate-700 font-sans">{log.action}</td>
                      <td className="p-3 text-amber-800 font-medium">{log.target}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                          log.type === 'security'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : log.type === 'role'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : log.type === 'team'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {log.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: Ecosystem Health & Analytics */}
        {activeAdminTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Registered Users</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{allUsers.length}</span>
                <p className="text-[10px] text-emerald-700 font-medium mt-1">
                  {Math.round((allUsers.filter(u => u.isVerified).length / allUsers.length) * 100)}% Verified
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Interdisciplinary Squads</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{teams.length}</span>
                <p className="text-[10px] text-purple-700 font-medium mt-1">Multi-Faculty Teams</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Community Proposals</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{ideas.length}</span>
                <p className="text-[10px] text-amber-800 font-medium mt-1">{ideas.filter(i => i.status === 'incubating').length} Incubation Grant Candidates</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 block mb-1">Alumni & Faculty Mentors</span>
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{mentors.length}</span>
                <p className="text-[10px] text-cyan-700 font-medium mt-1">Google, DeepMind, IIT Faculty</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-600" />
                  Interdisciplinary Pairing Rates
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Engineering + Design Pairing', pct: 92, color: 'bg-purple-600' },
                    { label: 'Hardware (ECE/Mech) + Software (CS/AI)', pct: 85, color: 'bg-indigo-600' },
                    { label: 'Biotech + Computational Science', pct: 78, color: 'bg-cyan-600' },
                    { label: 'Technical Teams + Business Strategist', pct: 64, color: 'bg-amber-500' }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{item.label}</span>
                        <span className="font-bold text-slate-900 tabular-nums">{item.pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Campus Open Skill Deficits
                </h3>
                <p className="text-xs text-slate-500">Most sought-after teammate skills across active squads:</p>
                <div className="space-y-2 text-xs">
                  {[
                    { skill: 'Embedded Firmware / Microcontrollers', count: '18 open slots' },
                    { skill: 'Figma & Design Systems', count: '14 open slots' },
                    { skill: 'PyTorch / Edge AI Acceleration', count: '12 open slots' },
                    { skill: 'React / Next.js Full Stack', count: '11 open slots' },
                    { skill: 'Biotech Data Pipeline & Genomics', count: '7 open slots' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-medium text-slate-800">{item.skill}</span>
                      <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Enroll / Invite New User */}
      {isCreateUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-amber-600" />
                Directly Enroll New Campus User
              </h3>
              <button
                onClick={() => setIsCreateUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAdminCreateUserSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Dr. Maya Patel"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">University Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. maya.patel@campus.edu"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">System Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="student">Student</option>
                    <option value="mentor">Faculty Mentor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Department</label>
                  <select
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value as Department)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Headline</label>
                <input
                  type="text"
                  value={newUserHeadline}
                  onChange={(e) => setNewUserHeadline(e.target.value)}
                  placeholder="e.g. Lead Roboticist & Embedded Architect"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateUserModalOpen(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Footer */}
      <footer className="w-full border-t border-slate-200 bg-white px-4 py-3 text-center text-[11px] text-slate-500">
        Project Incubator Command Center &bull; Institutional Governance v2.6 &bull; Strict Role-Based Access Control
      </footer>

    </div>
  );
};
