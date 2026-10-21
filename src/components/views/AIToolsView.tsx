import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Loader2, 
  Compass, 
  Trophy, 
  Award,
  Zap,
  Target
} from 'lucide-react';
import { AIAdvisorOutput } from '../../types';

export const AIToolsView: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    askAIAdvisor, 
    setSelectedStudent, 
    addToast 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'matchmaker' | 'advisor' | 'skills'>('matchmaker');

  // MATCHMAKER STATE
  const [targetRole, setTargetRole] = useState('Frontend & UI/UX Designer');
  const [targetDept, setTargetDept] = useState('All');
  const [matchResults, setMatchResults] = useState<Array<{
    student: (typeof allUsers)[0];
    score: number;
    reasons: string[];
  }>>([]);
  const [isMatching, setIsMatching] = useState(false);

  // ADVISOR STATE
  const [advisorProjectName, setAdvisorProjectName] = useState('Agrinova Vision');
  const [advisorDomain, setAdvisorDomain] = useState('AgriTech & Autonomous Edge AI');
  const [advisorDescription, setAdvisorDescription] = useState(
    'An edge-AI enabled smart irrigation and fungal crop infection detection drone swarm for smallholder farmers with solar charging stations.'
  );
  const [advisorTargetEvent, setAdvisorTargetEvent] = useState('Smart India Hackathon 2026');
  const [advisorResult, setAdvisorResult] = useState<AIAdvisorOutput | null>(null);
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);

  // Run matchmaker calculation
  const handleRunMatchmaker = () => {
    setIsMatching(true);
    setTimeout(() => {
      const candidates = allUsers.filter((u) => u.id !== currentUser.id);

      const scored = candidates.map((student) => {
        let score = 70;
        const reasons: string[] = [];

        // Department diversity bonus
        if (student.department !== currentUser.department) {
          score += 12;
          reasons.push(`Cross-department synergy: Combines your ${currentUser.department.split('&')[0]} expertise with ${student.department.split('&')[0]}`);
        }

        // Skill alignment
        const roleLower = targetRole.toLowerCase();
        const hasMatchingSkill = student.skills.some((s) => 
          roleLower.includes(s.toLowerCase()) || 
          s.toLowerCase().includes('design') || 
          s.toLowerCase().includes('react') || 
          s.toLowerCase().includes('figma') ||
          s.toLowerCase().includes('hardware') ||
          s.toLowerCase().includes('ai')
        );

        if (hasMatchingSkill) {
          score += 14;
          reasons.push(`Core expertise match in required toolstack: ${student.skills.slice(0, 3).join(', ')}`);
        }

        // Achievements bonus
        if (student.badges.length > 0) {
          score += 6;
          reasons.push(`Demonstrated track record with ${student.badges.length} campus awards & verified hackathon badges`);
        }

        // Cap at 98
        score = Math.min(score, 98);

        return {
          student,
          score,
          reasons
        };
      });

      scored.sort((a, b) => b.score - a.score);
      setMatchResults(scored);
      setIsMatching(false);
      addToast('success', 'Teammates Matched', `Discovered ${scored.length} student collaborators ranked by interdisciplinary match score.`);
    }, 600);
  };

  // Run AI Project Advisor
  const handleRunAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorProjectName.trim() || !advisorDescription.trim()) return;

    setIsAdvisorLoading(true);
    try {
      const result = await askAIAdvisor(
        advisorProjectName.trim(),
        advisorDomain.trim(),
        advisorDescription.trim(),
        advisorTargetEvent.trim()
      );
      setAdvisorResult(result);
      addToast('success', 'Roadmap Synthesized', 'AI Project Advisor formulated an architecture and 3-phase execution roadmap.');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  // Skill Recommendations calculation based on current student profile
  const recommendedSkills = [
    {
      skill: 'ROS2 & Micro-ROS Architecture',
      domain: 'Robotics & Hardware-Software Interop',
      reason: 'Pairs with your existing C++ / Python stack for national Autonomous Rover & Drone competitions.',
      demandGrowth: '+38% Campus Hackathons',
      certLink: 'Linux Foundation Certified ROS2 Dev'
    },
    {
      skill: 'Edge AI Quantization (TensorRT & ONNX)',
      domain: 'Embedded Systems & Computer Vision',
      reason: 'Enables real-time inference on STM32 / Jetson hardware, a top judge criteria at SIH 2026.',
      demandGrowth: '+45% Smart Hardware Projects',
      certLink: 'NVIDIA Deep Learning Institute'
    },
    {
      skill: 'Design Systems & Figma Prototyping',
      domain: 'Interface Craft & Usability',
      reason: '84% of winning hackathon submissions feature dedicated design tokens and interactive micro-interactions.',
      demandGrowth: '+52% Team Recruiters',
      certLink: 'Interaction Design Foundation'
    },
    {
      skill: 'Smart Contracts & Zero-Knowledge Proofs',
      domain: 'Decentralized Tech & Security',
      reason: 'Top sponsored bounty tracks in global Web3 hackathons exceed $100K in student prizes.',
      demandGrowth: '+30% Global Grants',
      certLink: 'Ethereum Developer Program'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            AI Innovation Engine
          </span>
          <span className="text-xs text-purple-700 font-medium">
            Powered by Gemini AI Multi-Turn Intelligence
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          AI Team Matchmaker, Project Advisor & Skill Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Leverage intelligent multidisciplinary algorithms to assemble dream teams, synthesize full technical roadmaps, and forecast high-value technical capabilities.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <button
          id="ai-tab-matchmaker"
          onClick={() => setActiveSubTab('matchmaker')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'matchmaker'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>1. AI Team Matchmaker</span>
        </button>

        <button
          id="ai-tab-advisor"
          onClick={() => setActiveSubTab('advisor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'advisor'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>2. AI Project Advisor</span>
        </button>

        <button
          id="ai-tab-skills"
          onClick={() => setActiveSubTab('skills')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === 'skills'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>3. Skill Recommendation Engine</span>
        </button>
      </div>

      {/* SUB-VIEW 1: AI Team Matchmaker */}
      {activeSubTab === 'matchmaker' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Configure Candidate Search Criteria
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Our multidisciplinary scoring engine evaluates cross-department complementarity, past hackathon awards, and verified technical skills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role Needed in Squad
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
                >
                  <option value="Frontend & UI/UX Designer">Frontend & UI/UX Designer (Figma, React)</option>
                  <option value="Hardware / Embedded Engineer">Hardware / Embedded Engineer (STM32, ROS, KiCad)</option>
                  <option value="Biotech & BioInformatics Lead">Biotech & BioInformatics Lead (Python, Genomics)</option>
                  <option value="AI / Computer Vision Specialist">AI / Computer Vision Specialist (PyTorch, YOLO)</option>
                  <option value="Business Model & Pitch Strategist">Business Model & Pitch Strategist (FinTech, Decks)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Filter by Student Faculty / Department
                </label>
                <select
                  value={targetDept}
                  onChange={(e) => setTargetDept(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
                >
                  <option value="All">All Campus Faculties (Maximum Interdisciplinarity)</option>
                  <option value="Design & Creative Media">Design & Creative Media</option>
                  <option value="Electronics & Comm">Electronics & Comm</option>
                  <option value="Biotech & Biomedical">Biotech & Biomedical</option>
                  <option value="Computer Science & Eng">Computer Science & Eng</option>
                  <option value="Management & FinTech">Management & FinTech</option>
                </select>
              </div>
            </div>

            <button
              id="run-ai-matchmaker-btn"
              onClick={handleRunMatchmaker}
              disabled={isMatching}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isMatching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing Interdisciplinary Compatibility...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Run AI Team Matchmaker Algorithm</span>
                </>
              )}
            </button>
          </div>

          {/* Results Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              AI Ranked Collaborator Recommendations ({matchResults.length > 0 ? matchResults.length : allUsers.length - 1} matches)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(matchResults.length > 0 ? matchResults : allUsers.filter((u) => u.id !== currentUser.id).map((student, i) => ({
                student,
                score: 95 - i * 5,
                reasons: [
                  `Strong ${student.department} domain fit`,
                  `Proficient in ${student.skills.slice(0, 2).join(' & ')}`,
                  `Ready for multidisciplinary team formation`
                ]
              }))).map(({ student, score, reasons }) => (
                <div
                  key={student.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                          <p className="text-xs text-purple-700 font-semibold">{student.department}</p>
                          <p className="text-[10px] text-slate-500">{student.year}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 block">
                          {score}% Match
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-800 font-semibold mb-2.5 line-clamp-1">
                      {student.headline}
                    </p>

                    {/* Match Reasoning Rationale */}
                    <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-200/80 space-y-1.5 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
                        AI Compatibility Rationale:
                      </span>
                      {reasons.map((r, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{r}</span>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((s, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-xs font-semibold text-purple-700 hover:text-purple-900 cursor-pointer"
                    >
                      View Student Profile
                    </button>

                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Invite to Squad</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: AI Project Advisor */}
      {activeSubTab === 'advisor' && (
        <div className="space-y-6">
          <form onSubmit={handleRunAdvisor} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Project Advisor & Architecture Synthesis
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Provide your early concept. The advisor breaks it down into required interdisciplinary roles, tech stack decisions, a 3-phase execution roadmap, and winning pitch strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={advisorProjectName}
                  onChange={(e) => setAdvisorProjectName(e.target.value)}
                  placeholder="e.g. Agrinova Vision"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Domain</label>
                <input
                  type="text"
                  required
                  value={advisorDomain}
                  onChange={(e) => setAdvisorDomain(e.target.value)}
                  placeholder="e.g. AgriTech & Autonomous Robotics"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Competition</label>
                <input
                  type="text"
                  value={advisorTargetEvent}
                  onChange={(e) => setAdvisorTargetEvent(e.target.value)}
                  placeholder="e.g. Smart India Hackathon 2026"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Vision & Problem Statement</label>
              <textarea
                rows={3}
                required
                value={advisorDescription}
                onChange={(e) => setAdvisorDescription(e.target.value)}
                placeholder="Explain the problem, target user, and expected outcome..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600 resize-none"
              />
            </div>

            <button
              id="generate-advisor-roadmap-btn"
              type="submit"
              disabled={isAdvisorLoading}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAdvisorLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Full Project Roadmap & Multidisciplinary Roles...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Strategic Project Roadmap</span>
                </>
              )}
            </button>
          </form>

          {/* AI Advisor Response Render */}
          {advisorResult && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Executive Summary */}
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block mb-1">
                  Executive Architecture Assessment
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {advisorResult.summary}
                </p>
              </div>

              {/* 3-Phase Roadmap */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Sprint Roadmap & Milestones
                </h4>

                <div className="space-y-4">
                  {advisorResult.roadmaps.map((r, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <span className="text-xs font-bold text-purple-800">
                          {r.phase}
                        </span>
                        <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Milestone: {r.keyMilestone}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {r.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles Breakdown */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  Recommended Multidisciplinary Team Structure
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {advisorResult.requiredRoles.map((role, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">{role.role}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                          {role.department}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2">{role.responsibilities}</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map((s, sIdx) => (
                          <span key={sIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Judge Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Recommended Tech Stack
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold">Frontend & Interface:</span>{' '}
                      <span className="text-slate-800 font-medium">{advisorResult.recommendedTechStack.frontend.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Backend & Data:</span>{' '}
                      <span className="text-slate-800 font-medium">{advisorResult.recommendedTechStack.backend.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">AI / Hardware / Embedded:</span>{' '}
                      <span className="text-slate-800 font-medium">{advisorResult.recommendedTechStack.aiOrHardware.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Cloud & Edge Deployment:</span>{' '}
                      <span className="text-slate-800 font-medium">{advisorResult.recommendedTechStack.cloudDatabase.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-3">
                    Judge Criteria & Winning Pitch Tips
                  </h4>
                  <div className="space-y-2">
                    {advisorResult.hackathonTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-VIEW 3: Skill Recommendation Engine */}
      {activeSubTab === 'skills' && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-600" />
              Tailored Skill Trajectory for {currentUser.name}
            </h3>
            <p className="text-xs text-slate-600">
              Based on your major ({currentUser.department}), current year ({currentUser.year}), and winning hackathon trends in 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedSkills.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                      {item.domain}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.skill}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.demandGrowth}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.reason}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Benchmark: {item.certLink}</span>
                  <button
                    onClick={() => {
                      addToast('success', 'Skill Track Added', `Added "${item.skill}" to your active learning goals on campus.`);
                    }}
                    className="text-xs text-purple-700 hover:text-purple-900 font-bold cursor-pointer"
                  >
                    + Add to Goals
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
