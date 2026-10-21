import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Clock, Video } from 'lucide-react';

export const MentorshipModal: React.FC = () => {
  const { 
    selectedMentor, 
    setSelectedMentor, 
    currentUser, 
    teams, 
    bookMentorshipSession,
    addToast 
  } = useApp();

  const [topic, setTopic] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(selectedMentor?.availableSlots[0] || '');
  const [selectedTeamId, setSelectedTeamId] = useState('');

  if (!selectedMentor) return null;

  const myTeams = teams.filter((t) => t.members.some((m) => m.userId === currentUser.id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      addToast('warning', 'Topic Required', 'Please specify what challenges or guidance you would like to discuss.');
      return;
    }

    const slot = selectedSlot || selectedMentor.availableSlots[0] || 'Upcoming Thursday 4:00 PM';
    bookMentorshipSession(selectedMentor.id, topic.trim(), slot, selectedTeamId ? `Team: ${selectedTeamId}` : undefined);
    setSelectedMentor(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        id="mentorship-modal-dialog"
        className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <img
              src={selectedMentor.avatar}
              alt={selectedMentor.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-200"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">Schedule Mentorship Session</h3>
              <p className="text-xs text-emerald-700 font-semibold">{selectedMentor.name} &bull; {selectedMentor.designation}</p>
            </div>
          </div>
          <button
            id="close-mentorship-modal"
            onClick={() => setSelectedMentor(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700">
            <span className="font-semibold text-emerald-800 block mb-0.5">Faculty / Industry Office Hours</span>
            {selectedMentor.bio}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Available Time Slot *</label>
            <div className="space-y-1.5">
              {selectedMentor.availableSlots.map((slot: string, idx: number) => (
                <label
                  key={idx}
                  className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    (selectedSlot || selectedMentor.availableSlots[0]) === slot
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="slot"
                    value={slot}
                    checked={(selectedSlot || selectedMentor.availableSlots[0]) === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="accent-emerald-600"
                  />
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">What would you like to review? *</label>
            <textarea
              rows={3}
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Pitch deck feedback for Smart India Hackathon or technical architecture review for edge inference pipeline..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Attach Team / Project (Optional)</label>
            <select
              value={selectedTeamId}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-emerald-600"
            >
              <option value="">-- No specific team (individual student guidance) --</option>
              {myTeams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <button
              id="confirm-mentorship-booking-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Confirm & Generate Google Meet Link</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
