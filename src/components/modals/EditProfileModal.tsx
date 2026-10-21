import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Award, Briefcase } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile } = useApp();

  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);
  const [skillsInput, setSkillsInput] = useState(currentUser.skills.join(', '));
  const [interestsInput, setInterestsInput] = useState(currentUser.interests.join(', '));
  const [github, setGithub] = useState(currentUser.portfolioLinks.github || '');
  const [linkedin, setLinkedin] = useState(currentUser.portfolioLinks.linkedin || '');
  const [portfolio, setPortfolio] = useState(currentUser.portfolioLinks.portfolio || '');

  // Add new Past Project
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjRole, setNewProjRole] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');

  // Add new Certification
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSkills = skillsInput.split(',').map((s) => s.trim()).filter(Boolean);
    const parsedInterests = interestsInput.split(',').map((i) => i.trim()).filter(Boolean);

    let updatedProjects = [...currentUser.previousProjects];
    if (newProjTitle.trim()) {
      updatedProjects.push({
        id: `proj-${Date.now()}`,
        title: newProjTitle.trim(),
        role: newProjRole.trim() || 'Core Contributor',
        description: newProjDesc.trim() || 'Built during campus innovation sprint.',
        technologies: newProjTech.split(',').map((t) => t.trim()).filter(Boolean)
      });
    }

    let updatedCerts = [...currentUser.certifications];
    if (newCertName.trim()) {
      updatedCerts.push({
        id: `cert-${Date.now()}`,
        name: newCertName.trim(),
        issuer: newCertIssuer.trim() || 'University Innovation Lab',
        issuedDate: '2026'
      });
    }

    updateUserProfile({
      headline: headline.trim(),
      bio: bio.trim(),
      skills: parsedSkills,
      interests: parsedInterests,
      portfolioLinks: {
        github: github.trim(),
        linkedin: linkedin.trim(),
        portfolio: portfolio.trim()
      },
      previousProjects: updatedProjects,
      certifications: updatedCerts
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="edit-profile-modal-dialog"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-purple-200"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">Edit Student Innovation Profile</h3>
              <p className="text-xs text-slate-500">{currentUser.name} &bull; {currentUser.department}</p>
            </div>
          </div>
          <button
            id="close-edit-profile-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Headline</label>
            <input
              id="edit-headline-input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. AI/ML Researcher | PyTorch & Computer Vision | SIH Finalist"
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Bio & Motivation</label>
            <textarea
              id="edit-bio-input"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell teammates about your academic passions, hackathon goals, and work philosophy..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
              <input
                id="edit-skills-input"
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Python, ROS, React, Figma..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interests (comma separated)</label>
              <input
                id="edit-interests-input"
                type="text"
                value={interestsInput}
                onChange={(e) => setInterestsInput(e.target.value)}
                placeholder="AgriTech, Space Tech, Climate Tech..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* Portfolio Links */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Portfolio Links & Socials</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1">Personal Portfolio / Link</label>
                <input
                  type="url"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Quick Add Past Project */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              Add Past Project to Portfolio
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newProjTitle}
                onChange={(e) => setNewProjTitle(e.target.value)}
                placeholder="Project Title (e.g. DroneMapper)"
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
              <input
                type="text"
                value={newProjRole}
                onChange={(e) => setNewProjRole(e.target.value)}
                placeholder="Your Role (e.g. Lead Firmware Engineer)"
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>
            <input
              type="text"
              value={newProjDesc}
              onChange={(e) => setNewProjDesc(e.target.value)}
              placeholder="Short Description of key impact..."
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
            />
            <input
              type="text"
              value={newProjTech}
              onChange={(e) => setNewProjTech(e.target.value)}
              placeholder="Technologies used (comma separated, e.g. C++, ESP32, MQTT)"
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Quick Add Certification */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Add Certification
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
                placeholder="Certification Name (e.g. AWS Cloud Practitioner)"
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
              <input
                type="text"
                value={newCertIssuer}
                onChange={(e) => setNewCertIssuer(e.target.value)}
                placeholder="Issuing Body (e.g. Amazon Web Services)"
                className="px-2.5 py-1.5 text-xs rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              id="submit-edit-profile-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
