import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Trash2, 
  Plus, 
  TrendingUp, 
  Activity,
  UserCheck,
  XCircle
} from 'lucide-react';

export const AdminPanelView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    teams, 
    ideas, 
    hackathons, 
    mentors, 
    toggleUserVerification, 
    deleteIdea,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'moderation' | 'events'>('analytics');

  // New hackathon event state
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventOrganizer, setNewEventOrganizer] = useState('');
  const [newEventPrize, setNewEventPrize] = useState('');
  const [newEventDeadline, setNewEventDeadline] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    addToast(
      'success',
      'Hackathon Published',
      `Event "${newEventTitle}" has been provisioned and published to the student ecosystem.`
    );
    setNewEventTitle('');
    setNewEventOrganizer('');
    setNewEventPrize('');
    setNewEventDeadline('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 via-purple-50 to-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Campus Administrator & Innovation Oversight
            </span>
            <span className="text-xs text-slate-500">
              Session: {currentUser.name} ({currentUser.role === 'admin' ? 'Faculty Admin' : 'Auditor Mode'})
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Platform Administration & Ecosystem Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Monitor interdisciplinary student collaboration metrics, verify enrolled student identities, manage hackathon schedules, and moderate proposals.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ecosystem Analytics & Health
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'users'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User & Student Verification ({allUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'moderation'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Content Moderation ({ideas.length} proposals)
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'events'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Schedule Hackathon Event
        </button>
      </div>

      {/* TAB 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Registered Students</span>
              <span className="text-2xl font-bold text-slate-900">{allUsers.length}</span>
              <p className="text-[10px] text-emerald-700 font-medium mt-1">100% Verified Campus Accounts</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Interdisciplinary Squads</span>
              <span className="text-2xl font-bold text-slate-900">{teams.length}</span>
              <p className="text-[10px] text-purple-700 font-medium mt-1">88% Multi-Department</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Tracked Hackathons</span>
              <span className="text-2xl font-bold text-slate-900">{hackathons.length}</span>
              <p className="text-[10px] text-amber-800 font-medium mt-1">$500,000+ Prize Pools</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 block mb-1">Mentor Availability</span>
              <span className="text-2xl font-bold text-slate-900">{mentors.length}</span>
              <p className="text-[10px] text-cyan-700 font-medium mt-1">Faculty & Top Tech Alumni</p>
            </div>
          </div>

          {/* Department Breakdown & Interdisciplinarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600" />
                Interdisciplinary Collaboration Index
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Percentage of student teams uniting 2 or more distinct university faculties:
              </p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">Engineering + Design Pairing</span>
                    <span className="text-purple-700 font-bold">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">Hardware (ECE/Mech) + Software (CS/AI)</span>
                    <span className="text-indigo-700 font-bold">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">Biotech + Computational Science</span>
                    <span className="text-cyan-700 font-bold">78%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-cyan-600 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">Technical Teams + Business Strategist</span>
                    <span className="text-amber-800 font-bold">64%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Most Demanded Teammate Skills on Campus
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Aggregated from all team recruitment roles and pitch board inquiries:
              </p>

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
                    <span className="text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Users Management */}
      {activeTab === 'users' && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Campus Student & Faculty Roster ({allUsers.length})
            </h3>
            <span className="text-xs text-slate-500">Click verification badge to toggle campus status</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Department & Year</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Top Skills</th>
                  <th className="p-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="p-3 flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                      <div>
                        <span className="font-semibold text-slate-900 block">{u.name}</span>
                        <span className="text-[10px] text-slate-500">{u.email}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-700">
                      <div>{u.department}</div>
                      <div className="text-[10px] text-slate-500">{u.year}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'admin' 
                          ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {u.skills.slice(0, 3).map((s, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleUserVerification(u.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          u.isVerified
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        {u.isVerified ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Unverified</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Moderation */}
      {activeTab === 'moderation' && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Campus Proposals Moderation Queue ({ideas.length})
          </h3>

          <div className="space-y-3">
            {ideas.map((idea) => (
              <div key={idea.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{idea.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold border border-amber-200">
                      {idea.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{idea.problemStatement}</p>
                  <p className="text-[11px] text-purple-700 font-semibold mt-1">Author: {idea.authorName} ({idea.authorDepartment})</p>
                </div>

                <button
                  onClick={() => deleteIdea(idea.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Remove Proposal</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Schedule Hackathon Event */}
      {activeTab === 'events' && (
        <form onSubmit={handleAddEvent} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-900">
            Publish New Hackathon or Innovation Challenge
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="e.g. National CleanTech Hackathon 2026"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organizer / Sponsor</label>
              <input
                type="text"
                value={newEventOrganizer}
                onChange={(e) => setNewEventOrganizer(e.target.value)}
                placeholder="e.g. Ministry of Education"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Prize Pool</label>
              <input
                type="text"
                value={newEventPrize}
                onChange={(e) => setNewEventPrize(e.target.value)}
                placeholder="e.g. ₹1,500,000 / $50,000"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Deadline</label>
            <input
              type="date"
              value={newEventDeadline}
              onChange={(e) => setNewEventDeadline(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Hackathon to Student Hub</span>
          </button>
        </form>
      )}

    </div>
  );
};
