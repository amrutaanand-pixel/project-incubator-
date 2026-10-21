import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  UserCheck, 
  Github, 
  Linkedin, 
  Globe, 
  Award, 
  Send,
  Users
} from 'lucide-react';

export const StudentDetailModal: React.FC = () => {
  const { 
    selectedStudent, 
    setSelectedStudent, 
    currentUser, 
    teams, 
    addToast 
  } = useApp();

  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [isInviteSectionOpen, setIsInviteSectionOpen] = useState(false);

  if (!selectedStudent) return null;

  const myCreatedTeams = teams.filter((t) => t.creatorId === currentUser.id);

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamId) {
      addToast('warning', 'Select Team', 'Please select which of your teams to invite this student to.');
      return;
    }

    const team = teams.find((t) => t.id === selectedTeamId);
    if (!team) return;

    addToast(
      'success',
      'Invitation Sent!',
      `Invited ${selectedStudent.name} to join "${team.name}". They have received a notification.`
    );
    setIsInviteSectionOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="student-detail-modal-dialog"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Cover Banner */}
        <div className="relative h-28 bg-gradient-to-r from-purple-100 via-indigo-100 to-slate-100 border-b border-slate-200 p-4 flex justify-end items-start">
          <button
            id="close-student-detail-modal"
            onClick={() => setSelectedStudent(null)}
            className="p-1.5 rounded-lg bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Header Content */}
        <div className="px-6 pb-4 -mt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-100">
          <div className="flex items-end gap-4">
            <img
              src={selectedStudent.avatar}
              alt={selectedStudent.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md shrink-0"
            />
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{selectedStudent.name}</h3>
                {selectedStudent.isVerified && (
                  <span className="inline-flex items-center gap-0.5 text-xs text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                    <UserCheck className="w-3.5 h-3.5 text-cyan-600" />
                    Verified Student
                  </span>
                )}
              </div>
              <p className="text-xs text-purple-700 font-semibold">
                {selectedStudent.year} &bull; {selectedStudent.department}
              </p>
            </div>
          </div>

          {/* Social Links & Action */}
          <div className="flex items-center gap-2 mb-1 w-full sm:w-auto">
            {selectedStudent.portfolioLinks.github && (
              <a
                href={selectedStudent.portfolioLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {selectedStudent.portfolioLinks.linkedin && (
              <a
                href={selectedStudent.portfolioLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {selectedStudent.portfolioLinks.portfolio && (
              <a
                href={selectedStudent.portfolioLinks.portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}

            {currentUser.id !== selectedStudent.id && (
              <button
                id="toggle-invite-student-btn"
                onClick={() => setIsInviteSectionOpen(!isInviteSectionOpen)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Invite to Team</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Quick Invite Box */}
          {isInviteSectionOpen && (
            <form onSubmit={handleSendInvite} className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-900">Invite {selectedStudent.name} to Your Squad</span>
                <button
                  type="button"
                  onClick={() => setIsInviteSectionOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {myCreatedTeams.length === 0 ? (
                <p className="text-xs text-slate-600">
                  You have not created any active teams yet. Go to Team Builder to create a squad first!
                </p>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Select Squad</label>
                    <select
                      id="select-team-for-invite"
                      value={selectedTeamId}
                      onChange={(e) => setSelectedTeamId(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                    >
                      <option value="">-- Choose one of your teams --</option>
                      {myCreatedTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name} ({team.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Custom Message / Role Pitch</label>
                    <input
                      id="invite-pitch-message-input"
                      type="text"
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      placeholder="e.g. We love your robotics background and would love you as our avionics lead!"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <button
                    id="submit-invite-btn"
                    type="submit"
                    className="py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Formal Team Invitation</span>
                  </button>
                </>
              )}
            </form>
          )}

          {/* Headline & Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Headline & About</h4>
            <p className="text-sm font-semibold text-slate-900 mb-1.5">{selectedStudent.headline}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedStudent.bio}</p>
          </div>

          {/* Skills & Expertise */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills & Technical Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedStudent.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements & Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Achievements & Badges</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedStudent.badges.map((badge) => (
                <div key={badge.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{badge.title}</p>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Projects */}
          {selectedStudent.previousProjects.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Previous Projects & Portfolios</h4>
              <div className="space-y-2.5">
                {selectedStudent.previousProjects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                      <span className="text-[10px] text-purple-700 font-semibold px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                        {proj.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {selectedStudent.certifications.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Certifications</h4>
              <div className="space-y-1.5">
                {selectedStudent.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-medium text-slate-900">{cert.name}</span>
                    <span className="text-slate-500 text-[11px]">{cert.issuer} &bull; {cert.issuedDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
