import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, YearOfStudy } from '../../types';
import { 
  X, 
  UserCheck, 
  LogIn, 
  UserPlus, 
  KeyRound, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    allUsers, 
    switchUser, 
    registerStudent, 
    requestPasswordReset,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'switch' | 'register' | 'recovery'>('switch');

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDepartment, setRegDepartment] = useState<Department>('Computer Science & Eng');
  const [regYear, setRegYear] = useState<YearOfStudy>('3rd Year');
  const [regHeadline, setRegHeadline] = useState('');
  const [regSkills, setRegSkills] = useState('');
  const [regInterests, setRegInterests] = useState('');

  // Password Recovery State
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryCodeSent, setRecoveryCodeSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      addToast('warning', 'Required Fields Missing', 'Please enter your full name and student email.');
      return;
    }

    const skillsArray = regSkills.split(',').map((s) => s.trim()).filter(Boolean);
    const interestsArray = regInterests.split(',').map((i) => i.trim()).filter(Boolean);

    registerStudent({
      name: regName.trim(),
      email: regEmail.trim(),
      department: regDepartment,
      year: regYear,
      headline: regHeadline.trim() || `${regYear} in ${regDepartment}`,
      skills: skillsArray,
      interests: interestsArray
    });

    onClose();
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryCodeSent) {
      if (!recoveryEmail.trim()) {
        addToast('warning', 'Email Required', 'Please provide your university student email.');
        return;
      }
      const success = requestPasswordReset(recoveryEmail.trim());
      if (success) {
        setRecoveryCodeSent(true);
      }
    } else {
      if (!otpCode.trim() || !newPassword.trim()) {
        addToast('warning', 'Incomplete', 'Please enter the 6-digit code and a new password.');
        return;
      }
      addToast('success', 'Password Reset Successful', 'You can now log into your student account.');
      setRecoveryCodeSent(false);
      setActiveTab('switch');
    }
  };

  const departments: Department[] = [
    'Computer Science & Eng',
    'Electronics & Comm',
    'Mechanical & Robotics',
    'Biotech & Biomedical',
    'Design & Creative Media',
    'Management & FinTech',
    'Data Science & AI'
  ];

  const years: YearOfStudy[] = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
    'Postgraduate / PhD'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="auth-modal-dialog"
        className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Identity & Access</h3>
              <p className="text-xs text-slate-500">Project Incubator Interdisciplinary Campus Network</p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-4 border-b border-slate-100 flex gap-2">
          <button
            id="auth-tab-switch"
            onClick={() => setActiveTab('switch')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'switch'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Switch Student Profile ({allUsers.length})</span>
          </button>

          <button
            id="auth-tab-register"
            onClick={() => setActiveTab('register')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Student Registration</span>
          </button>

          <button
            id="auth-tab-recovery"
            onClick={() => setActiveTab('recovery')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'recovery'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Password Recovery</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* TAB 1: Fast Account Switcher */}
          {activeTab === 'switch' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Instantly switch between pre-seeded multidisciplinary student personas to test cross-faculty team formation, applications, and admin moderation:
              </p>

              <div className="space-y-2.5">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;

                  return (
                    <div
                      key={user.id}
                      id={`user-select-card-${user.id}`}
                      onClick={() => {
                        switchUser(user.id);
                        onClose();
                      }}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-purple-50/80 border-purple-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{user.name}</span>
                            {user.isVerified && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] text-cyan-700 font-medium">
                                <UserCheck className="w-3 h-3" />
                                Verified
                              </span>
                            )}
                            {user.role === 'admin' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                Faculty Admin
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-purple-700 font-semibold mt-0.5">
                            {user.year} &bull; {user.department}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {user.skills.slice(0, 3).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isCurrent ? (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                            Active
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1">
                            Switch
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Student Registration */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Student Name *</label>
                  <input
                    id="reg-name-input"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Tara Nair"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Campus Email Address *</label>
                  <input
                    id="reg-email-input"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="student.id@campus.edu"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Department / Faculty *</label>
                  <select
                    id="reg-department-select"
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value as Department)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Year of Study *</label>
                  <select
                    id="reg-year-select"
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value as YearOfStudy)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-purple-600"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Headline</label>
                <input
                  id="reg-headline-input"
                  type="text"
                  value={regHeadline}
                  onChange={(e) => setRegHeadline(e.target.value)}
                  placeholder="e.g. Embedded Firmware Dev | Autonomous Rover Enthusiast"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Primary Skills (comma separated)</label>
                <input
                  id="reg-skills-input"
                  type="text"
                  value={regSkills}
                  onChange={(e) => setRegSkills(e.target.value)}
                  placeholder="e.g. Python, ROS2, KiCAD, C++, OpenCV"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Interests / Passion Areas (comma separated)</label>
                <input
                  id="reg-interests-input"
                  type="text"
                  value={regInterests}
                  onChange={(e) => setRegInterests(e.target.value)}
                  placeholder="e.g. Autonomous Drones, AgTech, Clean Energy"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="pt-2">
                <button
                  id="submit-register-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Join Project Incubator Ecosystem</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Password Recovery */}
          {activeTab === 'recovery' && (
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs leading-relaxed">
                Enter your campus student email to receive an instant verification token and reset credentials securely.
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Campus Email</label>
                <input
                  id="recovery-email-input"
                  type="email"
                  required
                  disabled={recoveryCodeSent}
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="student.name@campus.edu"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 disabled:opacity-50"
                />
              </div>

              {recoveryCodeSent && (
                <>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    Verification code dispatched! Enter code <strong>INC-8492</strong> or your preferred 6-digit code.
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Verification Code</label>
                    <input
                      id="recovery-otp-input"
                      type="text"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="e.g. INC-8492"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">New Secure Password</label>
                    <input
                      id="recovery-password-input"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  id="submit-recovery-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{recoveryCodeSent ? 'Update Password' : 'Send Recovery Code'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
