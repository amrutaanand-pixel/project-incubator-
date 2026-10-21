import { User, Team, Idea, Hackathon, Mentor, NotificationItem } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr_1',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Computer Science & Eng',
    year: '3rd Year',
    headline: 'AI & Distributed Systems Enthusiast | 2x Hackathon Finalist',
    bio: 'Passionate about building scalable AI infrastructure and edge computing solutions. Looking to collaborate with hardware engineers and UX designers on healthcare and smart city problems.',
    skills: ['PyTorch', 'TypeScript', 'React', 'FastAPI', 'Docker', 'GraphQL', 'Next.js', 'PostgreSQL'],
    interests: ['Computer Vision', 'Edge AI', 'Decentralized Systems', 'HealthTech', 'Open Source'],
    portfolioLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      portfolio: 'https://priyasharma.dev'
    },
    certifications: [
      {
        id: 'cert_1',
        name: 'Deep Learning Specialization',
        issuer: 'DeepLearning.AI',
        issuedDate: 'Nov 2025'
      },
      {
        id: 'cert_2',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issuedDate: 'Jan 2026'
      }
    ],
    previousProjects: [
      {
        id: 'proj_1',
        title: 'RetinaScan AI',
        description: 'Diabetic retinopathy detection pipeline running on lightweight edge devices with 94.2% sensitivity.',
        technologies: ['PyTorch', 'TensorRT', 'FastAPI', 'React Native'],
        role: 'ML Lead & Architecture',
        link: 'https://github.com',
        featured: true
      },
      {
        id: 'proj_2',
        title: 'PeerMesh Campus Sync',
        description: 'Local P2P mesh network protocol for offline campus emergency communications.',
        technologies: ['WebRTC', 'Go', 'TypeScript'],
        role: 'Systems Programmer'
      }
    ],
    badges: [
      { id: 'b1', title: 'Hackathon Finalist', description: 'Placed Top 3 at Smart India Hackathon 2025', icon: 'Trophy', rarity: 'epic' },
      { id: 'b2', title: 'Multidisciplinary Catalyst', description: 'Collaborated across 3+ distinct engineering departments', icon: 'Sparkles', rarity: 'legendary' },
      { id: 'b3', title: 'Top Idea Creator', description: 'Authored ideas with over 150 community endorsements', icon: 'Flame', rarity: 'rare' }
    ],
    isVerified: true,
    activeTeamsCount: 2,
    hackathonsWon: 2,
    createdAt: '2025-08-15'
  },
  {
    id: 'usr_2',
    name: 'Alex Chen',
    email: 'alex.chen@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Electronics & Comm',
    year: '4th Year',
    headline: 'Embedded Firmware & Robotics Specialist | Drone Aviator',
    bio: 'Bridging the physical and digital world with STM32, ESP32, and ROS2. Building autonomous sensory arrays and high-payload UAV flight controllers.',
    skills: ['C/C++', 'ROS 2', 'Embedded Linux', 'ESP32', 'KiCAD', 'Soldering', 'CAN Bus', 'Sensors'],
    interests: ['Autonomous Drones', 'Industrial IoT', 'Swarm Robotics', 'Precision Agriculture'],
    portfolioLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    certifications: [
      {
        id: 'cert_3',
        name: 'Autonomous Systems & ROS Certification',
        issuer: 'ConstructSim',
        issuedDate: 'Aug 2025'
      }
    ],
    previousProjects: [
      {
        id: 'proj_3',
        title: 'AeroScout Hexacopter',
        description: 'Custom carbon-fiber 6-rotor autonomous drone with optical flow stabilization for solar farm inspection.',
        technologies: ['ROS2', 'STM32', 'PX4 Autopilot', 'Python'],
        role: 'Hardware & Avionics Lead',
        featured: true
      }
    ],
    badges: [
      { id: 'b4', title: 'Hardware Wizard', description: 'Designed 5+ functional multi-layer PCB circuits', icon: 'Cpu', rarity: 'epic' },
      { id: 'b5', title: 'Hackathon Champion', description: '1st Place in National Hardware Hackathon', icon: 'Medal', rarity: 'legendary' }
    ],
    isVerified: true,
    activeTeamsCount: 1,
    hackathonsWon: 3,
    createdAt: '2025-07-10'
  },
  {
    id: 'usr_3',
    name: 'Maya Lin',
    email: 'maya.lin@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Design & Creative Media',
    year: '2nd Year',
    headline: 'Product Designer & Design Systems Advocate | Figma Ace',
    bio: 'Crafting intuitive user interfaces and cohesive design languages. Believer that cutting-edge technology is only as good as its human experience.',
    skills: ['Figma', 'UI/UX Design', 'Design Systems', 'User Research', 'Prototyping', 'After Effects', 'Spline 3D', 'Tailwind CSS'],
    interests: ['Accessibility', 'Spatial Computing', 'Micro-interactions', 'SaaS Usability'],
    portfolioLinks: {
      behance: 'https://behance.net',
      portfolio: 'https://mayadesigns.space'
    },
    certifications: [
      {
        id: 'cert_4',
        name: 'Google UX Design Professional Certificate',
        issuer: 'Google',
        issuedDate: 'Dec 2025'
      }
    ],
    previousProjects: [
      {
        id: 'proj_4',
        title: 'Kinetix Design System',
        description: 'Accessible 100+ component design library for university hackathons and student ventures.',
        technologies: ['Figma', 'Tokens Studio', 'React'],
        role: 'Principal Designer',
        featured: true
      }
    ],
    badges: [
      { id: 'b6', title: 'Design Virtuoso', description: 'Awarded Best UI/UX in 4 campus showcases', icon: 'Palette', rarity: 'rare' },
      { id: 'b7', title: 'Community Mentor', description: 'Conducted design thinking workshops for 200+ engineers', icon: 'Users', rarity: 'epic' }
    ],
    isVerified: true,
    activeTeamsCount: 2,
    hackathonsWon: 1,
    createdAt: '2025-09-01'
  },
  {
    id: 'usr_4',
    name: 'Marcus Vance',
    email: 'marcus.v@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Management & FinTech',
    year: '3rd Year',
    headline: 'Product Strategist | Financial Modeling & VC Pitching Specialist',
    bio: 'Helping deep-tech and engineering founders articulate product-market fit, unit economics, and venture fundable business models.',
    skills: ['Product Management', 'Financial Modeling', 'Pitch Deck Design', 'Go-To-Market Strategy', 'Market Sizing', 'Competitor Analysis', 'SQL'],
    interests: ['Venture Capital', 'DeFi / FinTech', 'CleanTech Scaling', 'EdTech Marketplaces'],
    portfolioLinks: {
      linkedin: 'https://linkedin.com'
    },
    certifications: [
      {
        id: 'cert_5',
        name: 'Venture Capital & Private Equity Analyst',
        issuer: 'Wharton Online',
        issuedDate: 'Oct 2025'
      }
    ],
    previousProjects: [
      {
        id: 'proj_5',
        title: 'MicroLoan Protocol Pitch Deck',
        description: 'Led pitch architecture securing $25K seed grant at Global Student Startup Summit.',
        technologies: ['Financial Forecasting', 'Deck Strategy', 'Market Analysis'],
        role: 'Venture & Finance Strategist'
      }
    ],
    badges: [
      { id: 'b8', title: 'Venture Builder', description: 'Helped raise university venture grants for 3 teams', icon: 'TrendingUp', rarity: 'epic' }
    ],
    isVerified: true,
    activeTeamsCount: 1,
    hackathonsWon: 2,
    createdAt: '2025-08-20'
  },
  {
    id: 'usr_5',
    name: 'Dr. Ananya Iyer',
    email: 'ananya.iyer@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Biotech & Biomedical',
    year: 'Postgraduate / PhD',
    headline: 'Computational Genomics Researcher | Point-of-Care Biosensors',
    bio: 'Researching CRISPR screening informatics and low-cost diagnostic microfluidics. Looking for CS partners to build AI diagnostic classification pipelines.',
    skills: ['Bioinformatics', 'Microfluidics', 'Biostatistics', 'Python', 'R', 'PCR Testing', 'Cell Culture', 'Lab-on-a-Chip'],
    interests: ['Diagnostics', 'Rare Disease Genomics', 'Bio-Hardware', 'Synthetic Biology'],
    portfolioLinks: {
      portfolio: 'https://ananyaiyer.science'
    },
    certifications: [
      {
        id: 'cert_6',
        name: 'NIH Genomic Data Analysis',
        issuer: 'National Institutes of Health',
        issuedDate: 'Jul 2025'
      }
    ],
    previousProjects: [
      {
        id: 'proj_6',
        title: 'BioSense Micro-Array',
        description: 'Impedance-based pathogen detector on paper substrates for rural health clinics.',
        technologies: ['Biochemistry', 'Python', 'Eagle CAD'],
        role: 'Primary Investigator',
        featured: true
      }
    ],
    badges: [
      { id: 'b9', title: 'Research Pioneer', description: 'Co-authored 2 published IEEE/Nature peer-reviewed papers', icon: 'BookOpen', rarity: 'legendary' }
    ],
    isVerified: true,
    activeTeamsCount: 1,
    hackathonsWon: 1,
    createdAt: '2025-06-12'
  },
  {
    id: 'usr_6',
    name: 'Rohan Kulkarni',
    email: 'rohan.k@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=250&auto=format&fit=crop&q=80',
    role: 'student',
    department: 'Mechanical & Robotics',
    year: '3rd Year',
    headline: 'CAD / FEA Specialist | Kinetic Mechanisms & Autonomous Roombot Dev',
    bio: 'Designing lightweight generative structures and robotic kinematic linkages with SolidWorks, Fusion360, and additive manufacturing.',
    skills: ['SolidWorks', 'Fusion 360', '3D Printing', 'FEA Simulation', 'Actuator Sizing', 'Kinematics', 'MATLAB / Simulink'],
    interests: ['Exoskeletons', 'Autonomous Rovers', 'AgriTech Automation', 'Electric Mobility'],
    portfolioLinks: {
      portfolio: 'https://rohanmech.design'
    },
    certifications: [
      {
        id: 'cert_7',
        name: 'Certified SOLIDWORKS Professional (CSWP)',
        issuer: 'Dassault Systèmes',
        issuedDate: 'Sep 2025'
      }
    ],
    previousProjects: [
      {
        id: 'proj_7',
        title: 'AgriRover Multi-Terrain Chassis',
        description: 'Rocker-bogie rover suspension capable of 45-degree slope traversal for soil probe sampling.',
        technologies: ['SolidWorks', 'Ansys FEA', 'Carbon Fiber 3D Print'],
        role: 'Chassis Lead'
      }
    ],
    badges: [
      { id: 'b10', title: 'Rapid Prototyper', description: 'Fabricated 20+ functional mechanical assemblies', icon: 'Wrench', rarity: 'rare' }
    ],
    isVerified: true,
    activeTeamsCount: 1,
    hackathonsWon: 1,
    createdAt: '2025-08-01'
  },
  {
    id: 'usr_admin',
    name: 'Prof. Rajesh Verma',
    email: 'rajesh.verma@campus.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&auto=format&fit=crop&q=80',
    role: 'admin',
    department: 'Computer Science & Eng',
    year: 'Postgraduate / PhD',
    headline: 'Incubator Director & Faculty Advisor for Student Innovation',
    bio: 'Overseeing interdisciplinary campus innovation, venture incubation grants, and national hackathon sponsorships.',
    skills: ['Incubation Management', 'Distributed AI', 'Grant Allocations', 'IP & Patents', 'Industry Partnerships'],
    interests: ['DeepTech Startups', 'Student Mentorship', 'Interdisciplinary Curriculum'],
    portfolioLinks: {
      linkedin: 'https://linkedin.com'
    },
    certifications: [],
    previousProjects: [],
    badges: [
      { id: 'b_admin', title: 'Incubator Director', description: 'Platform Administrator & Chief Mentor', icon: 'ShieldCheck', rarity: 'legendary' }
    ],
    isVerified: true,
    activeTeamsCount: 0,
    hackathonsWon: 0,
    createdAt: '2024-01-01'
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team_1',
    name: 'AeroPulse Vision',
    tagline: 'Autonomous crop disease detection via high-precision UAV thermal imaging',
    description: 'We are engineering an integrated aerial payload combining autonomous drone navigation with real-time PyTorch semantic segmentation to detect early-stage fungal outbreaks in commercial orchards.',
    projectGoal: 'Win Smart India Hackathon 2026 AgriTech track & build a commercial prototype',
    targetHackathon: 'Smart India Hackathon 2026',
    category: 'Hackathon Squad',
    creatorId: 'usr_1',
    members: [
      {
        userId: 'usr_1',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Team Lead & AI Vision Architect',
        department: 'Computer Science & Eng',
        isLeader: true,
        joinedAt: '2026-01-10'
      },
      {
        userId: 'usr_2',
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Embedded Avionics & Flight Control',
        department: 'Electronics & Comm',
        isLeader: false,
        joinedAt: '2026-01-12'
      }
    ],
    rolesNeeded: [
      {
        id: 'r_1',
        title: 'UI/UX & Mobile Dashboard Designer',
        department: 'Design & Creative Media',
        skillsRequired: ['Figma', 'Mobile UI', 'User Testing'],
        openSlots: 1,
        filledSlots: 0,
        description: 'Design the handheld ground control station UI for farmers with high contrast and one-tap flight paths.'
      },
      {
        id: 'r_2',
        title: 'Mechanical Payload Specialist',
        department: 'Mechanical & Robotics',
        skillsRequired: ['SolidWorks', '3D Printing', 'Gimbal Stabilization'],
        openSlots: 1,
        filledSlots: 0,
        description: 'Design a 3-axis vibration-dampened camera gimbal mount under 320 grams.'
      }
    ],
    milestones: [
      { id: 'm1', title: 'Complete Jetson Nano tensorRT benchmark', deadline: '2026-10-05', completed: true, assignedTo: 'Priya Sharma' },
      { id: 'm2', title: 'Calibrate optical flow positioning in outdoor test field', deadline: '2026-10-18', completed: false, assignedTo: 'Alex Chen' },
      { id: 'm3', title: 'First flight with live video streaming to cloud', deadline: '2026-11-02', completed: false }
    ],
    isRecruiting: true,
    tags: ['Drone Tech', 'PyTorch', 'ROS2', 'AgriTech', 'SIH 2026'],
    createdAt: '2026-01-10'
  },
  {
    id: 'team_2',
    name: 'BioSense NanoLab',
    tagline: 'Point-of-care rapid microfluidic saliva testing for infectious biomarkers',
    description: 'Developing a pocket-sized biosensor device paired with a smartphone optical analyzer that provides quantitative diagnostic results in under 8 minutes without laboratory equipment.',
    projectGoal: 'Submit working prototype for ETHGlobal HealthTech Track & National Innovation Grant',
    targetHackathon: 'ETHGlobal NextGen Hackathon',
    category: 'Startup Incubator',
    creatorId: 'usr_5',
    members: [
      {
        userId: 'usr_5',
        name: 'Dr. Ananya Iyer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Biochemistry & Microfluidics Lead',
        department: 'Biotech & Biomedical',
        isLeader: true,
        joinedAt: '2026-01-05'
      },
      {
        userId: 'usr_3',
        name: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Product & Clinical Ergonomics Designer',
        department: 'Design & Creative Media',
        isLeader: false,
        joinedAt: '2026-01-15'
      }
    ],
    rolesNeeded: [
      {
        id: 'r_3',
        title: 'Full-Stack Software Engineer',
        department: 'Computer Science & Eng',
        skillsRequired: ['React', 'FastAPI', 'Bluetooth Web API'],
        openSlots: 1,
        filledSlots: 0,
        description: 'Build web dashboard that pairs over WebBluetooth to ingest optical spectrum sensor readings and plot patient reports.'
      },
      {
        id: 'r_4',
        title: 'Commercialization & Grant Strategist',
        department: 'Management & FinTech',
        skillsRequired: ['Grant Writing', 'Financial Projections', 'FDA Compliance Knowledge'],
        openSlots: 1,
        filledSlots: 0,
        description: 'Conduct clinical partner outreach and write university venture competition investment memorandum.'
      }
    ],
    milestones: [
      { id: 'm4', title: 'Validate antigen assay sensitivity on paper microfluidics', deadline: '2026-10-12', completed: true, assignedTo: 'Dr. Ananya Iyer' },
      { id: 'm5', title: 'Complete handheld casing 3D print with light trap', deadline: '2026-10-25', completed: false, assignedTo: 'Maya Lin' }
    ],
    isRecruiting: true,
    tags: ['MedTech', 'Biomarkers', 'Microfluidics', 'Patent Pending'],
    createdAt: '2026-01-05'
  },
  {
    id: 'team_3',
    name: 'VoltShare MicroGrid',
    tagline: 'P2P decentralized renewable energy trading for student dorms & smart campuses',
    description: 'Empowering solar-equipped campus buildings and dorms to autonomously sell surplus battery capacity to neighbors using smart contracts and smart IoT energy meters.',
    projectGoal: 'Deploy pilot test on Engineering Quad rooftops and compete in Google Cloud Sustainability Challenge',
    targetHackathon: 'Google Cloud Sustainability Challenge',
    category: 'Research Initiative',
    creatorId: 'usr_4',
    members: [
      {
        userId: 'usr_4',
        name: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Project Lead & Tokenomics Architect',
        department: 'Management & FinTech',
        isLeader: true,
        joinedAt: '2026-01-20'
      },
      {
        userId: 'usr_1',
        name: 'Priya Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
        roleTitle: 'Cloud Backend & Smart Contract Developer',
        department: 'Computer Science & Eng',
        isLeader: false,
        joinedAt: '2026-01-22'
      }
    ],
    rolesNeeded: [
      {
        id: 'r_5',
        title: 'Smart Meter Firmware Engineer',
        department: 'Electronics & Comm',
        skillsRequired: ['ESP32', 'Current Transformers', 'MQTT', 'C++'],
        openSlots: 1,
        filledSlots: 0,
        description: 'Program ESP32-based energy monitors communicating telemetry securely via TLS MQTT.'
      }
    ],
    milestones: [
      { id: 'm6', title: 'Draft campus energy regulatory whitepaper', deadline: '2026-09-30', completed: true, assignedTo: 'Marcus Vance' },
      { id: 'm7', title: 'Integrate real-time solar simulation telemetry', deadline: '2026-10-20', completed: false, assignedTo: 'Priya Sharma' }
    ],
    isRecruiting: true,
    tags: ['CleanTech', 'IoT', 'Google Cloud', 'FinTech', 'Smart Grid'],
    createdAt: '2026-01-20'
  }
];

