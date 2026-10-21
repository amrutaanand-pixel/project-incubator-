import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IdeaCategory } from '../../types';
import { X, Lightbulb, Sparkles } from 'lucide-react';

interface PostIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostIdeaModal: React.FC<PostIdeaModalProps> = ({ isOpen, onClose }) => {
  const { createIdea } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<IdeaCategory>('Startup Idea');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [rolesNeededInput, setRolesNeededInput] = useState('');
  const [techStackInput, setTechStackInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemStatement.trim() || !proposedSolution.trim()) return;

    const parsedRoles = rolesNeededInput.split(',').map((r) => r.trim()).filter(Boolean);
    const parsedTech = techStackInput.split(',').map((t) => t.trim()).filter(Boolean);

    createIdea({
      title: title.trim(),
      category,
      problemStatement: problemStatement.trim(),
      proposedSolution: proposedSolution.trim(),
      targetAudience: targetAudience.trim() || 'General campus community & consumers',
      recommendedRoles: parsedRoles.length > 0 ? parsedRoles : ['Technical Co-Founder', 'Product Designer'],
      techStack: parsedTech.length > 0 ? parsedTech : ['Open Source', 'Next.js']
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="post-idea-modal-dialog"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Pitch Idea to Campus Board</h3>
              <p className="text-xs text-slate-500">Share startup concepts, research proposals, or hackathon hypotheses</p>
            </div>
          </div>
          <button
            id="close-post-idea-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Idea Title *</label>
              <input
                id="idea-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AuraAssist: Smart Haptic Glasses for Visually Impaired"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
              <select
                id="idea-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as IdeaCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-500"
              >
                <option value="Startup Idea">Startup Idea</option>
                <option value="Research Proposal">Research Proposal</option>
                <option value="Hackathon Concept">Hackathon Concept</option>
                <option value="Social Impact">Social Impact</option>
                <option value="Campus Tech">Campus Tech</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Statement (What pain point are you solving?) *</label>
            <textarea
              id="idea-problem-input"
              rows={2}
              required
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe the current limitation, inefficiency, or gap in existing products..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Solution & Approach *</label>
            <textarea
              id="idea-solution-input"
              rows={3}
              required
              value={proposedSolution}
              onChange={(e) => setProposedSolution(e.target.value)}
              placeholder="Explain how your hardware, software, or multidisciplinary technique addresses the problem..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
              <input
                id="idea-audience-input"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Visually impaired students, rural clinics, solar farms"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seeking Teammates With Skills (comma separated)</label>
              <input
                id="idea-roles-input"
                type="text"
                value={rolesNeededInput}
                onChange={(e) => setRolesNeededInput(e.target.value)}
                placeholder="e.g. Embedded Firmware, UI/UX Design, PyTorch"
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Envisioned Tech Stack (comma separated)</label>
            <input
              id="idea-tech-input"
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="e.g. STM32, Bluetooth LE, Flutter, PyTorch, Supabase"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              id="submit-post-idea-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Idea & Gather Collaborators</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
