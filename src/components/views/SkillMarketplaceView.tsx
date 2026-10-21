import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Department } from '../../types';
import { 
  Sparkles, 
  Search, 
  UserCheck, 
  Award, 
  Filter, 
  ChevronRight
} from 'lucide-react';

export const SkillMarketplaceView: React.FC = () => {
  const { allUsers, setSelectedStudent, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const departments: Department[] = [
    'Computer Science & Eng',
    'Electronics & Comm',
    'Mechanical & Robotics',
    'Biotech & Biomedical',
    'Design & Creative Media',
    'Management & FinTech',
    'Data Science & AI'
  ];

  const filteredStudents = allUsers.filter((student) => {
    // Search filter: name, headline, skills, bio
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(q);
      const matchHeadline = student.headline.toLowerCase().includes(q);
      const matchSkills = student.skills.some((s) => s.toLowerCase().includes(q));
      const matchInterests = student.interests.some((i) => i.toLowerCase().includes(q));
      if (!matchName && !matchHeadline && !matchSkills && !matchInterests) return false;
    }

    // Department filter
    if (selectedDept !== 'all' && student.department !== selectedDept) return false;

    // Year filter
    if (selectedYear !== 'all' && student.year !== selectedYear) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50 via-purple-50 to-white border border-cyan-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Campus Skill Marketplace
          </span>
          <span className="text-xs text-slate-500">
            {allUsers.length} Verified Student Profiles
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Discover Specialized Talent Across Campus
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Search students by technical domain, CAD prototyping, embedded firmware, biomedical genetics, financial modeling, or Figma interface craft.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Department Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedDept('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDept === 'all'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
              }`}
            >
              All Departments
            </button>
            {departments.slice(0, 4).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {dept.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600"
            >
              <option value="all">All Study Years</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Postgraduate / PhD">Postgraduate / PhD</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by skill (e.g. 'PyTorch', 'ROS2', 'KiCad', 'Solidity', 'Figma', 'CRISPR')..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600 transition-all"
          />
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map((student) => {
          const isCurrentUser = student.id === currentUser.id;

          return (
            <div
              key={student.id}
              id={`student-card-${student.id}`}
              onClick={() => setSelectedStudent(student)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all shadow-xs flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                        {student.name}
                      </h3>
                      {student.isVerified && (
                        <UserCheck className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-purple-700 font-semibold truncate">
                      {student.department}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {student.year} &bull; {student.badges.length} campus accolades
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-800 font-semibold mb-1 line-clamp-1">
                  {student.headline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {student.bio}
                </p>

                {/* Skills */}
                <div className="mt-3.5 flex flex-wrap gap-1">
                  {student.skills.slice(0, 5).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {student.skills.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                      +{student.skills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  {student.badges[0]?.title || 'Certified Innovator'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStudent(student);
                  }}
                  className="text-xs font-semibold text-cyan-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 cursor-pointer"
                >
                  <span>{isCurrentUser ? 'My Profile' : 'View Profile'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