export const INITIAL_IDEAS: Idea[] = [
  {
    id: 'idea_1',
    title: 'AuraAssist: Smart Haptic & Audio Navigation Glasses for Visually Impaired',
    problemStatement: 'Existing white canes only detect obstacles at ground level. Visually impaired students frequently bump into overhead obstacles, glass doors, and poorly lit stairs on campus.',
    proposedSolution: 'Lightweight smart glasses equipped with dual ToF (Time-of-Flight) depth sensors and ultrasonic sonar that translate spatial distances into subtle bone-conduction audio cues and haptic temple vibrations.',
    category: 'Startup Idea',
    authorId: 'usr_2',
    authorName: 'Alex Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
    authorDepartment: 'Electronics & Comm',
    targetAudience: 'Visually impaired students, elderly individuals, accessibility organizations',
    recommendedRoles: ['Embedded Hardware Engineer', 'Mobile App Dev (Flutter)', 'Ergonomic Product Designer', 'Accessibility Researcher'],
    techStack: ['STM32', 'Ultrasonic ToF', 'Bluetooth LE', 'Flutter', '3D CAD'],
    upvotes: ['usr_1', 'usr_3', 'usr_4', 'usr_5'],
    comments: [
      {
        id: 'c1',
        authorId: 'usr_3',
        authorName: 'Maya Lin',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
        authorDepartment: 'Design & Creative Media',
        content: 'I would love to help design the frame aesthetic! It should look sleek and normal like stylish prescription glasses, not like medical equipment.',
        createdAt: '2026-02-12'
      },
      {
        id: 'c2',
        authorId: 'usr_1',
        authorName: 'Priya Sharma',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
        authorDepartment: 'Computer Science & Eng',
        content: 'If you stream low-res depth data over BLE to the phone, we can run a tiny YOLO-nano model to read door labels and crosswalk signs too!',
        createdAt: '2026-02-14'
      }
    ],
    status: 'in_team_formation',
    isSeekingCollaborators: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'idea_2',
    title: 'PaperGenomics: Biodegradable Environmental DNA Sampling Swab for Ocean Plastics',
    problemStatement: 'Marine microplastics accumulate specific bacterial biofilms (the "plastisphere"). Current sampling requires expensive lab centrifuges and refrigeration ships.',
    proposedSolution: 'A cellulose-based field swab with room-temperature RNA/DNA stabilization chemistry and colorimetric visual enzyme triggers that indicate microbial plastic degradation enzymes on site.',
    category: 'Research Proposal',
    authorId: 'usr_5',
    authorName: 'Dr. Ananya Iyer',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
    authorDepartment: 'Biotech & Biomedical',
    targetAudience: 'Marine biologists, environmental NGOs, coast guard surveillance',
    recommendedRoles: ['Biochemist / Enzymologist', 'Mobile Vision ML Specialist', 'Material Scientist'],
    techStack: ['Paper Microfluidics', 'OpenCV Colorimetry', 'Python Bio'],
    upvotes: ['usr_1', 'usr_2', 'usr_4'],
    comments: [
      {
        id: 'c3',
        authorId: 'usr_4',
        authorName: 'Marcus Vance',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
        authorDepartment: 'Management & FinTech',
        content: 'There is huge ESG grant funding for marine biodiversity monitoring right now from oceanic conservation foundations. We could easily qualify for a $50K pilot grant.',
        createdAt: '2026-02-15'
      }
    ],
    status: 'active',
    isSeekingCollaborators: true,
    createdAt: '2026-02-14'
  },
  {
    id: 'idea_3',
    title: 'NeuroStudy: Real-Time Cognitive Fatigue Alert & Adaptive Pomodoro for Engineering Labs',
    problemStatement: 'Students in high-intensity lab sessions and coding hackathons suffer severe burnout and micro-sleep accidents without realizing their cognitive exhaustion levels.',
    proposedSolution: 'Non-invasive PPG ear-clip pulse wave analysis + webcam blink rate detection that predicts neural fatigue 25 minutes before physical exhaustion occurs, automatically adjusting ambient desk lighting and scheduling optimal breaks.',
    category: 'Hackathon Concept',
    authorId: 'usr_1',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
    authorDepartment: 'Computer Science & Eng',
    targetAudience: 'Engineering students, competitive coders, night-shift lab researchers',
    recommendedRoles: ['Biomedical Sensor Engineer', 'UI/UX Interaction Designer', 'Front-End React Dev'],
    techStack: ['WebRTC', 'MediaPipe', 'FastAPI', 'Tailwind', 'ESP32 IoT Light'],
    upvotes: ['usr_2', 'usr_3', 'usr_5', 'usr_6'],
    comments: [],
    status: 'active',
    isSeekingCollaborators: true,
    createdAt: '2026-02-20'
  }
];

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: 'hack_1',
    title: 'Smart India Hackathon 2026 (SIH)',
    organizer: 'Ministry of Education & AICTE',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80',
    description: 'The world\'s biggest open innovation model bringing 100,000+ students to tackle real problem statements from Government ministries and premier tech enterprises.',
    prizePool: '₹1,00,00,000 ($120,000 USD)',
    mode: 'Hybrid',
    location: 'Nodal Centers Across India + Virtual Preliminary',
    startDate: '2026-11-15',
    endDate: '2026-11-17',
    deadlineDate: '2026-10-25',
    themes: ['Smart Agriculture', 'Healthcare & Biomedical', 'Clean & Green Energy', 'Robotics & Drones', 'Smart Education'],
    eligibility: 'All registered undergraduate & postgraduate students. Interdisciplinary teams of 6 with at least one female teammate mandatory.',
    registrationLink: 'https://sih.gov.in',
    teamsFormedCount: 18,
    registeredUserIds: ['usr_1', 'usr_2'],
    bookmarkedUserIds: ['usr_1', 'usr_3', 'usr_4'],
    isFeatured: true
  },
  {
    id: 'hack_2',
    title: 'ETHGlobal NextGen Hackathon 2026',
    organizer: 'ETHGlobal & Web3 Foundation',
    logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000&auto=format&fit=crop&q=80',
    description: 'Global 36-hour premier hackathon building decentralized science (DeSci), zero-knowledge identity, verifiable AI agents, and regenerative public goods.',
    prizePool: '$350,000 USD',
    mode: 'Online',
    location: 'Global Virtual Event',
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    deadlineDate: '2026-10-15',
    themes: ['DeSci & Open Science', 'AI Agents on Blockchain', 'Privacy & ZK-Proofs', 'Decentralized Energy'],
    eligibility: 'Global university students and open-source contributors. Teams of 2 to 5 members.',
    registrationLink: 'https://ethglobal.com',
    teamsFormedCount: 12,
    registeredUserIds: ['usr_4'],
    bookmarkedUserIds: ['usr_1', 'usr_2', 'usr_4'],
    isFeatured: true
  },
  {
    id: 'hack_3',
    title: 'Google Cloud Sustainability Innovators',
    organizer: 'Google Cloud & Campus Innovation Network',
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80',
    description: 'Leverage Gemini 3.8, BigQuery, and Google Earth Engine to build climate-resilient cities, circular economy supply chains, and carbon footprint reduction apps.',
    prizePool: '$100,000 + Google Cloud Credits',
    mode: 'Hybrid',
    location: 'Google Campus Hubs & Virtual',
    startDate: '2026-11-01',
    endDate: '2026-11-03',
    deadlineDate: '2026-10-20',
    themes: ['Earth Engine Analytics', 'Generative AI for Climate', 'Carbon Optimization', 'Renewable Microgrids'],
    eligibility: 'Enrolled students with active campus emails. Mentorship provided by Google Cloud Engineers.',
    registrationLink: 'https://cloud.google.com/events',
    teamsFormedCount: 15,
    registeredUserIds: ['usr_1', 'usr_4'],
    bookmarkedUserIds: ['usr_1', 'usr_5'],
    isFeatured: true
  },
  {
    id: 'hack_4',
    title: 'BioTech Innovate: Precision Health Challenge',
    organizer: 'National Institute of Biomedical Innovation',
    logo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1000&auto=format&fit=crop&q=80',
    description: 'Transform laboratory assays into affordable, scalable diagnostics and AI-powered treatment recommendation engines for underserved clinics.',
    prizePool: '$75,000 + Seed Lab Incubation',
    mode: 'In-Person',
    location: 'Bio-Incubator Center, Science Park',
    startDate: '2026-12-05',
    endDate: '2026-12-07',
    deadlineDate: '2026-11-10',
    themes: ['Point-of-Care Biosensors', 'AI Drug Discovery', 'Wearable Telehealth', 'Genomic Analytics'],
    eligibility: 'Multidisciplinary teams containing at least one life-sciences or medical engineering student.',
    registrationLink: 'https://biotechinnovate.org',
    teamsFormedCount: 9,
    registeredUserIds: ['usr_5'],
    bookmarkedUserIds: ['usr_3', 'usr_5'],
    isFeatured: false
  }
];

