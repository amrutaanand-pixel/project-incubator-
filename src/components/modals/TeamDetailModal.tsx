import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Send, 
  Trophy
} from 'lucide-react';

export const TeamDetailModal: React.FC = () => {
  const { 
    selectedTeam, 
    setSelectedTeam, 
    currentUser, 
    applications, 
    handleApplicationDecision,
    applyToTeam, 
    toggleMilestone, 
    addMilestone,
    addToast
  } = useApp();

  const [applyRoleId, setApplyRoleId] = useState('');
  const [applyRoleTitle, setApplyRoleTitle] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // New milestone state
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDeadline, setNewMilestoneDeadline] = useState('');

  if (!selectedTeam) return null;

  const isLeaderOrCreator = selectedTeam.creatorId === currentUser.id || 
    selectedTeam.members.some((m) => m.userId === currentUser.id && m.isLeader);

  const isMember = selectedTeam.members.some((m) => m.userId === currentUser.id);

  const teamApplications = applications.filter(
    (a) => a.teamId === selectedTeam.id && a.status === 'pending'
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyRoleId || !applyMessage.trim()) {
      addToast('warning', 'Message Required', 'Please share a brief note about why you want to join and what skills you bring.');
      return;
    }
    applyToTeam(selectedTeam.id, applyRoleId, applyRoleTitle, applyMessage.trim());
    setIsApplying(false);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim() || !newMilestoneDeadline) return;
    addMilestone(selectedTeam.id, newMilestoneTitle.trim(), newMilestoneDeadline, currentUser.name);
    setNewMilestoneTitle('');
    setNewMilestoneDeadline('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="team-detail-modal-dialog"
        className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {selectedTeam.category}
              </span>
              {selectedTeam.targetHackathon && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-purple-600" />
                  {selectedTeam.targetHackathon}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{selectedTeam.name}</h3>
            <p className="text-xs text-purple-700 mt-0.5">{selectedTeam.tagline}</p>
          </div>
          <button
            id="close-team-detail-modal"
            onClick={() => setSelectedTeam(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Project Goal & Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Project Mission & Goal</h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedTeam.description}
            </p>
            <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Milestone Target:</span>
              <span>{selectedTeam.projectGoal}</span>
            </div>
          </div>

          {/* Members (Multidisciplinary Breakdown) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Multidisciplinary Roster ({selectedTeam.members.length})
              </h4>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Interdisciplinary Collaboration Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedTeam.members.map((member) => (
                <div key={member.userId} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-xl object-cover border border-purple-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 truncate">{member.name}</span>
                      {member.isLeader && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                          Lead
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-purple-700 truncate">{member.roleTitle}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.department}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Roles Needed */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Open Recruitment Slots ({selectedTeam.rolesNeeded.reduce((acc, r) => acc + (r.openSlots - r.filledSlots), 0)} open)
            </h4>

            <div className="space-y-2.5">
              {selectedTeam.rolesNeeded.map((role) => {
                const isRoleFilled = role.filledSlots >= role.openSlots;

                return (
                  <div
                    key={role.id}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isRoleFilled ? 'bg-slate-50/60 border-slate-200 opacity-60' : 'bg-slate-50/80 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{role.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-medium">
                          {role.department}
                        </span>
                        {isRoleFilled ? (
                          <span className="text-[10px] text-slate-500 font-semibold">Filled</span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Recruiting Now
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{role.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {role.skillsRequired.map((skill, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {!isMember && !isRoleFilled && (
                      <button
                        onClick={() => {
                          setApplyRoleId(role.id);
                          setApplyRoleTitle(role.title);
                          setIsApplying(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
                      >
                        Apply for Role
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Form Drawer (If Applying) */}
          {isApplying && (
            <form onSubmit={handleApplySubmit} className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900">
                  Applying as <span className="text-purple-700 underline font-extrabold">{applyRoleTitle}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsApplying(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Why are you a great fit? (Highlight your skills & relevant projects)
                </label>
                <textarea
                  rows={3}
                  required
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  placeholder="e.g. I have built 2 hackathon dashboards using React & Tailwind. I'm excited about your crop vision architecture and can commit 15 hours a week!"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Candidate Application</span>
              </button>
            </form>
          )}

          {/* Pending Applications Review (Visible to Team Leader/Creator) */}
          {isLeaderOrCreator && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Pending Applicant Reviews ({teamApplications.length})
              </h4>

              {teamApplications.length === 0 ? (
                <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                  No pending candidate applications. Recruitment is open to campus students.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {teamApplications.map((app) => (
                    <div key={app.id} className="p-3.5 rounded-xl bg-white border border-purple-200 space-y-2.5 shadow-xs">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={app.applicantAvatar}
                            alt={app.applicantName}
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                          />
                          <div>
                            <span className="text-xs font-bold text-slate-900">{app.applicantName}</span>
                            <p className="text-[11px] text-purple-700">{app.applicantDepartment}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                          Applying: {app.roleTitle}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
                        "{app.message}"
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap gap-1">
                          {app.skills.slice(0, 3).map((s, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {s}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleApplicationDecision(app.id, 'accepted')}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            Accept Teammate
                          </button>
                          <button
                            onClick={() => handleApplicationDecision(app.id, 'rejected')}
                            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors border border-slate-200 cursor-pointer"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Milestones & Progress Tracker */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sprint Milestones ({selectedTeam.milestones.filter((m) => m.completed).length} / {selectedTeam.milestones.length} Completed)
              </h4>
            </div>

            <div className="space-y-2 mb-3">
              {selectedTeam.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  onClick={() => toggleMilestone(selectedTeam.id, milestone.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    milestone.completed
                      ? 'bg-emerald-50/60 border-emerald-200 text-slate-400 line-through'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {milestone.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-medium">{milestone.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{milestone.deadline}</span>
                </div>
              ))}
            </div>

            {/* Add milestone form */}
            {isMember && (
              <form onSubmit={handleAddMilestoneSubmit} className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newMilestoneTitle}
                  onChange={(e) => setNewMilestoneTitle(e.target.value)}
                  placeholder="New milestone deliverable..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
                />
                <input
                  type="date"
                  required
                  value={newMilestoneDeadline}
                  onChange={(e) => setNewMilestoneDeadline(e.target.value)}
                  className="px-2 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-700 focus:outline-none focus:border-purple-600"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
