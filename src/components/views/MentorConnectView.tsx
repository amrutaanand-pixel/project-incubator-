import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Star, 
  Calendar, 
  Clock, 
  Video 
} from 'lucide-react';

export const MentorConnectView: React.FC = () => {
  const { mentors, setSelectedMentor, currentUser, mentorshipSessions, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'directory' | 'my-sessions'>('directory');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  const filteredMentors = mentors.filter((mentor) => {
    if (selectedDomain === 'all') return true;
    return mentor.expertise.some((e) => e.toLowerCase().includes(selectedDomain.toLowerCase()));
  });

  const myBookings = mentorshipSessions.filter((s) => s.studentId === currentUser.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-purple-50 to-white border border-emerald-200 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            Mentor Connect & Faculty Advisory
          </span>
          <span className="text-xs text-slate-500">
            {mentors.length} Verified Mentors Available
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Connect with Faculty, Alumni & Industry Pioneers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Get 1-on-1 pitch feedback, patent advice, architecture reviews, and prototype guidance from researchers and engineers at Google, DeepMind, Stripe, and university faculty labs.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            Mentorship Directory ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab('my-sessions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'my-sessions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            My Scheduled Sessions ({myBookings.length})
          </button>
        </div>

        {activeTab === 'directory' && (
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-emerald-600"
          >
            <option value="all">All Expertise Domains</option>
            <option value="ai">AI / Machine Learning</option>
            <option value="robotics">Robotics & Hardware</option>
            <option value="biotech">Biotech & Genomics</option>
            <option value="ux">Design & Interface</option>
            <option value="venture">Startup & Venture Capital</option>
          </select>
        )}
      </div>

      {/* Directory Tab */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              id={`mentor-card-${mentor.id}`}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-xl object-cover border border-emerald-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      {mentor.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold truncate">
                      {mentor.designation}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {mentor.organization}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center text-[11px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-current mr-0.5" />
                        {mentor.rating}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        ({mentor.totalMentees} teams mentored)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {mentor.bio}
                </p>

                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.expertise.map((exp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200"
                    >
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Available Slots Preview */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Next Available Slot:
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{mentor.availableSlots[0]}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  id={`book-mentor-${mentor.id}`}
                  onClick={() => setSelectedMentor(mentor)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Request Guidance Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Scheduled Sessions Tab */}
      {activeTab === 'my-sessions' && (
        <div className="space-y-3.5">
          {myBookings.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-800">No mentorship sessions scheduled yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore the directory above and book time with industry practitioners to review your pitch or prototype.
              </p>
              <button
                onClick={() => setActiveTab('directory')}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Browse Mentors
              </button>
            </div>
          ) : (
            myBookings.map((session) => {
              const mentor = mentors.find((m) => m.id === session.mentorId);
              const mentorName = mentor?.name || 'Faculty Mentor';
              const mentorAvatar = mentor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80';
              const mentorRole = mentor ? `${mentor.designation} (${mentor.organization})` : 'Innovation Advisor';

              return (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={mentorAvatar}
                      alt={mentorName}
                      className="w-12 h-12 rounded-xl object-cover border border-emerald-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{mentorName}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Confirmed Booking
                        </span>
                      </div>
                      <p className="text-xs text-emerald-700 font-semibold">{mentorRole}</p>
                      <p className="text-xs text-slate-700 mt-1.5">
                        <strong className="text-slate-500">Discussion Topic:</strong> "{session.projectTopic}"
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-purple-600" />
                        <span>{session.scheduledDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <a
                      href={session.meetLink || 'https://meet.google.com/inc-demo-room'}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        addToast(
                          'info',
                          'Joining Video Room',
                          `Opening virtual mentoring room with ${mentorName} (${session.meetLink || 'https://meet.google.com/inc-demo-room'})`
                        );
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Video Room</span>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
