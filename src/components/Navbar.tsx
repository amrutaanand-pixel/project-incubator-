import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Rocket, 
  Search, 
  Bell, 
  Plus, 
  Sparkles, 
  Lightbulb, 
  Users, 
  UserCheck, 
  ChevronDown, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck,
  LogOut,
  ArrowRightLeft
} from 'lucide-react';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
  onOpenNotifications
}) => {
  const { 
    currentUser, 
    unreadNotificationCount, 
    setActiveTab, 
    setIsAuthModalOpen, 
    setIsCreateTeamModalOpen, 
    setIsPostIdeaModalOpen,
    setIsEditProfileModalOpen,
    switchPortal,
    logout
  } = useApp();

  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setActiveTab('marketplace');
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            id="logo-brand-btn"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-md shadow-purple-600/10 group-hover:shadow-purple-500/25 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Rocket className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
                  Project Incubator
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                  Campus v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide hidden sm:block">
                Where Ideas Find Teams
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar */}
        <form 
          id="global-search-form"
          onSubmit={handleSearchSubmit} 
          className="hidden md:flex flex-1 max-w-md mx-4 relative"
        >
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, teammates, ideas, hackathons..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all"
            />
          </div>
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">

          {/* Dedicated Admin Site Switcher Button */}
          <button
            id="switch-to-admin-site-btn"
            onClick={() => switchPortal('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
              currentUser.role === 'admin'
                ? 'bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800'
                : 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900'
            }`}
            title="Switch to Admin Control Center"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${currentUser.role === 'admin' ? 'text-amber-600' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">Admin Site</span>
            <span className={`text-[9px] px-1 py-0.5 rounded uppercase font-bold tracking-wider ${
              currentUser.role === 'admin' ? 'bg-amber-200/80 text-amber-900' : 'bg-slate-200 text-slate-700'
            }`}>
              Portal
            </span>
          </button>
          
          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              id="quick-create-dropdown-btn"
              onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold shadow-md shadow-purple-600/15 hover:shadow-purple-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCreateMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCreateMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsCreateMenuOpen(false)} 
                />
                <div 
                  id="create-menu-dropdown"
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <button
                    id="create-team-menu-item"
                    onClick={() => {
                      setIsCreateMenuOpen(false);
                      setIsCreateTeamModalOpen(true);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Create Team</p>
                      <p className="text-[10px] text-slate-500">Recruit multidisciplinary members</p>
                    </div>
                  </button>

                  <button
                    id="post-idea-menu-item"
                    onClick={() => {
                      setIsCreateMenuOpen(false);
                      setIsPostIdeaModalOpen(true);
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Post Project Idea</p>
                      <p className="text-[10px] text-slate-500">Share startup or research idea</p>
                    </div>
                  </button>

                  <button
                    id="ask-ai-advisor-menu-item"
                    onClick={() => {
                      setIsCreateMenuOpen(false);
                      setActiveTab('ai-tools');
                    }}
                    className="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-700">AI Project Advisor</p>
                      <p className="text-[10px] text-slate-500">Generate roadmap & roles</p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notifications Button */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* User Profile Pill & Account Switcher */}
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-purple-300 transition-all cursor-pointer"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover border border-purple-200"
              />
              <div className="text-left hidden xl:block">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-slate-900 leading-none">{currentUser.name}</p>
                  {currentUser.isVerified && <UserCheck className="w-3 h-3 text-cyan-600" />}
                </div>
                <p className="text-[10px] text-slate-500 truncate max-w-[110px]">{currentUser.department}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {isUserMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsUserMenuOpen(false)} 
                />
                <div 
                  id="user-menu-dropdown"
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3.5 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      {currentUser.name}
                      {currentUser.role === 'admin' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Admin
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] text-purple-600 font-medium">{currentUser.headline}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      id="view-my-profile-btn"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsEditProfileModalOpen(true);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>Edit My Student Profile</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      id="switch-account-modal-btn"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsAuthModalOpen(true);
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-purple-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>Switch Student Account / Register</span>
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      id="nav-to-admin-site-btn"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        switchPortal('admin');
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-amber-800 hover:bg-amber-50 flex items-center justify-between transition-colors cursor-pointer font-medium"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                        Enter Admin Control Center
                      </span>
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      id="user-logout-btn"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full px-3.5 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center justify-between transition-colors cursor-pointer font-medium"
                    >
                      <span className="flex items-center gap-1.5">
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        Log Out
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
