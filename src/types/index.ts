export type Department = 
  | 'Computer Science & Eng'
  | 'Electronics & Comm'
  | 'Mechanical & Robotics'
  | 'Biotech & Biomedical'
  | 'Design & Creative Media'
  | 'Management & FinTech'
  | 'Data Science & AI';

export type YearOfStudy = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Postgraduate / PhD';

export type UserRole = 'student' | 'mentor' | 'admin';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  technologies: string[];
  role: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  department: Department;
  year: YearOfStudy;
  headline: string;
  bio: string;
  skills: string[];
  interests: string[];
  portfolioLinks: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    behance?: string;
  };
  certifications: Certification[];
  previousProjects: ProjectItem[];
  badges: Badge[];
  isVerified: boolean;
  isBanned?: boolean;
  status?: 'active' | 'suspended';
  activeTeamsCount: number;
  hackathonsWon: number;
  createdAt: string;
}

export type PortalMode = 'user' | 'admin';

export interface AdminAuditLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'user' | 'role' | 'team' | 'idea' | 'event' | 'security';
}

export interface TeamMember {
  userId: string;
  name: string;
  avatar: string;
  roleTitle: string;
  department: Department;
  isLeader: boolean;
  joinedAt: string;
}

export interface TeamRoleNeeded {
  id: string;
  title: string;
  department: Department;
  skillsRequired: string[];
  openSlots: number;
  filledSlots: number;
  description: string;
}

export interface TeamMilestone {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  assignedTo?: string;
}

export interface TeamApplication {
  id: string;
  teamId: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar: string;
  applicantDepartment: Department;
  roleId: string;
  roleTitle: string;
  message: string;
  skills: string[];
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Team {
  id: string;
  name: string;
  tagline: string;
  description: string;
  projectGoal: string;
  targetHackathon?: string;
  category: 'Hackathon Squad' | 'Startup Incubator' | 'Research Initiative' | 'Coursework Capstone';
  creatorId: string;
  members: TeamMember[];
  rolesNeeded: TeamRoleNeeded[];
  milestones: TeamMilestone[];
  isRecruiting: boolean;
  tags: string[];
  createdAt: string;
}

export type IdeaCategory = 'Startup Idea' | 'Research Proposal' | 'Hackathon Concept' | 'Social Impact' | 'Campus Tech';

export interface IdeaComment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: Department;
  content: string;
  createdAt: string;
}

export interface Idea {
  id: string;
  title: string;
  problemStatement: string;
  proposedSolution: string;
  category: IdeaCategory;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorDepartment: Department;
  targetAudience: string;
  recommendedRoles: string[];
  techStack: string[];
  upvotes: string[]; // user IDs who upvoted
  comments: IdeaComment[];
  status: 'active' | 'in_team_formation' | 'incubating' | 'archived';
  isSeekingCollaborators: boolean;
  createdAt: string;
}

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  banner: string;
  description: string;
  prizePool: string;
  mode: 'Online' | 'Hybrid' | 'In-Person';
  location: string;
  startDate: string;
  endDate: string;
  deadlineDate: string;
  themes: string[];
  eligibility: string;
  registrationLink: string;
  teamsFormedCount: number;
  registeredUserIds: string[];
  bookmarkedUserIds: string[];
  isFeatured?: boolean;
}

export type MentorType = 'Faculty' | 'Alumni' | 'Industry Professional';

export interface MentorshipSession {
  id: string;
  mentorId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  projectTopic: string;
  scheduledDate: string;
  durationMinutes: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetLink?: string;
  notes?: string;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  type: MentorType;
  designation: string;
  organization: string; // e.g., 'Google', 'IIT Bombay', 'DeepMind', 'Microsoft'
  departmentOrField: string;
  bio: string;
  expertise: string[];
  availableSlots: string[];
  rating: number;
  totalMentees: number;
  linkedin?: string;
}

export type NotificationType = 
  | 'team_invitation'
  | 'collaboration_request'
  | 'event_reminder'
  | 'mentor_response'
  | 'project_update';

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  senderName?: string;
  senderAvatar?: string;
  targetId?: string; // teamId, hackathonId, or mentorSessionId
  actionLabel?: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AIAdvisorOutput {
  summary: string;
  roadmaps: Array<{
    phase: string;
    deliverables: string[];
    keyMilestone: string;
  }>;
  requiredRoles: Array<{
    role: string;
    department: string;
    skills: string[];
    responsibilities: string;
  }>;
  recommendedTechStack: {
    frontend: string[];
    backend: string[];
    aiOrHardware: string[];
    cloudDatabase: string[];
  };
  learningResources: Array<{
    title: string;
    type: string;
    description: string;
  }>;
  hackathonTips: string[];
}

export interface AISkillRecommendation {
  currentStrengths: string[];
  recommendedSkills: Array<{
    skill: string;
    category: string;
    whyLearn: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    matchedRoles: string[];
  }>;
  certificationsToPursue: Array<{
    title: string;
    provider: string;
    impact: string;
  }>;
  careerTrajectories: Array<{
    title: string;
    averagePackageEstimate: string;
    growthDemand: string;
    keyMilestones: string[];
  }>;
  recommendedProjectIdeas: string[];
}

export interface MatchmakingResult {
  student: User;
  matchScore: number;
  complementarySkills: string[];
  matchReasons: string[];
  departmentSynergy: string;
}
