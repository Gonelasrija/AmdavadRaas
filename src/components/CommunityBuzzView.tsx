import React, { useState } from 'react';
import { CommunityReview, SongPollOption } from '../types';
import { 
  Users, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Vote, 
  Music, 
  Car, 
  ShieldCheck, 
  Plus, 
  X, 
  Check, 
  Volume2, 
  Camera, 
  Sparkles,
  MapPin,
  Mic
} from 'lucide-react';

interface CommunityBuzzViewProps {
  reviews: CommunityReview[];
  pollOptions: SongPollOption[];
  onAddReview: (review: CommunityReview) => void;
  onVotePoll: (songId: string) => void;
  userVotedSong: string | null;
}

export const CommunityBuzzView: React.FC<CommunityBuzzViewProps> = ({
  reviews,
  pollOptions,
  onAddReview,
  onVotePoll,
  userVotedSong,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'music' | 'parking' | 'sound' | 'crowd'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  // Review form state
  const [authorName, setAuthorName] = useState('');
  const [venueName, setVenueName] = useState('Mandli Garba at YMCA Club');
  const [singerRating, setSingerRating] = useState(5);
  const [parkingRating, setParkingRating] = useState(4);
  const [themeRating, setThemeRating] = useState(5);
  const [soundRating, setSoundRating] = useState(5);
  const [commentText, setCommentText] = useState('');

  const toggleHelpful = (reviewId: string, initialCount: number) => {
    setHelpfulMap((prev) => {
      const current = prev[reviewId] ?? initialCount;
      const isAlreadyVoted = prev[`${reviewId}_voted`];
      return {
        ...prev,
        [reviewId]: isAlreadyVoted ? current - 1 : current + 1,
        [`${reviewId}_voted`]: !isAlreadyVoted ? 1 : 0,
      };
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev: CommunityReview = {
      id: `rev-${Date.now()}`,
      authorName: authorName.trim() || 'Amdavadi Khelaiya',
      avatarInitials: authorName ? authorName.substring(0, 2).toUpperCase() : 'AK',
      venueName,
      timeAgo: 'Just now',
      isVerifiedPassholder: true,
      singerRating,
      parkingRating,
      themeRating,
      soundRating,
      securityRating: 5,
      comment: commentText.trim(),
      helpfulCount: 1,
    };

    onAddReview(newRev);
    setIsReviewModalOpen(false);
    setCommentText('');
    setAuthorName('');
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 gap-6 text-[#1C1917]">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9E0038] animate-pulse" />
          <span className="text-xs font-extrabold text-[#9E0038] uppercase tracking-wider">
            Ground Intel · Navratri 2025
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
          Amdavad Garba Community Buzz
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E]">
          Real-time ground reports, parking conditions, sound fidelity & live singer updates directly from dancers.
        </p>

        {/* Crowd count card */}
        <div className="mt-2 p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-[#78716C] uppercase font-bold tracking-wider">Crowd Verified</span>
              <p className="text-base font-extrabold text-[#1C1917]">3,420+ Tonight</p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#9E0038] text-xs font-bold border border-[#9E0038]/20">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>4.8 Overall Ground Rating</span>
          </span>
        </div>
      </div>

      {/* Real-time Voice Callout Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9E0038] via-[#85002C] to-[#58001F] p-5 sm:p-6 text-white shadow-md">
        <div className="relative z-10 flex flex-col gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FEF3C7]">
            Real-Time Dancer Intel
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold leading-snug">
            Attended Garba tonight? Share your review to guide fellow Amdavadis!
          </h2>
          <p className="text-xs text-white/80 max-w-xl leading-relaxed">
            Report inner-circle dress code checks, parking availability on SG Highway, and live singer performance reviews.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="py-2.5 px-5 rounded-full bg-white text-[#9E0038] text-xs font-bold shadow-md hover:bg-[#FEF3C7] active:scale-98 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Write Ground Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Reviews' },
          { id: 'music', label: 'Singer & Music (4.9★)' },
          { id: 'parking', label: 'Parking & Traffic (3.8★)' },
          { id: 'sound', label: 'Sound & Ground (4.7★)' },
          { id: 'crowd', label: 'Crowd & Safety (4.8★)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === tab.id
                ? 'bg-[#9E0038] text-white shadow-xs'
                : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#FCFAF7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Feed */}
      <div className="flex flex-col gap-4">
        {reviews.map((rev) => {
          const helpfulCount = helpfulMap[rev.id] ?? rev.helpfulCount;
          const isVoted = Boolean(helpfulMap[`${rev.id}_voted`]);

          return (
            <article
              key={rev.id}
              className="p-5 rounded-3xl bg-white border border-[#E7E5E4] shadow-xs flex flex-col gap-3"
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFF0F4] text-[#9E0038] font-extrabold text-sm flex items-center justify-center shadow-2xs border border-[#FED7E2]">
                    {rev.avatarInitials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#1C1917]">{rev.authorName}</span>
                      {rev.isVerifiedPassholder && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Verified Passholder
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#78716C]">
                      {rev.venueName} · {rev.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[#57534E] text-[11px]">Singer</span>
                  <span className="font-bold text-[#9E0038]">{rev.singerRating}★</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[#57534E] text-[11px]">Parking</span>
                  <span className="font-bold text-[#9E0038]">{rev.parkingRating}★</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[#57534E] text-[11px]">Theme</span>
                  <span className="font-bold text-[#9E0038]">{rev.themeRating}★</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[#57534E] text-[11px]">Sound</span>
                  <span className="font-bold text-[#9E0038]">{rev.soundRating}★</span>
                </div>
              </div>

              {/* Comment Text */}
              <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed">
                {rev.comment}
              </p>

              {/* Uploaded Photos if present */}
              {rev.images && rev.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {rev.images.map((imgUrl, idx) => (
                    <div key={idx} className="h-32 sm:h-36 rounded-2xl overflow-hidden shadow-xs border border-[#E7E5E4]">
                      <img
                        src={imgUrl}
                        alt="Garba ground upload"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Helpful footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4] text-xs">
                <button
                  onClick={() => toggleHelpful(rev.id, rev.helpfulCount)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    isVoted
                      ? 'bg-[#9E0038] text-white font-bold'
                      : 'bg-[#FCFAF7] text-[#57534E] border border-[#E7E5E4] hover:border-[#9E0038]/30'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{helpfulCount} Amdavadis found this helpful</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: rev.venueName, text: rev.comment, url: window.location.href });
                    }
                  }}
                  className="flex items-center gap-1 text-[#78716C] hover:text-[#9E0038]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Live Midnight Poll Widget */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E7E5E4] shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#9E0038]">
            <Vote className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Live Midnight Poll
            </span>
          </div>
          <span className="text-xs text-[#78716C]">12.8k Votes Recorded</span>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold text-[#1C1917]">
            Which Garba song got you dancing the hardest tonight?
          </h3>
          <p className="text-xs text-[#57534E] mt-0.5">
            Live votes updating every 10 seconds from Ahmedabad & Gandhinagar grounds.
          </p>
        </div>

        {/* Poll Options */}
        <div className="flex flex-col gap-2.5 mt-1">
          {pollOptions.map((opt) => {
            const isUserPick = userVotedSong === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onVotePoll(opt.id)}
                className={`group relative rounded-2xl bg-[#FCFAF7] p-3.5 cursor-pointer overflow-hidden transition-all active:scale-98 border ${
                  isUserPick ? 'border-[#9E0038] ring-2 ring-[#9E0038]/20 bg-white' : 'border-[#E7E5E4] hover:border-[#9E0038]/30'
                }`}
              >
                {/* Progress Fill Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#FFF0F4] transition-all duration-700"
                  style={{ width: `${opt.votesPercentage}%` }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Music className="w-4 h-4 text-[#9E0038]" />
                    <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                      {opt.title}
                    </span>
                    <span className="text-xs text-[#57534E] font-medium">
                      ({opt.artist})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#9E0038] tabular-nums">
                      {opt.votesPercentage}%
                    </span>
                    {isUserPick && (
                      <span className="w-4 h-4 rounded-full bg-[#9E0038] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[#78716C]">
          <span>Tap any track to cast vote</span>
          {userVotedSong && (
            <span className="text-[#9E0038] font-bold">
              You voted for {pollOptions.find((p) => p.id === userVotedSong)?.title}!
            </span>
          )}
        </div>
      </section>

      {/* Add Review Floating Button */}
      <button
        onClick={() => setIsReviewModalOpen(true)}
        className="w-full py-3.5 px-4 rounded-2xl bg-[#9E0038] text-white font-bold text-sm shadow-md hover:bg-[#7D002C] active:scale-98 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Your Parking / Singer Review</span>
      </button>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#E7E5E4]">
            <div className="p-4 bg-[#FFF0F4] border-b border-[#FED7E2] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#9E0038] tracking-wider">Community Feedback</span>
                <h3 className="text-sm font-extrabold text-[#1C1917]">Post Tonight's Garba Review</h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white text-[#78716C] hover:text-[#1C1917] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-5 flex flex-col gap-3 text-xs overflow-y-auto">
              <div>
                <label className="font-bold text-[#1C1917] block mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Parthiv Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#9E0038] focus:ring-2 focus:ring-[#9E0038]/10 bg-[#FCFAF7] focus:bg-white transition-all text-[#1C1917]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1C1917] block mb-1">Venue / Ground</label>
                <select
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] bg-[#FCFAF7] focus:bg-white focus:outline-none focus:border-[#9E0038] text-[#1C1917] transition-all"
                >
                  <option value="Mandli Garba at YMCA Club">Mandli Garba at YMCA Club (SG Highway)</option>
                  <option value="Suvarn Navratri at Karnavati Club">Suvarn Navratri at Karnavati Club</option>
                  <option value="United Way of Amdavad (Shantigram)">United Way of Amdavad (Shantigram)</option>
                  <option value="Gandhinagar Rajat Raas Sector 11">Gandhinagar Rajat Raas (Sector 11)</option>
                  <option value="Mirchi Rock N Dhol (Sindhu Bhavan)">Mirchi Rock N Dhol (Sindhu Bhavan)</option>
                  <option value="Dhal ni Pol Heritage Sheri Garba">Dhal ni Pol Heritage Sheri Garba</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="font-semibold text-[#57534E] block mb-1">Singer Energy (1-5★)</label>
                  <select
                    value={singerRating}
                    onChange={(e) => setSingerRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E7E5E4] bg-[#FCFAF7] text-[#1C1917]"
                  >
                    <option value={5}>5★ - Phenomenal</option>
                    <option value={4}>4★ - Great Beats</option>
                    <option value={3}>3★ - Average</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#57534E] block mb-1">SG Hwy Parking (1-5★)</label>
                  <select
                    value={parkingRating}
                    onChange={(e) => setParkingRating(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#E7E5E4] bg-[#FCFAF7] text-[#1C1917]"
                  >
                    <option value={5}>5★ - Fast Valet</option>
                    <option value={4}>4★ - Good Space</option>
                    <option value={3}>3★ - Slow Service Lane</option>
                    <option value={2}>2★ - Traffic Jam</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1C1917] block mb-1">
                  Real-Time Tip for Fellow Amdavadis
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tell us about ground sand, crowd rush, best food stalls, or exit gate delays..."
                  className="w-full p-3 rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#9E0038] focus:ring-2 focus:ring-[#9E0038]/10 bg-[#FCFAF7] focus:bg-white resize-none text-[#1C1917]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#9E0038] hover:bg-[#7D002C] text-white font-bold rounded-xl shadow-sm transition-all active:scale-98 mt-1"
              >
                Publish Ground Intel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
