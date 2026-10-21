import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCheck, 
  Bell, 
  Users, 
  Calendar, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    clearNotification,
    setActiveTab,
    setSelectedTeam,
    teams
  } = useApp();

  if (!isOpen) return null;

  const userNotifications = notifications.filter((n) => n.userId === currentUser.id);

  const handleActionClick = (targetId?: string, type?: string) => {
    if (!targetId) return;

    if (type === 'team_invitation' || type === 'collaboration_request') {
      const matchedTeam = teams.find((t) => t.id === targetId);
      if (matchedTeam) {
        setSelectedTeam(matchedTeam);
      }
      setActiveTab('teambuilder');
    } else if (type === 'event_reminder') {
      setActiveTab('hackathons');
    } else if (type === 'mentor_response') {
      setActiveTab('mentors');
    }
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />

      <div 
        id="notification-drawer"
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
              <p className="text-[11px] text-slate-500">{userNotifications.length} updates for {currentUser.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="mark-all-read-btn"
              onClick={markAllNotificationsRead}
              className="text-[11px] text-purple-700 hover:text-purple-900 font-semibold px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              id="close-notifications-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {userNotifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                You will be notified when teammates apply to your team, mentors reply, or hackathon deadlines approach.
              </p>
            </div>
          ) : (
            userNotifications.map((notif) => {
              const isInvite = notif.type === 'team_invitation' || notif.type === 'collaboration_request';
              const isMentor = notif.type === 'mentor_response';
              const isEvent = notif.type === 'event_reminder';

              return (
                <div
                  key={notif.id}
                  id={`notification-card-${notif.id}`}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    notif.isRead
                      ? 'bg-white border-slate-200 text-slate-700'
                      : 'bg-purple-50/70 border-purple-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {isInvite && (
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                      )}
                      {isMentor && (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                      )}
                      {isEvent && (
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                          <Calendar className="w-4 h-4" />
                        </div>
                      )}
                      {!isInvite && !isMentor && !isEvent && (
                        <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-900 leading-snug">{notif.title}</p>
                        <span className="text-[10px] text-slate-400 shrink-0">{notif.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.message}</p>

                      {notif.actionLabel && (
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            id={`action-notif-${notif.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleActionClick(notif.targetId, notif.type);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <span>{notif.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            id={`dismiss-notif-${notif.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              clearNotification(notif.id);
                            }}
                            className="px-2 py-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-[11px] text-slate-500">
            Real-time synchronization across campus departments enabled.
          </p>
        </div>
      </div>
    </>
  );
};
