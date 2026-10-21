import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Team, 
  Idea, 
  Hackathon, 
  Mentor, 
  NotificationItem, 
  TeamApplication, 
  MentorshipSession, 
  AIAdvisorOutput, 
  AISkillRecommendation, 
  MatchmakingResult,
  Department,
  UserRole,
  PortalMode,
  AdminAuditLog
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_TEAMS, 
  INITIAL_IDEAS, 
  INITIAL_HACKATHONS, 
  INITIAL_MENTORS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type NavTab = 
  | 'dashboard'
  | 'teambuilder'
  | 'marketplace'
  | 'ideaboard'
  | 'hackathons'
  | 'mentors'
  | 'ai-tools'
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Navigation & Portals
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  currentPortal: PortalMode;
  switchPortal: (portal: PortalMode) => void;

  // Authentication & Session
  isAuthenticated: boolean;
  login: (email: string, portalPref?: PortalMode) => boolean;
  loginWithUser: (user: User, portalPreference?: PortalMode) => void;
  logout: () => void;

  // Current User & Profiles
  currentUser: User;
  allUsers: User[];
  switchUser: (userId: string) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  registerStudent: (data: {
    name: string;
    email: string;
    department: Department;
    year: User['year'];
    headline: string;
    skills: string[];
    interests: string[];
  }) => void;
  requestPasswordReset: (email: string) => boolean;

  // Teams
  teams: Team[];
  applications: TeamApplication[];
  createTeam: (teamData: Omit<Team, 'id' | 'creatorId' | 'createdAt' | 'members' | 'milestones'> & { initialRoles: string[] }) => void;
  applyToTeam: (teamId: string, roleId: string, roleTitle: string, message: string) => void;
  handleApplicationDecision: (applicationId: string, decision: 'accepted' | 'rejected') => void;
  toggleMilestone: (teamId: string, milestoneId: string) => void;
  addMilestone: (teamId: string, title: string, deadline: string, assignedTo?: string) => void;

  // Ideas
  ideas: Idea[];
  createIdea: (data: {
    title: string;
    problemStatement: string;
    proposedSolution: string;
    category: Idea['category'];
    targetAudience: string;
    recommendedRoles: string[];
    techStack: string[];
  }) => void;
  toggleUpvoteIdea: (ideaId: string) => void;
  addCommentToIdea: (ideaId: string, commentText: string) => void;

  // Hackathons
  hackathons: Hackathon[];
  toggleBookmarkHackathon: (hackathonId: string) => void;
  registerForHackathon: (hackathonId: string) => void;
  createHackathon: (hackData: Omit<Hackathon, 'id' | 'teamsFormedCount' | 'registeredUserIds' | 'bookmarkedUserIds'>) => void;

  // Mentors
  mentors: Mentor[];
  mentorshipSessions: MentorshipSession[];
  bookMentorshipSession: (mentorId: string, projectTopic: string, scheduledDate: string, notes?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (notifId: string) => void;

  // Comprehensive Admin Tools & Oversight
  toggleUserVerification: (userId: string) => void;
  toggleUserBan: (userId: string, reason?: string) => void;
  changeUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
  adminCreateUser: (userData: {
    name: string;
    email: string;
    role: UserRole;
    department: Department;
    headline: string;
  }) => void;
  deleteTeam: (teamId: string) => void;
  toggleTeamRecruiting: (teamId: string) => void;
  deleteIdea: (ideaId: string) => void;
  toggleIdeaFeature: (ideaId: string) => void;
  adminAuditLogs: AdminAuditLog[];
  addAuditLog: (action: string, target: string, type: AdminAuditLog['type']) => void;

  // AI Engines
  getAIMatchesForUser: (user: User, filterDepartment?: string) => MatchmakingResult[];
  runProjectAdvisor: (ideaText: string, domain: string, targetEvent?: string) => Promise<AIAdvisorOutput>;
  getSkillRecommendations: (user: User) => AISkillRecommendation;

  // Modals & UI Viewers
  selectedStudent: User | null;
  setSelectedStudent: (student: User | null) => void;
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
  selectedMentor: Mentor | null;
  setSelectedMentor: (mentor: Mentor | null) => void;
  selectedHackathonForRecruitment: Hackathon | null;
  setSelectedHackathonForRecruitment: (hackathon: Hackathon | null) => void;
  updateUserProfile: (updatedData: Partial<User>) => void;
  upvoteIdea: (ideaId: string) => void;
  addIdeaComment: (ideaId: string, text: string) => void;
  askAIAdvisor: (name: string, domain: string, desc: string, targetEvent?: string) => Promise<AIAdvisorOutput>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCreateTeamModalOpen: boolean;
  setIsCreateTeamModalOpen: (open: boolean) => void;
  isPostIdeaModalOpen: boolean;
  setIsPostIdeaModalOpen: (open: boolean) => void;
  isEditProfileModalOpen: boolean;
  setIsEditProfileModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'project_incubator_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  const [currentPortal, setCurrentPortal] = useState<PortalMode>(() => {
    return (localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}portal`) as PortalMode) || 'user';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}is_authenticated`);
    return saved === 'true';
  });

  // Load or fallback to initial data
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}users`);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}current_user_id`) || 'usr_1';
  });

  const [adminAuditLogs, setAdminAuditLogs] = useState<AdminAuditLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}audit_logs`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'log_1',
        adminName: 'Prof. Rajesh Verma',
        action: 'Verified Student ID Credentials',
        target: 'Priya Sharma (Computer Science & Eng)',
        timestamp: '2026-03-01 10:15 AM',
        type: 'user'
      },
      {
        id: 'log_2',
        adminName: 'Prof. Rajesh Verma',
        action: 'Approved & Featured Hackathon Squad',
        target: 'AeroPulse Vision (AgriTech UAV)',
        timestamp: '2026-03-02 02:40 PM',
        type: 'team'
      },
      {
        id: 'log_3',
        adminName: 'Prof. Rajesh Verma',
        action: 'Provisioned Campus Hackathon Event',
        target: 'Smart India Hackathon 2026',
        timestamp: '2026-03-04 11:00 AM',
        type: 'event'
      }
    ];
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`);
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [applications, setApplications] = useState<TeamApplication[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}applications`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'app_1',
        teamId: 'team_1',
        applicantId: 'usr_3',
        applicantName: 'Maya Lin',
        applicantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
        applicantDepartment: 'Design & Creative Media',
        roleId: 'r_1',
        roleTitle: 'UI/UX & Mobile Dashboard Designer',
        message: 'Hi Priya! I have designed 2 hackathon-winning mobile telemetry dashboards and built our campus design system. Would love to build the ground control app for AeroPulse!',
        skills: ['Figma', 'UI/UX Design', 'Tailwind CSS', 'Mobile UI'],
        status: 'pending',
        appliedAt: '2026-02-15'
      }
    ];
  });

  const [ideas, setIdeas] = useState<Idea[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`);
    return saved ? JSON.parse(saved) : INITIAL_IDEAS;
  });

  const [hackathons, setHackathons] = useState<Hackathon[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}hackathons`);
    return saved ? JSON.parse(saved) : INITIAL_HACKATHONS;
  });

  const [mentors] = useState<Mentor[]>(INITIAL_MENTORS);

  const [mentorshipSessions, setMentorshipSessions] = useState<MentorshipSession[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}mentorship_sessions`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'sess_1',
        mentorId: 'men_2',
        studentId: 'usr_1',
        studentName: 'Priya Sharma',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
        projectTopic: 'Jetson Nano TensorRT Latency Optimization for Crop Disease Model',
        scheduledDate: 'This Saturday, 11:30 AM',
        durationMinutes: 45,
        status: 'confirmed',
        meetLink: 'https://meet.google.com/inc-demo-room',
        notes: 'Prepare FP16 quantization benchmarks and bring ROCm / CUDA profiling logs.'
      }
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Modal / Selection states
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedHackathonForRecruitment, setSelectedHackathonForRecruitment] = useState<Hackathon | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isPostIdeaModalOpen, setIsPostIdeaModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Toast system
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}users`, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}current_user_id`, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}teams`, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}ideas`, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}hackathons`, JSON.stringify(hackathons));
  }, [hackathons]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}mentorship_sessions`, JSON.stringify(mentorshipSessions));
  }, [mentorshipSessions]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}is_authenticated`, String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}portal`, currentPortal);
  }, [currentPortal]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}audit_logs`, JSON.stringify(adminAuditLogs));
  }, [adminAuditLogs]);

  // Derived current user
  const currentUser: User = allUsers.find((u) => u.id === currentUserId) || allUsers[0];

  const switchPortal = (portal: PortalMode) => {
    setCurrentPortal(portal);
    addToast(
      'info',
      `Switched to ${portal === 'admin' ? 'Admin Site' : 'User Site'}`,
      portal === 'admin'
        ? 'Now controlling users and campus settings in Admin Command Center.'
        : 'Now inside the student innovation ecosystem.'
    );
  };

  const login = (email: string, portalPref?: PortalMode): boolean => {
    const user = allUsers.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (user) {
      if (user.isBanned) {
        addToast('error', 'Account Suspended', 'This account has been suspended by campus administration.');
        return false;
      }
      setCurrentUserId(user.id);
      setIsAuthenticated(true);
      const chosenPortal = portalPref || (user.role === 'admin' ? 'admin' : 'user');
      setCurrentPortal(chosenPortal);
      addToast(
        'success',
        `Welcome, ${user.name}!`,
        `Logged into ${chosenPortal === 'admin' ? 'Incubator Admin Control' : 'Student Innovation Site'}.`
      );
      return true;
    }
    addToast('error', 'Login Failed', 'No registered account found with that email. Try a demo persona or create an account.');
    return false;
  };

  const loginWithUser = (user: User, portalPreference?: PortalMode) => {
    if (user.isBanned) {
      addToast('error', 'Account Suspended', 'This account has been suspended by campus administration.');
      return;
    }
    setCurrentUserId(user.id);
    setIsAuthenticated(true);
    const chosenPortal = portalPreference || (user.role === 'admin' ? 'admin' : 'user');
    setCurrentPortal(chosenPortal);
    addToast(
      'success',
      `Logged in as ${user.name}`,
      `Entering ${chosenPortal === 'admin' ? 'Admin Control Center' : 'Student User Site'}.`
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPortal('user');
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}is_authenticated`);
    addToast('info', 'Logged Out', 'You have been safely signed out. Please log in to continue.');
  };

  const switchUser = (userId: string) => {
    const target = allUsers.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      addToast('info', 'Switched Profile', `Now logged in as ${target.name} (${target.department})`);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updatedData } : u))
    );
    addToast('success', 'Profile Updated', 'Your student innovation profile has been saved.');
  };

  const registerStudent = (data: {
    name: string;
    email: string;
    department: Department;
    year: User['year'];
    headline: string;
    skills: string[];
    interests: string[];
  }) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(data.name)}`,
      role: 'student',
      department: data.department,
      year: data.year,
      headline: data.headline || `${data.year} ${data.department} Innovator`,
      bio: `Hello! I am a passionate student from ${data.department} eager to collaborate on multidisciplinary hackathons and transformative tech projects.`,
      skills: data.skills.length > 0 ? data.skills : ['Problem Solving', 'Team Collaboration'],
      interests: data.interests.length > 0 ? data.interests : ['Innovation', 'Hackathons'],
      portfolioLinks: {},
      certifications: [],
      previousProjects: [],
      badges: [
        {
          id: 'b_welcome',
          title: 'Campus Pioneer',
          description: 'Joined the Project Incubator Innovation Ecosystem',
          icon: 'Sparkles',
          rarity: 'common'
        }
      ],
      isVerified: true,
      activeTeamsCount: 0,
      hackathonsWon: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAllUsers((prev) => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    addToast('success', 'Welcome to Project Incubator!', `Account created for ${newUser.name}. Complete your profile to get discovered!`);
  };

  const requestPasswordReset = (email: string): boolean => {
    const user = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      addToast('success', 'Recovery Email Dispatched', `Password reset instructions and verification code sent to ${email}`);
      return true;
    } else {
      addToast('error', 'User Not Found', `No registered student account found matching ${email}`);
      return false;
    }
  };

  // Team Operations
  const createTeam = (teamData: Omit<Team, 'id' | 'creatorId' | 'createdAt' | 'members' | 'milestones'> & { initialRoles: string[] }) => {
    const newTeamId = 'team_' + Date.now();
    const createdRoles = teamData.initialRoles.map((roleTitle, idx) => ({
      id: `role_${Date.now()}_${idx}`,
      title: roleTitle,
      department: 'Computer Science & Eng' as Department,
      skillsRequired: ['Teamwork', 'Prototyping'],
      openSlots: 1,
      filledSlots: 0,
      description: `Lead and collaborate on ${roleTitle} tasks for ${teamData.name}.`
    }));

    const newTeam: Team = {
      id: newTeamId,
      name: teamData.name,
      tagline: teamData.tagline,
      description: teamData.description,
      projectGoal: teamData.projectGoal,
      targetHackathon: teamData.targetHackathon,
      category: teamData.category,
      creatorId: currentUser.id,
      members: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          avatar: currentUser.avatar,
          roleTitle: 'Founder & Team Lead',
          department: currentUser.department,
          isLeader: true,
          joinedAt: new Date().toISOString().split('T')[0]
        }
      ],
      rolesNeeded: createdRoles.length > 0 ? createdRoles : teamData.rolesNeeded,
      milestones: [
        {
          id: 'm_init_' + Date.now(),
          title: 'Complete Project Architecture & Multidisciplinary Kickoff',
          deadline: '2026-10-15',
          completed: false,
          assignedTo: currentUser.name
        }
      ],
      isRecruiting: true,
      tags: teamData.tags.length > 0 ? teamData.tags : ['Multidisciplinary', 'Hackathon 2026'],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTeams((prev) => [newTeam, ...prev]);

    // Update user active team count
    setAllUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, activeTeamsCount: u.activeTeamsCount + 1 } : u))
    );

    addToast('success', 'Team Created Successfully!', `"${newTeam.name}" is now live on the Incubator. Teammates can now apply.`);
  };

  const applyToTeam = (teamId: string, roleId: string, roleTitle: string, message: string) => {
    const targetTeam = teams.find((t) => t.id === teamId);
    if (!targetTeam) return;

    // Check if already applied
    const existing = applications.find(
      (a) => a.teamId === teamId && a.applicantId === currentUser.id && a.status === 'pending'
    );
    if (existing) {
      addToast('warning', 'Already Applied', 'You have an active pending application for this team.');
      return;
    }

    const newApp: TeamApplication = {
      id: 'app_' + Date.now(),
      teamId,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      applicantAvatar: currentUser.avatar,
      applicantDepartment: currentUser.department,
      roleId,
      roleTitle,
      message,
      skills: currentUser.skills,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };

    setApplications((prev) => [newApp, ...prev]);

    // Send notification to team creator
    const creatorNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      userId: targetTeam.creatorId,
      type: 'collaboration_request',
      title: `New Team Application for ${targetTeam.name}`,
      message: `${currentUser.name} (${currentUser.department}) applied for the "${roleTitle}" role.`,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      targetId: teamId,
      actionLabel: 'Review Application',
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications((prev) => [creatorNotif, ...prev]);

    addToast('success', 'Application Submitted', `Your application for "${roleTitle}" has been sent to ${targetTeam.name}.`);
  };

  const handleApplicationDecision = (applicationId: string, decision: 'accepted' | 'rejected') => {
    const app = applications.find((a) => a.id === applicationId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: decision } : a))
    );

    const targetTeam = teams.find((t) => t.id === app.teamId);

    if (decision === 'accepted' && targetTeam) {
      // Add applicant to members
      const newMember = {
        userId: app.applicantId,
        name: app.applicantName,
        avatar: app.applicantAvatar,
        roleTitle: app.roleTitle,
        department: app.applicantDepartment,
        isLeader: false,
        joinedAt: new Date().toISOString().split('T')[0]
      };

      setTeams((prev) =>
        prev.map((t) => {
          if (t.id === app.teamId) {
            // Update filled slot on the role
            const updatedRoles = t.rolesNeeded.map((r) =>
              r.id === app.roleId ? { ...r, filledSlots: r.filledSlots + 1 } : r
            );
            return {
              ...t,
              members: [...t.members, newMember],
              rolesNeeded: updatedRoles
            };
          }
          return t;
        })
      );

      // Increment team count for applicant
      setAllUsers((prev) =>
        prev.map((u) => (u.id === app.applicantId ? { ...u, activeTeamsCount: u.activeTeamsCount + 1 } : u))
      );
    }

    // Notify applicant
    const notif: NotificationItem = {
      id: 'notif_' + Date.now(),
      userId: app.applicantId,
      type: 'team_invitation',
      title: decision === 'accepted' ? 'Application Accepted!' : 'Application Update',
      message:
        decision === 'accepted'
          ? `Congratulations! You have been accepted into "${targetTeam?.name || 'the team'}" as ${app.roleTitle}.`
          : `Thank you for your interest in "${targetTeam?.name || 'the team'}". At this time they moved forward with another applicant.`,
      targetId: app.teamId,
      actionLabel: decision === 'accepted' ? 'View Team Space' : undefined,
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast(
      decision === 'accepted' ? 'success' : 'info',
      `Application ${decision === 'accepted' ? 'Accepted' : 'Declined'}`,
      `${app.applicantName} has been notified.`
    );
  };

  const toggleMilestone = (teamId: string, milestoneId: string) => {
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            milestones: t.milestones.map((m) =>
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            )
          };
        }
        return t;
      })
    );
  };

  const addMilestone = (teamId: string, title: string, deadline: string, assignedTo?: string) => {
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            milestones: [
              ...t.milestones,
              {
                id: 'm_' + Date.now(),
                title,
                deadline,
                completed: false,
                assignedTo
              }
            ]
          };
        }
        return t;
      })
    );
    addToast('success', 'Milestone Added', `New milestone scheduled for ${deadline}`);
  };

  // Ideas
  const createIdea = (data: {
    title: string;
    problemStatement: string;
    proposedSolution: string;
    category: Idea['category'];
    targetAudience: string;
    recommendedRoles: string[];
    techStack: string[];
  }) => {
    const newIdea: Idea = {
      id: 'idea_' + Date.now(),
      title: data.title,
      problemStatement: data.problemStatement,
      proposedSolution: data.proposedSolution,
      category: data.category,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      targetAudience: data.targetAudience,
      recommendedRoles: data.recommendedRoles,
      techStack: data.techStack,
      upvotes: [currentUser.id],
      comments: [],
      status: 'active',
      isSeekingCollaborators: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setIdeas((prev) => [newIdea, ...prev]);
    addToast('success', 'Idea Published!', 'Your proposal is live on the Idea Board. Students can now upvote and discuss.');
  };

  const toggleUpvoteIdea = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const hasUpvoted = idea.upvotes.includes(currentUser.id);
          const nextUpvotes = hasUpvoted
            ? idea.upvotes.filter((id) => id !== currentUser.id)
            : [...idea.upvotes, currentUser.id];
          return { ...idea, upvotes: nextUpvotes };
        }
        return idea;
      })
    );
  };

  const addCommentToIdea = (ideaId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: 'comm_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorDepartment: currentUser.department,
      content: commentText.trim(),
      createdAt: 'Just now'
    };

    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            comments: [...idea.comments, newComment]
          };
        }
        return idea;
      })
    );
    addToast('success', 'Comment Posted', 'Your feedback was shared with the idea author.');
  };

  // Hackathons
  const toggleBookmarkHackathon = (hackathonId: string) => {
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id === hackathonId) {
          const isBookmarked = h.bookmarkedUserIds.includes(currentUser.id);
          const updated = isBookmarked
            ? h.bookmarkedUserIds.filter((id) => id !== currentUser.id)
            : [...h.bookmarkedUserIds, currentUser.id];
          addToast(
            'info',
            isBookmarked ? 'Removed from Bookmarks' : 'Hackathon Tracked',
            isBookmarked ? `Unbookmarked ${h.title}` : `Added ${h.title} to your tracked events.`
          );
          return { ...h, bookmarkedUserIds: updated };
        }
        return h;
      })
    );
  };

  const registerForHackathon = (hackathonId: string) => {
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id === hackathonId) {
          if (h.registeredUserIds.includes(currentUser.id)) {
            addToast('info', 'Already Registered', `You are already registered for ${h.title}.`);
            return h;
          }
          addToast('success', 'Registered for Hackathon!', `You have registered for ${h.title}. Look for team members in Team Builder!`);
          return {
            ...h,
            registeredUserIds: [...h.registeredUserIds, currentUser.id],
            teamsFormedCount: h.teamsFormedCount + 1
          };
        }
        return h;
      })
    );
  };

  const createHackathon = (hackData: Omit<Hackathon, 'id' | 'teamsFormedCount' | 'registeredUserIds' | 'bookmarkedUserIds'>) => {
    const newHack: Hackathon = {
      ...hackData,
      id: 'hack_' + Date.now(),
      teamsFormedCount: 0,
      registeredUserIds: [currentUser.id],
      bookmarkedUserIds: [currentUser.id]
    };
    setHackathons((prev) => [newHack, ...prev]);
    addToast('success', 'Hackathon Published', `${newHack.title} is now visible to all students.`);
  };

  // Mentors
  const bookMentorshipSession = (mentorId: string, projectTopic: string, scheduledDate: string, notes?: string) => {
    const targetMentor = mentors.find((m) => m.id === mentorId);
    if (!targetMentor) return;

    const newSession: MentorshipSession = {
      id: 'sess_' + Date.now(),
      mentorId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      projectTopic,
      scheduledDate,
      durationMinutes: 45,
      status: 'pending',
      meetLink: `https://meet.google.com/incubator-${Math.random().toString(36).substring(2, 7)}`,
      notes: notes || 'Project architecture & pitch deck review.'
    };

    setMentorshipSessions((prev) => [newSession, ...prev]);

    // Send confirmation notification
    const notif: NotificationItem = {
      id: 'notif_' + Date.now(),
      userId: currentUser.id,
      type: 'mentor_response',
      title: `Mentorship Requested: ${targetMentor.name}`,
      message: `Your guidance request on "${projectTopic}" for ${scheduledDate} has been sent to ${targetMentor.name} (${targetMentor.organization}).`,
      targetId: mentorId,
      actionLabel: 'View Mentorship Status',
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications((prev) => [notif, ...prev]);

    addToast('success', 'Mentorship Request Sent', `Request submitted to ${targetMentor.name}. Check your notifications for confirmation.`);
  };

  // Notifications
  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('info', 'All Read', 'All notifications marked as read.');
  };

  const clearNotification = (notifId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notifId));
  };

  const unreadNotificationCount = notifications.filter((n) => n.userId === currentUser.id && !n.isRead).length;

  // Admin Actions & Governance
  const addAuditLog = (action: string, target: string, type: AdminAuditLog['type']) => {
    const newLog: AdminAuditLog = {
      id: 'log_' + Date.now(),
      adminName: currentUser?.name || 'Prof. Rajesh Verma',
      action,
      target,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      type
    };
    setAdminAuditLogs((prev) => [newLog, ...prev]);
  };

  const toggleUserVerification = (userId: string) => {
    const targetUser = allUsers.find((u) => u.id === userId);
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isVerified: !u.isVerified } : u))
    );
    if (targetUser) {
      const nextStatus = !targetUser.isVerified;
      addAuditLog(`Set ID Verification to ${nextStatus ? 'Verified' : 'Unverified'}`, targetUser.name, 'user');
      addToast('info', 'Verification Updated', `${targetUser.name} is now ${nextStatus ? 'Verified' : 'Unverified'}.`);
    }
  };

  const toggleUserBan = (userId: string, reason?: string) => {
    const targetUser = allUsers.find((u) => u.id === userId);
    if (!targetUser) return;
    const nextBanned = !targetUser.isBanned;
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? {
        ...u,
        isBanned: nextBanned,
        status: nextBanned ? 'suspended' : 'active'
      } : u))
    );
    addAuditLog(
      `${nextBanned ? 'Suspended / Banned' : 'Reactivated / Unbanned'} user (${reason || 'Admin Discretion'})`,
      targetUser.name,
      'security'
    );
    addToast(
      nextBanned ? 'warning' : 'success',
      nextBanned ? 'User Suspended' : 'User Reinstated',
      `${targetUser.name} account is now ${nextBanned ? 'suspended' : 'active'}.`
    );
  };

  const changeUserRole = (userId: string, newRole: UserRole) => {
    const targetUser = allUsers.find((u) => u.id === userId);
    if (!targetUser) return;
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    addAuditLog(`Promoted/Reassigned role to ${newRole.toUpperCase()}`, targetUser.name, 'role');
    addToast('success', 'User Role Updated', `${targetUser.name} is now designated as ${newRole.toUpperCase()}.`);
  };

  const deleteUser = (userId: string) => {
    const targetUser = allUsers.find((u) => u.id === userId);
    if (!targetUser) return;
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
    addAuditLog('Deactivated and purged account', targetUser.name, 'user');
    addToast('warning', 'User Removed', `${targetUser.name} has been removed from the platform.`);
  };

  const adminCreateUser = (userData: {
    name: string;
    email: string;
    role: UserRole;
    department: Department;
    headline: string;
  }) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(userData.name)}`,
      role: userData.role,
      department: userData.department,
      year: '3rd Year',
      headline: userData.headline || `${userData.role.toUpperCase()} in ${userData.department}`,
      bio: `Official campus ${userData.role} enrolled in the Project Incubator ecosystem.`,
      skills: ['Campus Leadership', 'Collaboration'],
      interests: ['Incubation', 'Projects'],
      portfolioLinks: {},
      certifications: [],
      previousProjects: [],
      badges: [
        {
          id: 'b_admin_' + Date.now(),
          title: 'Direct Enrollment',
          description: 'Provisioned by Incubator Admin',
          icon: 'ShieldCheck',
          rarity: 'rare'
        }
      ],
      isVerified: true,
      activeTeamsCount: 0,
      hackathonsWon: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAllUsers((prev) => [newUser, ...prev]);
    addAuditLog(`Directly provisioned ${userData.role.toUpperCase()} account`, `${userData.name} (${userData.email})`, 'user');
    addToast('success', 'Account Provisioned', `New ${userData.role} profile created for ${userData.name}.`);
  };

  const deleteIdea = (ideaId: string) => {
    const targetIdea = ideas.find((i) => i.id === ideaId);
    setIdeas((prev) => prev.filter((i) => i.id !== ideaId));
    if (targetIdea) {
      addAuditLog('Moderated & deleted project proposal', targetIdea.title, 'idea');
    }
    addToast('warning', 'Idea Removed', 'The proposal was removed from the community board.');
  };

  const toggleIdeaFeature = (ideaId: string) => {
    const targetIdea = ideas.find((i) => i.id === ideaId);
    if (!targetIdea) return;
    const nextStatus = targetIdea.status === 'incubating' ? 'active' : 'incubating';
    setIdeas((prev) =>
      prev.map((i) => (i.id === ideaId ? { ...i, status: nextStatus } : i))
    );
    addAuditLog(
      `Marked proposal as ${nextStatus === 'incubating' ? 'Incubator Seed Candidate' : 'Community Active'}`,
      targetIdea.title,
      'idea'
    );
    addToast('success', 'Proposal Status Updated', `"${targetIdea.title}" marked as ${nextStatus}.`);
  };

  const deleteTeam = (teamId: string) => {
    const targetTeam = teams.find((t) => t.id === teamId);
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    if (targetTeam) {
      addAuditLog('Disbanded and deleted team squad', targetTeam.name, 'team');
    }
    addToast('warning', 'Team Removed', 'The team was removed by administrator.');
  };

  const toggleTeamRecruiting = (teamId: string) => {
    const targetTeam = teams.find((t) => t.id === teamId);
    if (!targetTeam) return;
    const nextState = !targetTeam.isRecruiting;
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, isRecruiting: nextState } : t))
    );
    addAuditLog(`Set recruitment status to ${nextState ? 'Open' : 'Closed'}`, targetTeam.name, 'team');
    addToast('info', 'Team Status Updated', `Recruitment is now ${nextState ? 'Open' : 'Closed'} for ${targetTeam.name}.`);
  };

  // AI Matching Engine
  const getAIMatchesForUser = (user: User, filterDepartment?: string): MatchmakingResult[] => {
    const candidates = allUsers.filter((candidate) => candidate.id !== user.id);

    const results: MatchmakingResult[] = candidates.map((candidate) => {
      let score = 50; // base score
      const matchReasons: string[] = [];
      const complementarySkills: string[] = [];

      // 1. Department diversity bonus (Incubator goal: Multidisciplinary teams)
      if (candidate.department !== user.department) {
        score += 25;
        matchReasons.push(`High multidisciplinary synergy: ${candidate.department} + ${user.department}`);
      } else {
        score += 8;
        matchReasons.push(`Shared departmental domain expertise in ${user.department}`);
      }

      // 2. Complementary skills (skills candidate has that user doesn't)
      candidate.skills.forEach((skill) => {
        if (!user.skills.includes(skill)) {
          complementarySkills.push(skill);
        }
      });

      if (complementarySkills.length >= 3) {
        score += 15;
        matchReasons.push(`Brings ${complementarySkills.slice(0, 3).join(', ')} to your skill stack`);
      }

      // 3. Shared interests
      const sharedInterests = candidate.interests.filter((i) => user.interests.includes(i));
      if (sharedInterests.length > 0) {
        score += 10;
        matchReasons.push(`Shared passions in ${sharedInterests.slice(0, 2).join(' & ')}`);
      }

      // 4. Track record
      if (candidate.hackathonsWon > 0) {
        score += Math.min(candidate.hackathonsWon * 4, 10);
        matchReasons.push(`Proven competitor with ${candidate.hackathonsWon} hackathon awards`);
      }

      const cappedScore = Math.min(Math.max(score, 45), 99);

      let departmentSynergy = 'High Cross-Functional Fit';
      if (candidate.department.includes('Design') && user.department.includes('Computer')) {
        departmentSynergy = 'Unbeatable UI/UX + Engineering Duo';
      } else if (candidate.department.includes('Electronics') && user.department.includes('Computer')) {
        departmentSynergy = 'Full IoT / Edge Hardware-to-Cloud Pipeline';
      } else if (candidate.department.includes('Biotech') && user.department.includes('Computer')) {
        departmentSynergy = 'Precision Computational HealthTech Synergy';
      } else if (candidate.department.includes('Management')) {
        departmentSynergy = 'Commercialization & Venture Pitching Catalyst';
      }

      return {
        student: candidate,
        matchScore: cappedScore,
        complementarySkills: complementarySkills.slice(0, 4),
        matchReasons,
        departmentSynergy
      };
    });

    const filtered = filterDepartment && filterDepartment !== 'All'
      ? results.filter((r) => r.student.department === filterDepartment)
      : results;

    return filtered.sort((a, b) => b.matchScore - a.matchScore);
  };

  // AI Project Advisor
  const runProjectAdvisor = async (ideaText: string, domain: string, targetEvent?: string): Promise<AIAdvisorOutput> => {
    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: ideaText,
          domain,
          targetEvent
        })
      });

      const data = await response.json();
      if (!data.fallback && data.roadmaps && data.requiredRoles) {
        return data as AIAdvisorOutput;
      }
    } catch {
      // fallback to rich heuristic generator
    }

    // Heuristic generator based on domain
    return generateFallbackAdvisorOutput(ideaText, domain, targetEvent);
  };

  // AI Skill Recommendations
  const getSkillRecommendations = (user: User): AISkillRecommendation => {
    const isTech = user.department.includes('Computer') || user.department.includes('Data');
    const isHardware = user.department.includes('Electronics') || user.department.includes('Mechanical');
    const isDesign = user.department.includes('Design');
    const isBusiness = user.department.includes('Management');
    const isBio = user.department.includes('Biotech');

    if (isTech) {
      return {
        currentStrengths: user.skills.slice(0, 4),
        recommendedSkills: [
          {
            skill: 'FastAPI & PyTorch TensorRT',
            category: 'AI Acceleration',
            whyLearn: 'Crucial for deploying sub-50ms inference models for hackathons and edge hardware.',
            difficulty: 'Intermediate',
            matchedRoles: ['MLOps Engineer', 'AI Systems Architect']
          },
          {
            skill: 'GraphQL & WebSockets',
            category: 'Real-time Infrastructure',
            whyLearn: 'Powers collaborative canvas and live telemetry dashboards.',
            difficulty: 'Intermediate',
            matchedRoles: ['Full-Stack Lead', 'Distributed Systems Dev']
          },
          {
            skill: 'WebRTC / Zero-Knowledge Proofs',
            category: 'Emerging Web3 & Privacy',
            whyLearn: 'High demand in Web3 & decentralized hackathon prize categories.',
            difficulty: 'Advanced',
            matchedRoles: ['Cryptographic Engineer', 'Privacy Protocol Dev']
          }
        ],
        certificationsToPursue: [
          { title: 'AWS Certified Machine Learning - Specialty', provider: 'Amazon Web Services', impact: 'Recognized by top deep-tech campus recruiters' },
          { title: 'NVIDIA Certified Associate: Generative AI & LLMs', provider: 'NVIDIA Deep Learning Institute', impact: 'Accelerates grant and incubator qualifications' }
        ],
        careerTrajectories: [
          {
            title: 'Lead AI Systems Engineer',
            averagePackageEstimate: '$120,000 - $160,000',
            growthDemand: 'Very High (+38% YoY)',
            keyMilestones: ['Build 2 high-throughput inference APIs', 'Win 1 national hackathon', 'Contribute to open source']
          },
          {
            title: 'Startup Technical Co-Founder (CTO)',
            averagePackageEstimate: 'Equity + Venture Seed Grants',
            growthDemand: 'Exponential in DeepTech',
            keyMilestones: ['Form multidisciplinary team on Incubator', 'Develop functional MVP', 'Secure campus incubator seed round']
          }
        ],
        recommendedProjectIdeas: [
          'Edge AI Drone Segmentation for Smart Cities',
          'Autonomous Agent Swarm for Campus Research Summaries',
          'P2P Decentralized Compute Marketplace'
        ]
      };
    } else if (isHardware) {
      return {
        currentStrengths: user.skills.slice(0, 4),
        recommendedSkills: [
          {
            skill: 'ROS 2 Humble & Nav2',
            category: 'Robotics',
            whyLearn: 'The industry standard for commercial autonomous navigation and rover kinematics.',
            difficulty: 'Advanced',
            matchedRoles: ['Robotics Navigation Lead', 'Autonomous Flight Engineer']
          },
          {
            skill: 'KiCAD 8 & High-Speed PCB Layout',
            category: 'Hardware Design',
            whyLearn: 'Design custom 4-layer boards with impedance control and microstrip antennas.',
            difficulty: 'Intermediate',
            matchedRoles: ['Hardware PCB Architect', 'Embedded Firmware Engineer']
          },
          {
            skill: 'TinyML on ARM Cortex-M4',
            category: 'Edge Machine Learning',
            whyLearn: 'Deploy neural network keyword spotting and vibration anomaly detectors under 100KB RAM.',
            difficulty: 'Intermediate',
            matchedRoles: ['Edge AI Specialist', 'IoT Sensor Developer']
          }
        ],
        certificationsToPursue: [
          { title: 'ARM Accredited MCU Engineer (AAME)', provider: 'ARM Education', impact: 'Gold standard for embedded hardware design' },
          { title: 'IPC-A-610 PCB Assembly Specialist', provider: 'IPC Electronics Association', impact: 'Essential for industrial hardware prototyping' }
        ],
        careerTrajectories: [
          {
            title: 'Robotics & Avionics Engineer',
            averagePackageEstimate: '$105,000 - $145,000',
            growthDemand: 'High (+29% YoY)',
            keyMilestones: ['Prototype multi-sensor payload', 'Publish open-source ROS package', 'Win hardware hackathon']
          }
        ],
        recommendedProjectIdeas: [
          'Precision Ag Drone Optical Flow Sensor Array',
          'Low-Cost Prosthetic Bionic Hand with EMG Haptics',
          'Smart Microgrid Bi-Directional Energy Monitor'
        ]
      };
    } else if (isDesign) {
      return {
        currentStrengths: user.skills.slice(0, 4),
        recommendedSkills: [
          {
            skill: 'Design Systems Architecture & Token Management',
            category: 'UI/UX Craft',
            whyLearn: 'Scale unified design tokens seamlessly across Figma and Tailwind/React codebases.',
            difficulty: 'Intermediate',
            matchedRoles: ['Design Systems Architect', 'Principal Product Designer']
          },
          {
            skill: 'Spline 3D & WebGL Micro-interactions',
            category: 'Creative Tech',
            whyLearn: 'Creates unforgettable presentation demos that win judges over in competitive pitch showcases.',
            difficulty: 'Beginner',
            matchedRoles: ['Creative Technologist', 'Spatial UX Designer']
          }
        ],
        certificationsToPursue: [
          { title: 'NN/g UX Master Certified', provider: 'Nielsen Norman Group', impact: 'Highest credential for user research rigor' }
        ],
        careerTrajectories: [
          {
            title: 'Lead Product Designer',
            averagePackageEstimate: '$95,000 - $135,000',
            growthDemand: 'High (+24% YoY)',
            keyMilestones: ['Create design system with 50+ tokens', 'Lead UX for 2 incubated startups']
          }
        ],
        recommendedProjectIdeas: [
          'Accessible Ground Control Station for Agricultural Drones',
          'Point-of-Care Clinical Diagnostic Tablet Interface'
        ]
      };
    } else if (isBio) {
      return {
        currentStrengths: user.skills.slice(0, 4),
        recommendedSkills: [
          {
            skill: 'Biopython & AlphaFold Informatics',
            category: 'Computational Biology',
            whyLearn: 'Bridges wet-lab experiments with predictive molecular structure simulations.',
            difficulty: 'Advanced',
            matchedRoles: ['Bioinformatics Specialist', 'Computational Geneticist']
          },
          {
            skill: 'Microfluidic Chip CAD & 3D Resin Printing',
            category: 'Bio-Hardware',
            whyLearn: 'Fabricate custom laminar flow channels in under 2 hours without cleanroom access.',
            difficulty: 'Intermediate',
            matchedRoles: ['Point-of-Care Diagnostic Lead', 'Microfluidics Engineer']
          }
        ],
        certificationsToPursue: [
          { title: 'Genomic Data Science Specialization', provider: 'Johns Hopkins University', impact: 'Accelerates grant funding and pharmaceutical collaborations' }
        ],
        careerTrajectories: [
          {
            title: 'HealthTech & Bio-Incubator Founder',
            averagePackageEstimate: 'Venture & NIH Grant Backed',
            growthDemand: 'Exponential (+42% YoY)',
            keyMilestones: ['Validate lateral flow sensitivity in lab', 'Patent microfluidic assay architecture']
          }
        ],
        recommendedProjectIdeas: [
          'Saliva-based Rapid Pathogen Diagnostic Sensor',
          'Smartphone Fluorometer for Water Contamination'
        ]
      };
    } else {
      // Business / Finance / Others
      return {
        currentStrengths: user.skills.slice(0, 4),
        recommendedSkills: [
          {
            skill: 'Financial Modeling & Venture Seed Structuring',
            category: 'Startup Finance',
            whyLearn: 'Build pro-forma financial forecasts and valuation models for angel and VC meetings.',
            difficulty: 'Intermediate',
            matchedRoles: ['Chief Business Officer', 'Venture Strategist']
          },
          {
            skill: 'AI Product Management & User Analytics',
            category: 'Product Strategy',
            whyLearn: 'Define PRDs, north-star metrics, and customer discovery interviews for deep-tech prototypes.',
            difficulty: 'Beginner',
            matchedRoles: ['Product Manager', 'Growth Lead']
          }
        ],
        certificationsToPursue: [
          { title: 'Venture Capital Executive Program', provider: 'Stanford Online / NVCA', impact: 'Prestigious credential for startup leadership' }
        ],
        careerTrajectories: [
          {
            title: 'Startup Co-Founder & Head of Operations',
            averagePackageEstimate: '$90,000 - $130,000 + Equity',
            growthDemand: 'Strong in Campus Incubators',
            keyMilestones: ['Raise university seed grant', 'Win pitch competition', 'Sign first 3 enterprise pilots']
          }
        ],
        recommendedProjectIdeas: [
          'Campus Carbon Offset Credit Exchange Platform',
          'Decentralized Micro-Lending Pool for University Research Grants'
        ]
      };
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        currentPortal,
        switchPortal,
        isAuthenticated,
        login,
        loginWithUser,
        logout,
        currentUser,
        allUsers,
        switchUser,
        updateProfile,
        registerStudent,
        requestPasswordReset,
        teams,
        applications,
        createTeam,
        applyToTeam,
        handleApplicationDecision,
        toggleMilestone,
        addMilestone,
        ideas,
        createIdea,
        toggleUpvoteIdea,
        addCommentToIdea,
        hackathons,
        toggleBookmarkHackathon,
        registerForHackathon,
        createHackathon,
        mentors,
        mentorshipSessions,
        bookMentorshipSession,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotification,
        toggleUserVerification,
        toggleUserBan,
        changeUserRole,
        deleteUser,
        adminCreateUser,
        deleteTeam,
        toggleTeamRecruiting,
        deleteIdea,
        toggleIdeaFeature,
        adminAuditLogs,
        addAuditLog,
        getAIMatchesForUser,
        runProjectAdvisor,
        getSkillRecommendations,
        selectedStudent,
        setSelectedStudent,
        selectedTeam,
        setSelectedTeam,
        selectedMentor,
        setSelectedMentor,
        selectedHackathonForRecruitment,
        setSelectedHackathonForRecruitment,
        updateUserProfile: updateProfile,
        upvoteIdea: toggleUpvoteIdea,
        addIdeaComment: addCommentToIdea,
        askAIAdvisor: (name: string, domain: string, desc: string, targetEvent?: string) =>
          runProjectAdvisor(`${name}: ${desc}`, domain, targetEvent),
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCreateTeamModalOpen,
        setIsCreateTeamModalOpen,
        isPostIdeaModalOpen,
        setIsPostIdeaModalOpen,
        isEditProfileModalOpen,
        setIsEditProfileModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Helper heuristic advisor output
function generateFallbackAdvisorOutput(ideaText: string, domain: string, targetEvent?: string): AIAdvisorOutput {
  const isHardware = domain.toLowerCase().includes('robot') || domain.toLowerCase().includes('drone') || domain.toLowerCase().includes('iot');
  const isHealth = domain.toLowerCase().includes('health') || domain.toLowerCase().includes('bio') || domain.toLowerCase().includes('med');

  return {
    summary: `Your project "${ideaText.slice(0, 60)}..." demonstrates significant multidisciplinary potential. Combining domain engineering with intuitive user experience will set your team apart at ${targetEvent || 'upcoming hackathons'}.`,
    roadmaps: [
      {
        phase: 'Phase 1: Architecture & Multidisciplinary Kickoff (Weeks 1-2)',
        deliverables: [
          'Formalize API contracts and pinout schematics between hardware/sensor and cloud',
          'Conduct 5 user discovery interviews with target stakeholders',
          'Wireframe core user journeys and judge presentation deck skeleton'
        ],
        keyMilestone: 'Validated functional feasibility with low-fidelity proof of concept'
      },
      {
        phase: 'Phase 2: Alpha Prototyping & Sensor Integration (Weeks 3-4)',
        deliverables: [
          isHardware ? 'Fabricate 3D enclosure and assemble custom ESP32/STM32 breakout' : 'Build core algorithm pipeline and containerize with Docker',
          'Design responsive web/mobile dashboard with real-time WebSocket telemetry',
          'Implement test suite simulating high-concurrency edge cases'
        ],
        keyMilestone: 'End-to-end integration: Live sensor/algorithm data visible in user dashboard'
      },
      {
        phase: 'Phase 3: Stress Testing, Pilot Deployment & Pitch Polish (Weeks 5-6)',
        deliverables: [
          'Run outdoor or simulated stress tests under extreme conditions',
          'Produce a 90-second dynamic demo video showcasing working hardware/software',
          'Prepare venture pitch deck with unit economics, defensibility, and IP claims'
        ],
        keyMilestone: 'Stage-ready working prototype with verified performance benchmarks'
      }
    ],
    requiredRoles: [
      {
        role: 'AI / Full-Stack Systems Lead',
        department: 'Computer Science & Eng',
        skills: ['TypeScript', 'FastAPI', 'Docker', 'WebSockets'],
        responsibilities: 'Architect low-latency backend pipelines, manage database state, and ensure cloud uptime.'
      },
      {
        role: isHardware ? 'Avionics & Embedded Firmware Engineer' : (isHealth ? 'Microfluidics / Sensor Specialist' : 'Data Scientist / ML Engineer'),
        department: isHardware ? 'Electronics & Comm' : (isHealth ? 'Biotech & Biomedical' : 'Data Science & AI'),
        skills: isHardware ? ['C/C++', 'ROS 2', 'KiCAD', 'ESP32'] : (isHealth ? ['Microfluidics', 'Bio-Hardware', 'Python'] : ['PyTorch', 'Data Pipelines']),
        responsibilities: 'Develop physical telemetry sensors, edge firmware, and hardware signal conditioning.'
      },
      {
        role: 'Principal Product & Interaction Designer',
        department: 'Design & Creative Media',
        skills: ['Figma', 'User Research', 'Design Systems', 'Motion UX'],
        responsibilities: 'Craft the intuitive user interface, accessible color palette, and high-impact pitch visual deck.'
      },
      {
        role: 'Product Strategist & Commercialization Lead',
        department: 'Management & FinTech',
        skills: ['Pitching', 'Market Sizing', 'Financial Projections', 'Customer Discovery'],
        responsibilities: 'Identify grant funding, formulate business models, and lead the team presentation to judges.'
      }
    ],
    recommendedTechStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'Recharts'],
      backend: ['FastAPI (Python)', 'Node.js / Express', 'WebSockets', 'Redis'],
      aiOrHardware: isHardware ? ['ESP32-S3', 'ROS 2 Humble', 'STM32', 'KiCad'] : ['PyTorch 2.4', 'ONNX Runtime', 'Gemini 3.8 Flash'],
      cloudDatabase: ['PostgreSQL', 'TimescaleDB (for telemetry)', 'Docker', 'Google Cloud Platform']
    },
    learningResources: [
      {
        title: 'High-Velocity Hackathon Architecture Guide',
        type: 'Open Source Handbook',
        description: 'Best practices for organizing monorepos and rapid API mocking under 48 hours.'
      },
      {
        title: 'FastAPI & PyTorch Edge Deployment Playbook',
        type: 'Interactive Tutorial',
        description: 'Step-by-step guide on quantizing neural models and streaming predictions via WebSockets.'
      },
      {
        title: 'The University Founder Pitch Deck Framework',
        type: 'Venture Capital Guide',
        description: 'How collegiate teams structure slide decks to win national hackathon prize pools and angel backing.'
      }
    ],
    hackathonTips: [
      'Focus 70% of judge demo time on the live working prototype rather than conceptual slides.',
      'Highlight multidisciplinary synergy: Judges award top points to teams bridging disparate academic faculties.',
      'Prepare a fallback offline recording of the demo in case venue Wi-Fi or cellular connections fluctuate during judging.'
    ]
  };
}