export const INITIAL_MENTORS: Mentor[] = [
  {
    id: 'men_1',
    name: 'Dr. Siddharth Sen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
    type: 'Faculty',
    designation: 'Professor & Head of Autonomous Systems Lab',
    organization: 'National Institute of Technology',
    departmentOrField: 'Robotics & Sensor Fusion',
    bio: 'Guiding student teams in drone aerodynamics, Kalman filter design, and ROS-based swarm intelligence for over 14 years. Senior Member of IEEE.',
    expertise: ['Sensor Fusion', 'Drone Avionics', 'ROS 2', 'Patent Filing', 'Academic Research'],
    availableSlots: ['Wed 3:00 PM - 5:00 PM', 'Fri 10:00 AM - 12:00 PM'],
    rating: 4.9,
    totalMentees: 78,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'men_2',
    name: 'Kavita Nair',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80',
    type: 'Alumni',
    designation: 'Senior Staff Machine Learning Engineer',
    organization: 'Google DeepMind',
    departmentOrField: 'Generative AI & Multimodal Models',
    bio: 'Campus alumna (Batch of 2021). Passionate about helping students formulate novel problem statements and transition from hackathon prototypes to production models.',
    expertise: ['PyTorch', 'LLM Agentic Systems', 'Multimodal Architecture', 'Career Navigation', 'Code Architecture'],
    availableSlots: ['Sat 11:00 AM - 1:00 PM', 'Sun 4:00 PM - 6:00 PM'],
    rating: 5.0,
    totalMentees: 112,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'men_3',
    name: 'David O\'Connor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&auto=format&fit=crop&q=80',
    type: 'Industry Professional',
    designation: 'Managing Partner & Startup Scout',
    organization: 'Apex Campus Ventures',
    departmentOrField: 'Venture Capital & Commercialization',
    bio: 'Invested in 18 university-born deep tech and SaaS companies. Mentors student teams on investor pitching, equity structuring, and enterprise pilots.',
    expertise: ['Investor Pitching', 'Unit Economics', 'Product-Market Fit', 'Customer Discovery', 'Seed Fundraising'],
    availableSlots: ['Tue 4:00 PM - 6:00 PM', 'Thu 5:00 PM - 7:00 PM'],
    rating: 4.8,
    totalMentees: 94,
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'men_4',
    name: 'Sarah Zhang',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&auto=format&fit=crop&q=80',
    type: 'Alumni',
    designation: 'Head of Product Experience',
    organization: 'Stripe',
    departmentOrField: 'Product Design & Design Systems',
    bio: 'Class of 2020. Specializes in transforming complex backend and financial tools into frictionless interfaces that judges and early adopters love.',
    expertise: ['Figma Mastery', 'Product Storytelling', 'User Research', 'Design Systems', 'Design Sprint'],
    availableSlots: ['Mon 6:00 PM - 8:00 PM', 'Sat 2:00 PM - 4:00 PM'],
    rating: 4.9,
    totalMentees: 85,
    linkedin: 'https://linkedin.com'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_1',
    type: 'team_invitation',
    title: 'Team Invitation: BioSense NanoLab',
    message: 'Dr. Ananya Iyer invited you to join BioSense NanoLab as Lead Full-Stack Software Engineer for the ETHGlobal Hackathon.',
    senderName: 'Dr. Ananya Iyer',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&auto=format&fit=crop&q=80',
    targetId: 'team_2',
    actionLabel: 'Review Invitation',
    isRead: false,
    createdAt: '10 minutes ago'
  },
  {
    id: 'notif_2',
    userId: 'usr_1',
    type: 'collaboration_request',
    title: 'New Applicant for AeroPulse Vision',
    message: 'Maya Lin applied for the UI/UX & Mobile Dashboard Designer role on your team AeroPulse Vision.',
    senderName: 'Maya Lin',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
    targetId: 'team_1',
    actionLabel: 'View Application',
    isRead: false,
    createdAt: '1 hour ago'
  },
  {
    id: 'notif_3',
    userId: 'usr_1',
    type: 'event_reminder',
    title: 'Hackathon Deadline Approaching',
    message: 'Smart India Hackathon 2026 preliminary team submission deadline is in 33 days. 2 open roles remain on your team.',
    targetId: 'hack_1',
    actionLabel: 'View Hackathon',
    isRead: false,
    createdAt: '4 hours ago'
  },
  {
    id: 'notif_4',
    userId: 'usr_1',
    type: 'mentor_response',
    title: 'Mentorship Confirmed with Kavita Nair',
    message: 'Kavita Nair (Google DeepMind) confirmed your guidance session for this Saturday at 11:30 AM.',
    senderName: 'Kavita Nair',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&auto=format&fit=crop&q=80',
    targetId: 'men_2',
    actionLabel: 'Join Session',
    isRead: true,
    createdAt: 'Yesterday'
  }
];
