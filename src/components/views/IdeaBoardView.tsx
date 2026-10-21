import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IdeaCategory } from '../../types';
import { 
  Lightbulb, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  Share2, 
  Send, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const IdeaBoardView: React.FC = () => {
  const { 
    ideas, 
    upvoteIdea, 
    addIdeaComment, 
    setIsPostIdeaModalOpen, 
    setSelectedStudent,
    allUsers,
    addToast
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories: IdeaCategory[] = [
    'Startup Idea',
    'Research Proposal',
    'Hackathon Concept',
    'Social Impact',
    'Campus Tech'
  ];

  const filteredIdeas = ideas.filter((idea) => {
    if (activeCategory !== 'all' && idea.category !== activeCategory) return false;
    return true;
  });

  const toggleComments = (ideaId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [ideaId]: !prev[ideaId]
    }));
  };

  const handleCommentSubmit = (ideaId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[ideaId];
    if (!text || !text.trim()) return;

    addIdeaComment(ideaId, text.trim());
    setCommentInputs((prev) => ({ ...prev, [ideaId]: '' }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-purple-50 to-white border border-amber-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              Campus Idea Pitch Board
            </span>
            <span className="text-xs text-slate-500">
              {ideas.length} Active Proposals
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Share Concepts & Validate Hypotheses
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Post early-stage problem statements. Gather peer upvotes, constructive feedback, and recruit multidisciplinary co-founders before writing code.
          </p>
        </div>

        <button
          id="pitch-idea-banner-btn"
          onClick={() => setIsPostIdeaModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Pitch New Idea</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
          }`}
        >
          All Categories ({ideas.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.map((idea) => {
          const author = allUsers.find((u) => u.id === idea.authorId);
          const isCommentsOpen = !!expandedComments[idea.id];

          return (
            <div
              key={idea.id}
              id={`idea-card-${idea.id}`}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-xs"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={idea.authorAvatar}
                    alt={idea.authorName}
                    onClick={() => {
                      if (author) setSelectedStudent(author);
                    }}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 cursor-pointer hover:border-amber-400 transition-colors"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span 
                        onClick={() => {
                          if (author) setSelectedStudent(author);
                        }}
                        className="text-xs font-bold text-slate-900 hover:text-amber-800 cursor-pointer"
                      >
                        {idea.authorName}
                      </span>
                      <span className="text-[10px] text-slate-500">&bull; {idea.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-purple-700 font-semibold">{idea.authorDepartment}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {idea.category}
                  </span>
                </div>
              </div>

              {/* Title & Core Concepts */}
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {idea.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-4">
                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                    Problem Statement
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {idea.problemStatement}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                    Proposed Solution
                  </p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {idea.proposedSolution}
                  </p>
                </div>
              </div>

              {/* Roles & Tech Stack */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 mb-4 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mr-1">
                    Seeking Teammates:
                  </span>
                  {idea.recommendedRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {idea.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions & Comment Count Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    id={`upvote-idea-btn-${idea.id}`}
                    onClick={() => upvoteIdea(idea.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all cursor-pointer group"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span>{idea.upvotes.length} Upvotes</span>
                  </button>

                  <button
                    id={`toggle-comments-btn-${idea.id}`}
                    onClick={() => toggleComments(idea.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all cursor-pointer border border-slate-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                    <span>{idea.comments.length} Discussion Notes</span>
                    {isCommentsOpen ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToast('info', 'Link Copied', `Idea proposal link for "${idea.title}" copied to clipboard.`);
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  title="Share Proposal"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Expandable Comments & Feedback Discussion */}
              {isCommentsOpen && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                  <div className="space-y-2">
                    {idea.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                      >
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-7 h-7 rounded-lg object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-0.5">
                            <span className="font-semibold text-slate-900">{comment.authorName}</span>
                            <span className="text-[10px] text-slate-500">{comment.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Input */}
                  <form onSubmit={(e) => handleCommentSubmit(idea.id, e)} className="flex gap-2">
                    <input
                      type="text"
                      value={commentInputs[idea.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [idea.id]: e.target.value
                        }))
                      }
                      placeholder={`Provide feedback or express interest to ${idea.authorName}...`}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
