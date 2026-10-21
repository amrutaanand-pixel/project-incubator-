import React from 'react';
import { useApp, NavTab } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Users, 
  Sparkles, 
  Lightbulb, 
  Trophy, 
  GraduationCap, 
  Cpu, 
  ShieldCheck,
  Award,
  Zap,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, teams, ideas, hackathons, currentUser, switchPortal, logout } = useApp();

  const recruitingTeamsCount = teams.filter((t) => t.isRecruiting).length;
  const activeIdeasCount = ideas.length;
  const upcomingHackathonsCount = hackathons.length;

  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'teambuilder',
      label: 'Team Builder',
      icon: Users,
      badge: recruitingTeamsCount,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      id: 'marketplace',
      label: 'Skill Marketplace',
      icon: Sparkles,
      badge: 'Talent',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      id: 'ideaboard',
      label: 'Idea Board',
      icon: Lightbulb,
      badge: activeIdeasCount,
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'hackathons',
      label: 'Hackathon Hub',
      icon: Trophy,
      badge: `${upcomingHackathonsCount} Live`,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'mentors',
      label: 'Mentor Connect',
      icon: GraduationCap,
      badge: 'Alumni',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'ai-tools',
      label: 'AI Innovation Suite',
      icon: Cpu,
      badge: 'Advisor & Match',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'admin',
      label: 'Admin Overview',
      icon: ShieldCheck,
      badge: currentUser.role === 'admin' ? 'Admin' : 'Auditor',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white/95 lg:bg-transparent border-r border-slate-200 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Main Navigation */}
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Ecosystem Navigation
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-purple-50 border border-purple-200 text-purple-900 font-semibold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-500 group-hover:text-purple-600 group-hover:bg-purple-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick AI Spotlight */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 via-indigo-50/60 to-white border border-purple-200/80 relative overflow-hidden group shadow-xs">
            <div className="flex items-center gap-2 text-purple-900 mb-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-[11px] uppercase tracking-wider">AI Teammate Radar</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
              Multidisciplinary match algorithm finds peers based on complementary skills & hackathon history.
            </p>
            <button
              id="sidebar-launch-ai-btn"
              onClick={() => handleNavClick('ai-tools')}
              className="w-full py-1.5 px-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>Launch Matchmaker</span>
              <Sparkles className="w-3 h-3 text-purple-200" />
            </button>
          </div>
        </div>

        {/* Campus Innovation Pulse Footer Widget */}
        <div className="pt-4 border-t border-slate-200 mt-4 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Campus Live Pulse
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">Active</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-center gap-1 text-slate-900 text-xs font-bold">
                <Users className="w-3 h-3 text-indigo-600" />
                <span>{teams.length * 3 + 4}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Students Teaming</p>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-center gap-1 text-slate-900 text-xs font-bold">
                <Award className="w-3 h-3 text-amber-600" />
                <span>$500K+</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">Prize Pools</p>
            </div>
          </div>

          {/* Quick Dual-Site Portal Switcher */}
          <button
            id="sidebar-switch-portal-btn"
            onClick={() => {
              onClose();
              switchPortal('admin');
            }}
            className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin Control Site</span>
            </div>
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
          </button>

          {/* Logout */}
          <button
            id="sidebar-logout-btn"
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full py-1.5 px-3 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-200 text-rose-600 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>
    </>
  );
};
