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
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 py-4 gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#af275a] animate-ping" />
          <span className="text-[10px] font-bold text-[#af275a] uppercase tracking-wider">
            Ground Intel · 9 Nights
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#121c2a] leading-tight">
          Live Ahmedabad Garba Community Buzz
        </h1>

        {/* Crowd count card */}
        <div className="mt-2 p-3.5 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#9E0038] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-semibold">Crowd Verified</span>
              <p className="text-base font-extrabold text-[#121c2a]">3,420+ Tonight</p>
            </div>
          </div>
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 text-[#9E0038] text-xs font-bold">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>4.8 Overall Ground Rating</span>
          </span>
        </div>
      </div>

      {/* Real-time Voice Callout Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#9E0038] via-[#C41E3A] to-[#D92662] p-4 sm:p-5 text-white shadow-md">
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
            Real-Time Voice
          </span>
          <h2 className="text-base sm:text-lg font-bold leading-snug">
            Attended Garba tonight? Share your review & photos to help fellow Amdavadis!
          </h2>
          <p className="text-xs text-white/90">
            Upload ground safety, live singer drops, and SG Highway free parking hacks.
          </p>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-1 w-full py-2.5 px-4 rounded-xl bg-white text-[#9E0038] text-xs font-bold shadow-md hover:bg-pink-50 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Write Review</span>
          </button>
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
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
              selectedFilter === tab.id
                ? 'bg-[#9E0038] text-white'
                : 'bg-white text-[#554336] border border-[#dee9fc] hover:bg-[#eff4ff]'
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
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dee9fc] shadow-sm flex flex-col gap-3"
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#700028] font-extrabold text-sm flex items-center justify-center shadow-xs">
                    {rev.avatarInitials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-bold text-[#121c2a]">{rev.authorName}</span>
                      {rev.isVerifiedPassholder && (
                        <span className="px-2 py-0.2 rounded-full bg-pink-100 text-[#700028] text-[10px] font-bold flex items-center gap-0.5">
                          <Check className="w-3 h-3" />
                          Verified Passholder
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500">
                      {rev.venueName} · {rev.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                <div className="p-2 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <span className="text-[#554336] text-[11px]">Singer</span>
                  <span className="font-bold text-[#9E0038]">{rev.singerRating}★</span>
                </div>
                <div className="p-2 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <span className="text-[#554336] text-[11px]">Parking</span>
                  <span className="font-bold text-[#9E0038]">{rev.parkingRating}★</span>
                </div>
                <div className="p-2 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <span className="text-[#554336] text-[11px]">Theme</span>
                  <span className="font-bold text-[#9E0038]">{rev.themeRating}★</span>
                </div>
                <div className="p-2 rounded-lg bg-[#eff4ff] flex items-center justify-between">
                  <span className="text-[#554336] text-[11px]">Sound</span>
                  <span className="font-bold text-[#9E0038]">{rev.soundRating}★</span>
                </div>
              </div>

              {/* Comment Text */}
              <p className="text-xs sm:text-sm text-[#121c2a] leading-relaxed">
                {rev.comment}
              </p>

              {/* Uploaded Photos if present */}
              {rev.images && rev.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {rev.images.map((imgUrl, idx) => (
                    <div key={idx} className="h-32 sm:h-36 rounded-xl overflow-hidden shadow-xs">
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
              <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] text-xs">
                <button
                  onClick={() => toggleHelpful(rev.id, rev.helpfulCount)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                    isVoted
                      ? 'bg-[#9E0038] text-white font-bold'
                      : 'bg-[#eff4ff] text-[#554336] hover:text-[#9E0038]'
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
                  className="flex items-center gap-1 text-gray-500 hover:text-[#9E0038]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Live Midnight Poll Widget matching Image 4.png */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dee9fc] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#9E0038]">
            <Vote className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Live Midnight Poll
            </span>
          </div>
          <span className="text-xs text-gray-500">12.8k Votes Recorded</span>
        </div>

        <div>
          <h3 className="text-base font-bold text-[#121c2a]">
            Which Garba song got you dancing the hardest tonight?
          </h3>
          <p className="text-xs text-[#554336] mt-0.5">
            Live votes updating every 10 seconds from Ahmedabad grounds.
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
                className={`group relative rounded-2xl bg-[#eff4ff] p-3 cursor-pointer overflow-hidden transition-all active:scale-98 border ${
                  isUserPick ? 'border-[#9E0038] ring-2 ring-[#9E0038]/20' : 'border-[#dee9fc]'
                }`}
              >
                {/* Progress Fill Bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-pink-200/60 transition-all duration-700"
                  style={{ width: `${opt.votesPercentage}%` }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#9E0038]" />
                    <span className="text-xs sm:text-sm font-bold text-[#121c2a]">
                      {opt.title}
                    </span>
                    <span className="text-xs text-[#554336] font-medium">
                      ({opt.artist})
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-[#9E0038]">
                    {opt.votesPercentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-gray-500">
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
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#dee9fc]">
            <div className="p-4 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#9E0038]">Community Feedback</span>
                <h3 className="text-sm font-bold text-[#121c2a]">Post Tonight's Garba Review</h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 rounded-full hover:bg-white text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-4 sm:p-5 flex flex-col gap-3 text-xs overflow-y-auto">
              <div>
                <label className="font-bold text-[#121c2a] block mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Parthiv Patel"
                  className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-[#121c2a] block mb-1">Venue / Ground</label>
                <select
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-white focus:outline-none"
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
                  <label className="font-semibold text-[#554336] block mb-1">Singer Energy (1-5★)</label>
                  <select
                    value={singerRating}
                    onChange={(e) => setSingerRating(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-[#dee9fc] bg-white"
                  >
                    <option value={5}>5★ - Phenomenal</option>
                    <option value={4}>4★ - Great Beats</option>
                    <option value={3}>3★ - Average</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#554336] block mb-1">SG Hwy Parking (1-5★)</label>
                  <select
                    value={parkingRating}
                    onChange={(e) => setParkingRating(Number(e.target.value))}
                    className="w-full p-2 rounded-xl border border-[#dee9fc] bg-white"
                  >
                    <option value={5}>5★ - Fast Valet</option>
                    <option value={4}>4★ - Good Space</option>
                    <option value={3}>3★ - Slow Service Lane</option>
                    <option value={2}>2★ - Traffic Jam</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#121c2a] block mb-1">
                  Real-Time Tip for Fellow Amdavadis
                </label>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Tell us about ground sand, crowd rush, best food stalls, or exit gate delays..."
                  className="w-full p-3 rounded-xl border border-[#dee9fc] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#9E0038] text-white font-bold rounded-xl shadow-md hover:bg-[#7D002C] mt-1"
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
