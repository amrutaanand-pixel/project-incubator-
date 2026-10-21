import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Users, Sparkles, Plus, Trash2 } from 'lucide-react';

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
  const { createTeam, hackathons } = useApp();

  const [teamName, setTeamName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [targetHackathon, setTargetHackathon] = useState(hackathons[0]?.title || 'Smart India Hackathon 2026');
  const [category, setCategory] = useState<'Hackathon Squad' | 'Startup Incubator' | 'Research Initiative' | 'Coursework Capstone'>('Hackathon Squad');
  const [tagsInput, setTagsInput] = useState('');
  
  // Dynamic Open Roles needed
  const [openRoles, setOpenRoles] = useState<string[]>([
    'UI/UX & Frontend Designer',
    'Hardware / Embedded Engineer'
  ]);
  const [newRoleInput, setNewRoleInput] = useState('');

  if (!isOpen) return null;

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    setOpenRoles((prev) => [...prev, newRoleInput.trim()]);
    setNewRoleInput('');
  };

  const handleRemoveRole = (index: number) => {
    setOpenRoles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !tagline.trim()) return;

    const parsedTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    createTeam({
      name: teamName.trim(),
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim(),
      projectGoal: projectGoal.trim() || 'Win top track and build production prototype.',
      targetHackathon,
      category,
      rolesNeeded: [],
      initialRoles: openRoles.length > 0 ? openRoles : ['Multidisciplinary Collaborator'],
      isRecruiting: true,
      tags: parsedTags.length > 0 ? parsedTags : ['Cross-Department', 'Hackathon']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="create-team-modal-dialog"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Create Multidisciplinary Team</h3>
              <p className="text-xs text-slate-500">Recruit students across departments for hackathons & startups</p>
            </div>
          </div>
          <button
            id="close-create-team-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Team Name *</label>
              <input
                id="team-name-input"
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. NeuroMesh AI"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                id="team-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
              >
                <option value="Hackathon Squad">Hackathon Squad</option>
                <option value="Startup Incubator">Startup Incubator</option>
                <option value="Research Initiative">Research Initiative</option>
                <option value="Coursework Capstone">Coursework Capstone</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline (One-sentence elevator pitch) *</label>
            <input
              id="team-tagline-input"
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Real-time cognitive fatigue alert system for campus night labs"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Project Description</label>
            <textarea
              id="team-description-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your problem statement, tech stack, and what makes your approach novel..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Hackathon or Goal</label>
              <select
                id="team-target-hackathon-select"
                value={targetHackathon}
                onChange={(e) => setTargetHackathon(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
              >
                {hackathons.map((h) => (
                  <option key={h.id} value={h.title}>
                    {h.title}
                  </option>
                ))}
                <option value="Independent Startup">Independent Startup (Non-Hackathon)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Goal / Milestone</label>
              <input
                id="team-goal-input"
                type="text"
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                placeholder="e.g. Build working hardware demo by Nov 10"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* Open Roles Needed */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Roles Needed in Your Team (Multidisciplinary)
            </label>
            <div className="space-y-2 mb-2">
              {openRoles.map((role, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                  <span className="font-medium text-purple-700">Role {idx + 1}: {role}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(idx)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                id="new-role-input"
                type="text"
                value={newRoleInput}
                onChange={(e) => setNewRoleInput(e.target.value)}
                placeholder="e.g. Mechanical Gimbal Engineer, UI/UX Designer, Grant Strategist"
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddRole();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddRole}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
            <input
              id="team-tags-input"
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. PyTorch, ROS2, Figma, AgriTech, SIH 2026"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div className="pt-2">
            <button
              id="submit-create-team-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Team & Open Recruitment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
