import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department, UserRole, User } from '../../types';
import { 
  Rocket, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserPlus, 
  AlertCircle,
  Users, 
  Sparkles,
  Zap
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

export const AuthGatewayView: React.FC = () => {
  const { 
    login, 
    loginWithUser, 
    registerStudent, 
    allUsers, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student_login' | 'student_register' | 'admin_login'>('student_login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Admin login form state
  const [adminEmail, setAdminEmail] = useState('rajesh.verma@campus.edu');
  const [adminPassword, setAdminPassword] = useState('admin2026');
  const [adminError, setAdminError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDepartment, setRegDepartment] = useState<Department>('Computer Science & Eng');
  const [regYear, setRegYear] = useState<User['year']>('3rd Year');
  const [regHeadline, setRegHeadline] = useState('');
  const [regSkillsInput, setRegSkillsInput] = useState('');
  const [regInterestsInput, setRegInterestsInput] = useState('');

  // Pre-filtered demo users
  const studentDemoUsers = allUsers.filter(u => u.role === 'student').slice(0, 4);
  const adminDemoUser = allUsers.find(u => u.role === 'admin') || allUsers.find(u => u.id === 'usr_admin');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginEmail.trim()) {
      setLoginError('Please enter your university campus email.');
      return;
    }
    const success = login(loginEmail.trim(), 'user');
    if (!success) {
      setLoginError('No matching student account found. Choose a demo profile or register below.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    if (!adminEmail.trim()) {
      setAdminError('Please enter admin credentials.');
      return;
    }
    const success = login(adminEmail.trim(), 'admin');
    if (!success) {
      setAdminError('Admin authorization failed. Ensure email matches an administrative faculty account.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      addToast('error', 'Incomplete Form', 'Name and campus email are required.');
      return;
    }

    const skills = regSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const interests = regInterestsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    registerStudent({
      name: regName.trim(),
      email: regEmail.trim(),
      department: regDepartment,
      year: regYear,
      headline: regHeadline.trim() || `${regYear} ${regDepartment} Innovator`,
      skills: skills.length > 0 ? skills : ['Problem Solving', 'Prototyping'],
      interests: interests.length > 0 ? interests : ['Hackathons', 'Tech Innovation']
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      
      {/* Top Brand Banner */}
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-purple-600/15">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
                  Project Incubator
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Campus Dual Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Interdisciplinary Innovation Ecosystem & Admin Management
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Campus Network Active</span>
          </div>
        </div>
      </header>

      {/* Main Dual Gate Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* Left Column: Ecosystem Overview & Value Proposition */}
        <div className="flex-1 max-w-xl text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>University Innovation & Squad Recruitment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Where breakthrough student ideas assemble <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">multidisciplinary teams.</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Please sign in to continue. Choose between the <strong className="text-slate-900">Student Innovation Site</strong> for squad building and hackathons, or the <strong className="text-slate-900">Admin Control Center</strong> for university oversight.
          </p>

          {/* Dual Site Cards Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs">
                <Users className="w-4 h-4 text-indigo-600" />
                <span>1. Student Innovation Site</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Discover cross-department peers, apply for hackathon squads, share project ideas, and book 1:1 faculty mentors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>2. Admin Control Site</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Manage user permissions, verify student credentials, ban/suspend accounts, moderate squads, and audit logs.
              </p>
            </div>
          </div>

          {/* Quick Demo Personas 1-Click Login */}
          <div className="pt-2 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                One-Click Quick Demo Sign In
              </span>
              <span className="text-[11px] text-purple-700 font-medium">Evaluation Shortcuts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {studentDemoUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => loginWithUser(user, 'user')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white hover:bg-purple-50/70 border border-slate-200 hover:border-purple-300 text-left transition-all group cursor-pointer shadow-xs"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200 group-hover:border-purple-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-purple-700 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.department}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {adminDemoUser && (
              <button
                onClick={() => loginWithUser(adminDemoUser, 'admin')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-amber-900 transition-all cursor-pointer group shadow-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-amber-700" />
                  </div>
                  <div className="text-left truncate">
                    <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      {adminDemoUser.name}
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-mono">SUPER ADMIN</span>
                    </p>
                    <p className="text-[11px] text-amber-800/80 truncate">Direct access to Admin Management Site</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1 shrink-0 transition-colors">
                  Enter Admin Site <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Authentication Box */}
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl relative">
          
          {/* Tabs: Student Login / Register / Admin Login */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 mb-6">
            <button
              onClick={() => {
                setActiveTab('student_login');
                setLoginError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'student_login'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => {
                setActiveTab('student_register');
                setLoginError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'student_register'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setActiveTab('admin_login');
                setAdminError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                activeTab === 'admin_login'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-800 hover:text-amber-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </button>
          </div>

          {/* TAB 1: Student Login */}
          {activeTab === 'student_login' && (
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">Student / Innovator Sign In</h2>
                <p className="text-xs text-slate-500">
                  Access your squads, applications, and innovation showcase.
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">University Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="e.g. priya.sharma@campus.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                  <span>Demo: priya.sharma@campus.edu</span>
                  <button
                    type="button"
                    onClick={() => setLoginEmail('priya.sharma@campus.edu')}
                    className="text-purple-600 font-semibold hover:underline cursor-pointer"
                  >
                    Auto-fill
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Campus Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password or use demo shortcut"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enter Student Innovation Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('student_register')}
                    className="text-purple-600 font-semibold hover:underline cursor-pointer"
                  >
                    Register as Student
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* TAB 2: Student Sign Up */}
          {activeTab === 'student_register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-0.5">Join Campus Incubator</h2>
                <p className="text-xs text-slate-500">Create your multidisciplinary talent profile.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Liam Zhang"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Campus Email</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. liam.zhang@campus.edu"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Department</label>
                  <select
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value as Department)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700">Year of Study</label>
                  <select
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value as User['year'])}
                    className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Headline</label>
                <input
                  type="text"
                  value={regHeadline}
                  onChange={(e) => setRegHeadline(e.target.value)}
                  placeholder="e.g. Autonomous Systems & Sensor Integration"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Key Skills (comma separated)</label>
                <input
                  type="text"
                  value={regSkillsInput}
                  onChange={(e) => setRegSkillsInput(e.target.value)}
                  placeholder="e.g. React, Python, CAD, ROS, UI/UX"
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Student Account & Enter</span>
              </button>
            </form>
          )}

          {/* TAB 3: Admin Portal Login */}
          {activeTab === 'admin_login' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    Faculty & Incubator Directorate
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">Incubator Admin Control Gate</h2>
                <p className="text-xs text-slate-500">
                  Exclusive administrative portal to control campus users, review squads, and audit activities.
                </p>
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{adminError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Administrator Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="rajesh.verma@campus.edu"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
                  />
                </div>
                <p className="text-[10px] text-slate-500">Default Super Admin: rajesh.verma@campus.edu</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">Admin Security Passcode</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="admin2026"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>Authorize & Open Admin Site</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Admin Site Controls Available:</p>
                <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-600">
                  <li>User Directory, Role Reassignments & ID Verification</li>
                  <li>Account Banning & Suspension Governance</li>
                  <li>Team Squad Oversight & Deletion</li>
                  <li>Community Idea Moderation & Seed Candidate Flagging</li>
                  <li>Live System Audit Trails & Security Logs</li>
                </ul>
              </div>
            </form>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white px-4 py-4 text-center text-xs text-slate-500">
        <p>Project Incubator &bull; Multidisciplinary Campus Innovation Network &bull; Secured with Dual-Portal Access Governance</p>
      </footer>

    </div>
  );
};
