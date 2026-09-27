import React, { useState } from 'react';
import { GarbaEvent, PassTier } from '../types';
import { garbaAudio } from '../utils/audioPlayer';
import { 
  X, 
  MapPin, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  Shirt, 
  Palette, 
  Activity, 
  Users, 
  Car, 
  Mic, 
  Play, 
  Square, 
  Check, 
  Navigation, 
  Ticket, 
  Heart,
  Share2,
  AlertCircle
} from 'lucide-react';

interface EventDetailModalProps {
  event: GarbaEvent;
  onClose: () => void;
  onBookPass: (event: GarbaEvent, selectedTier: PassTier) => void;
  onPreBookParking: (event: GarbaEvent) => void;
  onOpenMap?: (event: GarbaEvent) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onBookPass,
  onPreBookParking,
  onOpenMap,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(event.passTiers[0]?.id || '');
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const selectedTier = event.passTiers.find((t) => t.id === selectedTierId) || event.passTiers[0];

  const handleToggleAudio = (trackTitle: string) => {
    if (playingSong === trackTitle) {
      garbaAudio.stop();
      setPlayingSong(null);
    } else {
      garbaAudio.playTrack(trackTitle, () => setPlayingSong(null));
      setPlayingSong(trackTitle);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${event.title} - Navratri 2025`,
        text: `Join me at ${event.venueName} with ${event.headliners.join(', ')} tonight!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    event.googleMapsQuery || `${event.venueName}, Ahmedabad`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#f8f9ff] sm:rounded-3xl shadow-2xl flex flex-col min-h-screen sm:min-h-0 sm:max-h-[90vh] overflow-hidden">
        {/* Floating Top Nav within Modal */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#dee9fc]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E0038]">
              Venue & Pass Intel
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full hover:bg-[#eff4ff] transition-colors ${
                isSaved ? 'text-[#9E0038]' : 'text-gray-500'
              }`}
              aria-label="Bookmark Event"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-[#eff4ff] text-gray-500 transition-colors"
              aria-label="Share Event"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#eff4ff] text-[#121c2a] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Share toast feedback */}
        {shareToast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#121c2a] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
            Link copied to clipboard!
          </div>
        )}

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 flex flex-col gap-5 pb-24">
          {/* Hero Banner with Media */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md">
            <img
              src={event.bannerImage}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs text-xs font-bold text-[#9E0038]">
              <span className="w-2 h-2 rounded-full bg-[#FF2E75] animate-pulse" />
              <span>Maha Raas 2025</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {event.sansthaName}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 leading-tight">
                {event.title}
              </h1>
              <p className="text-xs text-white/90 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span className="truncate">{event.fullAddress}</span>
              </p>
            </div>
          </div>

          {/* Timings & Starting Price Strip */}
          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#9E0038] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#121c2a] block">
                  {event.dholStartTime} – 02:30 AM
                </span>
                <span className="text-[11px] text-[#554336] block">
                  Gates open {event.gatesOpenTime} · Aarti at {event.mahaAartiTime}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#700028] px-2 py-0.5 rounded-full bg-pink-100 block">
                Entry Pass
              </span>
              <p className="text-lg font-extrabold text-[#9E0038] mt-0.5">
                {event.startingPrice === 0 ? 'Free Entry' : `₹${event.startingPrice}`}
                <span className="text-[10px] font-normal text-gray-500"> onwards</span>
              </p>
            </div>
          </div>

          {/* Dedicated Dress Code & Theme Card (Crucial User Requirement) */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-[#9E0038] flex items-center justify-center">
                  <Shirt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E0038] block">
                    Tonight's Dress Code
                  </span>
                  <h3 className="text-sm font-bold text-[#121c2a]">
                    {event.dressCodeTitle}
                  </h3>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-pink-100 text-[#700028] text-[10px] font-bold">
                {event.dressCodeStrictness}
              </span>
            </div>

            {/* Theme Explanation */}
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc] flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#8d4b00]">
                <Palette className="w-4 h-4" />
                <span>Theme Inspiration: {event.themeTitle}</span>
              </div>
              <p className="text-[11px] text-[#554336] leading-relaxed">
                {event.themeDescription}
              </p>
            </div>

            {/* Gender-specific Dress Guidelines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#fffbff] border border-[#ffddb8] flex flex-col gap-1">
                <span className="font-bold text-[#8d4b00] uppercase text-[10px] tracking-wider">
                  Women's Attire Guidelines
                </span>
                <p className="text-[11px] text-[#554336] leading-relaxed">
                  {event.dressCodeWomen}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#fffbff] border border-[#ffddb8] flex flex-col gap-1">
                <span className="font-bold text-[#8d4b00] uppercase text-[10px] tracking-wider">
                  Men's Attire Guidelines
                </span>
                <p className="text-[11px] text-[#554336] leading-relaxed">
                  {event.dressCodeMen}
                </p>
              </div>
            </div>

            {/* Ground Surface Warning */}
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs flex items-center justify-between text-amber-900">
              <span className="font-medium">
                <strong>Ground Surface:</strong> {event.groundSurface} (Barefoot or soft sole mojari recommended for injury prevention)
              </span>
            </div>
          </section>

          {/* Live Ground Pulse & Sensor Decibels */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8d4b00]">
                  Live Ground Pulse
                </span>
                <h3 className="text-sm font-bold text-[#121c2a]">
                  Community Vibe & Decibels
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#8d4b00] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{event.decibels} dB Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#121c2a]">Electrifying Garba Ring</span>
                <span className="text-[#af275a] font-bold">
                  {event.checkedInDancers.toLocaleString()}+ Dancers Present
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#e6eeff] overflow-hidden flex">
                <div className="h-full bg-[#8d4b00]" style={{ width: `${Math.min(event.capacityPercentage, 75)}%` }} />
                <div className="h-full bg-[#af275a]" style={{ width: `${Math.max(0, event.capacityPercentage - 75)}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#554336]">
                <span>{event.gateStatus}</span>
                <span>{event.capacityPercentage}% Ground Capacity</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Turnstile Wait</span>
                <span className="font-bold text-[#121c2a]">~3 to 5 Minutes</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Dedicated Medical Bay</span>
                <span className="font-bold text-[#121c2a]">Gate 2 108 Ambulance</span>
              </div>
            </div>
          </section>

          {/* Musical Maestros & Audio Track Preview */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#af275a]">
                  Musical Maestros
                </span>
                <h3 className="text-sm font-bold text-[#121c2a]">
                  Featured Troupe & Singers
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#8d4b00]">
                {event.setlist.length} Stage Rounds
              </span>
            </div>

            {/* Headliner Profile */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#eff4ff] border border-[#dee9fc]">
              {event.headlinerPhoto && (
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-xs shrink-0">
                  <img
                    src={event.headlinerPhoto}
                    alt={event.headliners[0]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="text-sm font-bold text-[#121c2a] truncate">
                  {event.headliners[0]}
                </h4>
                <p className="text-xs font-semibold text-[#af275a] truncate">
                  {event.specialGuest || 'Gujarati Folk Legend'}
                </p>
                <span className="text-[11px] text-[#554336] mt-1">
                  Singing non-stop traditional 2-taali, 3-taali, and Dakla sets
                </span>
              </div>
            </div>

            {/* Setlist Audio Previews */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-[#121c2a]">Tonight's Raas Setlist</span>
              {event.setlist.map((track) => {
                const isCurrentPlaying = playingSong === track.title;
                return (
                  <div
                    key={track.id}
                    className="p-2.5 rounded-xl bg-[#f8f9ff] border border-[#dee9fc] flex items-center justify-between gap-2 shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-pink-100 text-[#700028] text-xs font-bold flex items-center justify-center shrink-0">
                        {track.id}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#121c2a] truncate">
                          {track.title}
                        </p>
                        <p className="text-[10px] text-[#554336] truncate">
                          {track.round} · {track.vibe}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAudio(track.title)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isCurrentPlaying
                          ? 'bg-[#9E0038] text-white animate-pulse'
                          : 'bg-[#eff4ff] text-[#9E0038] hover:bg-[#dee9fc]'
                      }`}
                      title={isCurrentPlaying ? 'Pause Dhol' : 'Hear Sample Beat'}
                    >
                      {isCurrentPlaying ? (
                        <Square className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pass Tiers Selection Grid */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E0038]">
                  Pass Availability
                </span>
                <h3 className="text-sm font-bold text-[#121c2a]">
                  Select Pass Tier
                </h3>
              </div>
              <span className="text-xs font-bold text-[#D92662]">18% GST Included</span>
            </div>

            <div className="flex flex-col gap-2">
              {event.passTiers.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <label
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-[#9E0038] bg-pink-50/40 ring-2 ring-[#9E0038]/20 shadow-sm'
                        : 'border-[#dee9fc] bg-white hover:bg-[#eff4ff]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#121c2a]">
                            {tier.name}
                          </span>
                          {tier.badge && (
                            <span className="px-2 py-0.2 rounded-full bg-pink-100 text-[#700028] text-[10px] font-bold">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#554336] mt-0.5">
                          {tier.description}
                        </p>
                      </div>

                      <span className="text-base sm:text-lg font-extrabold text-[#9E0038]">
                        {tier.price === 0 ? 'Free' : `₹${tier.price}`}
                      </span>
                    </div>

                    {/* Perks */}
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-[#f0f4fc] text-[11px] text-[#554336]">
                      {tier.perks.map((perk, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[#9E0038]">
                          <Check className="w-3 h-3 text-[#9E0038]" />
                          <span>{perk}</span>
                        </span>
                      ))}
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {/* Free Parking Section in EventDetailModal */}
          {event.nearbyFreeParking && event.nearbyFreeParking.length > 0 && (
            <section className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/60 to-teal-50 border border-emerald-200 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center">
                    P
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-950">
                    Nearby Free Parking Available (₹0)
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full">
                  Verified Municipal Spots
                </span>
              </div>

              <div className="space-y-2 pt-1">
                {event.nearbyFreeParking.map((freeSpot) => (
                  <div
                    key={freeSpot.id}
                    className="p-3 bg-white rounded-xl border border-emerald-100 flex flex-col gap-1.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#121c2a]">{freeSpot.name}</span>
                          {freeSpot.isOfficialTieUp && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                              Official Free Bay
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#554336] mt-0.5">{freeSpot.locationHint}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 block">
                          {freeSpot.distance} · {freeSpot.walkTime}
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-700 mt-0.5 block">
                          100% FREE
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-emerald-50 text-[10px] text-[#554336]">
                      <span>🚗 {freeSpot.capacityText}</span>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          freeSpot.googleMapsQuery || `${freeSpot.name}, Ahmedabad`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                      >
                        <span>Directions</span>
                        <Navigation className="w-2.5 h-2.5" />
                      </a>
                    </div>

                    <div className="text-[9px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{freeSpot.safetyNote}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Smart Parking & Valet Pre-Booking Callout */}
          <section className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#9E0038] flex items-center justify-center shadow-xs shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-xs sm:text-sm font-bold text-[#121c2a]">
                  Prefer Reserved On-Venue Parking?
                </h4>
                <p className="text-[11px] text-[#554336]">
                  Pre-book P1 VIP or Valet slot with dedicated gate access tag.
                </p>
              </div>
            </div>

            <button
              onClick={() => onPreBookParking(event)}
              className="px-3 py-2 rounded-xl bg-white border border-[#9E0038] text-[#9E0038] text-xs font-bold hover:bg-pink-50 shrink-0 transition-colors shadow-xs"
            >
              Book Parking
            </button>
          </section>

          {/* Location & Navigation */}
          <section className="p-4 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex flex-col gap-3">
            <h3 className="text-sm font-bold text-[#121c2a]">Venue Location & Access</h3>
            <p className="text-xs text-[#554336] leading-relaxed">
              {event.fullAddress}
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-[#dee9fc]">
              <span className="text-xs text-gray-500">
                Near SG Highway BRTS & Metro feeder
              </span>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-[#9E0038] hover:underline"
              >
                <span>Get Driving Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>

          {/* 100% Traditional Garba Ethics */}
          <div className="p-3.5 rounded-2xl bg-pink-50/40 text-center flex flex-col gap-1 border border-pink-100 text-xs">
            <span className="font-bold text-[#9E0038]">100% Traditional Garba Ethics Guarantee</span>
            <p className="text-[11px] text-[#554336]">
              Mandli & Sanstha Garba strictly observes reverence towards Maa Ambe with traditional Aarti at 12:00 midnight. Alcohol, smoking, and western casual attire are prohibited on consecrated ground.
            </p>
          </div>
        </div>

        {/* Sticky Bottom Booking Bar */}
        <div className="sticky bottom-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-[#dee9fc] p-4 flex items-center justify-between gap-3 shadow-xl">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 uppercase font-semibold">
              {selectedTier.name}
            </span>
            <span className="text-xl font-extrabold text-[#9E0038]">
              {selectedTier.price === 0 ? 'Free' : `₹${selectedTier.price}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPreBookParking(event)}
              className="p-2.5 rounded-xl border border-[#dee9fc] hover:bg-pink-50 text-[#554336] transition-colors"
              title="Pre-book Parking"
            >
              <Car className="w-5 h-5 text-[#9E0038]" />
            </button>

            {/* Map Feature Next to Book Pass */}
            <button
              onClick={() => {
                if (onOpenMap) {
                  onClose();
                  onOpenMap(event);
                } else {
                  window.open(googleMapsUrl, '_blank');
                }
              }}
              className="py-2.5 px-3.5 rounded-xl bg-pink-50 border border-pink-200 hover:bg-pink-100 text-[#9E0038] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
              title="View on Map & Live Navigation"
            >
              <Navigation className="w-4 h-4 text-[#9E0038]" />
              <span>Map</span>
            </button>

            <button
              onClick={() => onBookPass(event, selectedTier)}
              className="py-2.5 px-4 sm:px-6 rounded-xl bg-[#9E0038] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#7D002C] active:scale-95 transition-all flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Pass</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
