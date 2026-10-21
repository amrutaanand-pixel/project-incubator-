/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { NotificationDrawer } from './components/NotificationDrawer';

// Views
import { DashboardView } from './components/views/DashboardView';
import { TeamBuilderView } from './components/views/TeamBuilderView';
import { SkillMarketplaceView } from './components/views/SkillMarketplaceView';
import { IdeaBoardView } from './components/views/IdeaBoardView';
import { HackathonHubView } from './components/views/HackathonHubView';
import { MentorConnectView } from './components/views/MentorConnectView';
import { AIToolsView } from './components/views/AIToolsView';
import { AdminPanelView } from './components/views/AdminPanelView';
import { AuthGatewayView } from './components/views/AuthGatewayView';
import { AdminPortalView } from './components/views/AdminPortalView';

// Modals
import { AuthModal } from './components/modals/AuthModal';
import { CreateTeamModal } from './components/modals/CreateTeamModal';
import { PostIdeaModal } from './components/modals/PostIdeaModal';
import { StudentDetailModal } from './components/modals/StudentDetailModal';
import { TeamDetailModal } from './components/modals/TeamDetailModal';
import { EditProfileModal } from './components/modals/EditProfileModal';
import { MentorshipModal } from './components/modals/MentorshipModal';

const StudentUserLayout: React.FC = () => {
  const { 
    activeTab,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isCreateTeamModalOpen,
    setIsCreateTeamModalOpen,
    isPostIdeaModalOpen,
    setIsPostIdeaModalOpen,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    selectedStudent,
    selectedTeam,
    selectedMentor
  } = useApp();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  return (
    <div id="student-user-site-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-purple-500 selection:text-white">
      
      {/* Top Universal Navbar */}
      <Navbar
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Central Dynamic Workspace */}
        <main id="main-content-view" className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'teambuilder' && <TeamBuilderView />}
          {activeTab === 'marketplace' && <SkillMarketplaceView />}
          {activeTab === 'ideaboard' && <IdeaBoardView />}
          {activeTab === 'hackathons' && <HackathonHubView />}
          {activeTab === 'mentors' && <MentorConnectView />}
          {activeTab === 'ai-tools' && <AIToolsView />}
          {activeTab === 'admin' && <AdminPanelView />}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
      />

      <PostIdeaModal
        isOpen={isPostIdeaModalOpen}
        onClose={() => setIsPostIdeaModalOpen(false)}
      />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
      />

      {/* Conditional Item Detail Modals */}
      {selectedStudent && <StudentDetailModal />}
      {selectedTeam && <TeamDetailModal />}
      {selectedMentor && <MentorshipModal />}

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />

      {/* Floating Toast Notification Stack */}
      <ToastContainer />

    </div>
  );
};

const RootAppRouter: React.FC = () => {
  const { isAuthenticated, currentPortal } = useApp();

  // 1. Initial Gate: Must login first before accessing features
  if (!isAuthenticated) {
    return (
      <>
        <AuthGatewayView />
        <ToastContainer />
      </>
    );
  }

  // 2. Dual Site Dispatch: Admin Control Center vs Student Innovation Site
  if (currentPortal === 'admin') {
    return (
      <>
        <AdminPortalView />
        <ToastContainer />
      </>
    );
  }

  return <StudentUserLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <RootAppRouter />
    </AppProvider>
  );
}
