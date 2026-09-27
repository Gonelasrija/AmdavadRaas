import React, { useState, useMemo } from 'react';
import { GarbaEvent } from '../types';
import { NAVRATRI_NIGHTS } from '../data/garbaData';
import { garbaAudio } from '../utils/audioPlayer';
import { 
  Sparkles, 
  MapPin, 
  Mic, 
  Ticket, 
  Star, 
  Flame, 
  Navigation, 
  Car, 
  Play, 
  Square,
  Shirt,
  Check,
  ArrowRight,
  Info,
  Calendar,
  Compass,
  ShieldCheck,
  Music,
  HeartHandshake,
  Clock,
  Search,
  Filter,
  Users,
  ChevronRight,
  RotateCcw,
  Sparkle
} from 'lucide-react';

interface ExploreViewProps {
  events: GarbaEvent[];
  selectedNight: number;
  onSelectNight: (night: number) => void;
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent) => void;
  onPreBookParking: (event: GarbaEvent) => void;
  onViewEventDetail: (event: GarbaEvent) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  events,
  selectedNight,
  onSelectNight,
  onSelectEvent,
  onBookPass,
  onPreBookParking,
  onViewEventDetail,
  activeFilter,
  onFilterChange,
}) => {
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'rating' | 'capacity'>('recommended');

  const currentNightData = NAVRATRI_NIGHTS.find((n) => n.night === selectedNight) || NAVRATRI_NIGHTS[3];

  const handlePlayAudio = (trackTitle: string) => {
    if (playingSong === trackTitle) {
      garbaAudio.stop();
      setPlayingSong(null);
    } else {
      garbaAudio.playTrack(trackTitle, () => setPlayingSong(null));
      setPlayingSong(trackTitle);
    }
  };

  // Filter & Sort events
  const filteredEvents = useMemo(() => {
    let result = events.filter((evt) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'free-parking') return evt.nearbyFreeParking && evt.nearbyFreeParking.length > 0;
      if (activeFilter === 'sg-hwy') return evt.area === 'SG Highway' || evt.area === 'Bodakdev';
      if (activeFilter === 'sbr') return evt.area === 'Sindhu Bhavan';
      if (activeFilter === 'gandhinagar') return evt.city === 'Gandhinagar';
      if (activeFilter === 'sheri') return evt.type === 'Traditional Sheri / Pol';
      if (activeFilter === 'under-500') return evt.startingPrice <= 500;
      if (activeFilter === 'valet') return evt.parkingLots.some((p) => p.type === 'VIP' || p.type === 'Valet & Shuttle');
      return true;
    });

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'capacity') {
      result = [...result].sort((a, b) => a.capacityPercentage - b.capacityPercentage);
    }

    return result;
  }, [events, activeFilter, sortBy]);

  const spotlightEvent = events.find((e) => e.isSpotlight) || events[0];

  return (
    <div className="flex flex-col w-full bg-[#FCFAF7] min-h-screen text-[#1C1917]">
      
      {/* 1. HERO SECTION: Authentic Gujarati Cultural Brand Experience */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5EB] via-[#FFF0F4] to-[#FCFAF7] border-b border-[#E7E5E4] py-10 sm:py-16 px-4 sm:px-6">
        {/* Subtle Decorative Gujarati Rangoli & Mandana Motifs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#F59E0B]/10 to-[#9E0038]/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#9E0038]/10 to-[#F59E0B]/5 blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Cultural Kicker / Trust Marker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#9E0038]/20 shadow-2xs text-xs font-semibold text-[#9E0038] mb-4 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-pulse" />
            <span>Amdavad & Gandhinagar Navratri 2025</span>
            <span className="text-[#A8A29E]">·</span>
            <span className="text-[#B45309] font-bold">UNESCO Heritage</span>
          </div>

          {/* Major Headline with Cultural Typography Hierarchy */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1917] max-w-4xl text-balance leading-[1.15]">
            Experience the Soul of <span className="text-[#9E0038] underline decoration-[#F59E0B]/40 decoration-wavy decoration-2">Amdavad Raas</span>
          </h1>

          {/* Supporting Proposition */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#57534E] max-w-2xl text-balance leading-relaxed">
            Discover verified garba grounds, live congestion levels, verified ₹0 free parking bays, dress code guidelines, and direct M-Passes for Ahmedabad & Gandhinagar.
          </p>

          {/* Hero CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={() => {
                const el = document.getElementById('garba-listings');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#9E0038] hover:bg-[#7D002C] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-[#FEF3C7]" />
              <span>Explore Grounds</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectEvent(spotlightEvent)}
              className="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-[#FFF0F4] border border-[#9E0038]/30 hover:border-[#9E0038] text-[#9E0038] text-sm font-bold shadow-2xs transition-all active:scale-98"
            >
              <Navigation className="w-4 h-4" />
              <span>Live Venue Map</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-10 sm:mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-6 border-t border-[#E7E5E4]/80 text-left">
            <div className="p-3 rounded-2xl bg-white/70 border border-[#E7E5E4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center shrink-0">
                <Ticket className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-[#1C1917] tabular-nums">18+ Grounds</div>
                <div className="text-[11px] text-[#57534E]">Verified Passes & Pols</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-[#E7E5E4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                🅿️
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-800 tabular-nums">1,240+ Free Spots</div>
                <div className="text-[11px] text-[#57534E]">Verified ₹0 Public Bays</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-[#E7E5E4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-[#1C1917]">Top Singers</div>
                <div className="text-[11px] text-[#57534E]">Aditya, Kinjal & Geeta</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-[#E7E5E4] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#9E0038] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-base sm:text-lg font-extrabold text-[#1C1917]">RFID M-Pass</div>
                <div className="text-[11px] text-[#57534E]">Instant QR Entry</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-10">

        {/* 2. 9-NIGHT NAVRATRI INTERACTIVE RAIL & ATTIRE GUIDE */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center text-xs">
                🪔
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#1C1917]">
                  Navratri 9 Raas Raatri Guide
                </h2>
                <p className="text-xs text-[#57534E]">
                  Select tonight's night to preview auspicious goddess devotion, attire color & themes
                </p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] text-[#9E0038] text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-ping" />
              <span>Night {selectedNight} Active Tonight</span>
            </div>
          </div>

          {/* 9-Day Scroller Buttons */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {NAVRATRI_NIGHTS.map((night) => {
              const isActive = night.night === selectedNight;
              return (
                <button
                  key={night.night}
                  onClick={() => onSelectNight(night.night)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-16 sm:w-20 h-20 rounded-2xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-[#9E0038] text-white border-[#9E0038] shadow-md scale-102 ring-2 ring-[#9E0038]/20'
                      : 'bg-white text-[#1C1917] border-[#E7E5E4] hover:bg-[#FCFAF7] hover:border-[#9E0038]/30 shadow-2xs'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-[#78716C]'}`}>
                    Night {night.night}
                  </span>
                  <span className="text-xl font-extrabold leading-none my-0.5 tabular-nums">
                    {night.dayNum}
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span 
                      className="w-2 h-2 rounded-full ring-1 ring-black/10" 
                      style={{ backgroundColor: night.colorHex }} 
                    />
                    <span className={`text-[10px] font-semibold truncate max-w-[48px] ${isActive ? 'text-white/90' : 'text-[#57534E]'}`}>
                      {night.color}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dynamic Day Goddess & Attire Advice Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7E5E4] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-7 h-7 rounded-full ring-3 ring-white shadow-xs shrink-0 flex items-center justify-center text-xs" 
                style={{ backgroundColor: currentNightData.colorHex }}
              >
                ✨
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-extrabold text-[#1C1917]">
                  Night {currentNightData.night} Sacred Color: {currentNightData.color}
                </span>
                <p className="text-xs text-[#57534E] mt-0.5">
                  <strong>Recommended Attire:</strong> {currentNightData.dressAdvice}
                </p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#FFF0F4] text-[#9E0038] text-xs font-bold uppercase tracking-wider shrink-0">
              Maa {currentNightData.goddess}
            </div>
          </div>
        </section>

        {/* 3. HERO SPOTLIGHT: TONIGHT'S MARQUEE GARBA */}
        {spotlightEvent && (
          <section className="w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#9E0038]" />
                <h2 className="text-base sm:text-lg font-extrabold text-[#1C1917]">
                  Tonight's Spotlight Showcase
                </h2>
              </div>
              <span className="text-xs font-bold text-[#57534E]">
                High Demand · Fast Moving Turnstiles
              </span>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-md border border-[#E7E5E4] flex flex-col md:flex-row">
              {/* Media Section */}
              <div className="relative md:w-5/12 h-64 md:h-auto min-h-[260px]">
                <img
                  src={spotlightEvent.bannerImage}
                  alt={spotlightEvent.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#9E0038] text-white text-[11px] font-bold tracking-wider shadow-sm">
                    <Flame className="w-3.5 h-3.5" />
                    MARQUEE PICK
                  </span>
                  {spotlightEvent.nearbyFreeParking && spotlightEvent.nearbyFreeParking.length > 0 && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[11px] font-bold shadow-sm">
                      🅿️ Free Parking Nearby
                    </span>
                  )}
                </div>

                {/* Live Dhol Rhythm Preview Button */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handlePlayAudio(spotlightEvent.setlist[0]?.title || 'Khalasi')}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#9E0038] text-xs font-bold shadow-md hover:bg-white active:scale-95 transition-all"
                    title="Hear Live Dhol Preview"
                  >
                    {playingSong ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current text-[#D92662]" />
                        <span className="text-[#D92662]">Playing Sample...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Dhol Sample</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bottom Overlay Title on Mobile */}
                <div className="absolute bottom-3 left-3 right-3 text-white md:hidden">
                  <div className="text-amber-200 text-xs font-bold flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" />
                    <span>{spotlightEvent.headliners[0]}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {spotlightEvent.title}
                  </h3>
                </div>
              </div>

              {/* Spotlight Content & Details */}
              <div className="p-5 sm:p-6 md:w-7/12 flex flex-col justify-between gap-4">
                <div>
                  <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#9E0038] mb-1">
                    <Mic className="w-4 h-4 text-[#9E0038]" />
                    <span>{spotlightEvent.headliners.join(' · ')}</span>
                    <span className="text-[#A8A29E]">·</span>
                    <span className="text-[#57534E]">{spotlightEvent.specialGuest || 'Grand Folk Troupe'}</span>
                  </div>

                  <h3 className="hidden md:block text-2xl font-extrabold text-[#1C1917] tracking-tight">
                    {spotlightEvent.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#57534E] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
                    <span className="font-semibold text-[#1C1917]">{spotlightEvent.venueName}</span>
                    <span>· {spotlightEvent.area}, {spotlightEvent.city}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#57534E] mt-3 line-clamp-2 leading-relaxed">
                    {spotlightEvent.themeDescription}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4]">
                      <span className="text-[10px] uppercase font-bold text-[#78716C] block">Ground Surface</span>
                      <span className="font-bold text-[#1C1917]">{spotlightEvent.groundSurface}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4]">
                      <span className="text-[10px] uppercase font-bold text-[#78716C] block">Maha Aarti</span>
                      <span className="font-bold text-[#1C1917]">{spotlightEvent.mahaAartiTime}</span>
                    </div>
                  </div>

                  {/* Free Parking Callout */}
                  {spotlightEvent.nearbyFreeParking && spotlightEvent.nearbyFreeParking.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          P
                        </span>
                        <div className="truncate">
                          <span className="font-bold">Free Municipal Bay: </span>
                          <span className="text-[11px]">{spotlightEvent.nearbyFreeParking[0].name}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-md shadow-2xs shrink-0">
                        {spotlightEvent.nearbyFreeParking[0].walkTime}
                      </span>
                    </div>
                  )}
                </div>

                {/* Price and Action CTAs */}
                <div className="pt-3 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-[#78716C]">Starting from</span>
                    <p className="text-2xl font-extrabold text-[#9E0038]">
                      ₹{spotlightEvent.startingPrice} <span className="text-xs font-normal text-[#57534E]">/ night</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewEventDetail(spotlightEvent)}
                      className="px-3.5 py-2 rounded-xl bg-[#FCFAF7] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-xs font-semibold text-[#1C1917] transition-colors"
                    >
                      Theme & Details
                    </button>
                    <button
                      onClick={() => onSelectEvent(spotlightEvent)}
                      className="px-3.5 py-2 rounded-xl bg-[#FFF0F4] hover:bg-[#FFE0E9] border border-[#9E0038]/20 text-xs font-bold text-[#9E0038] transition-colors flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Map</span>
                    </button>
                    <button
                      onClick={() => onBookPass(spotlightEvent)}
                      className="px-5 py-2 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Book Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. EXPLORE AMDAVAD BY NEIGHBORHOOD / ZONE CAROUSEL */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#1C1917]">
                Explore Amdavad Raas by Zone
              </h2>
              <p className="text-xs text-[#57534E]">
                From sprawling SG Highway clubs to 600-year-old Old City Pol garbas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                id: 'sg-hwy',
                title: 'SG Highway & Bodakdev',
                tag: 'Premier Clubs',
                desc: 'YMCA, Rajpath & grand sand grounds with mega sound systems.',
                count: '6 Grounds',
                color: 'from-rose-500/20 to-pink-500/10'
              },
              {
                id: 'sbr',
                title: 'Sindhu Bhavan (SBR)',
                tag: 'VIP Arenas',
                desc: 'Vibrant party plots, celebrity singers & air-conditioned lounges.',
                count: '4 Arenas',
                color: 'from-amber-500/20 to-orange-500/10'
              },
              {
                id: 'sheri',
                title: 'Old City Pols & Kankaria',
                tag: 'UNESCO Heritage Free',
                desc: 'Authentic Sheri Garba under wooden havelis & traditional diyas.',
                count: 'Free Entry',
                color: 'from-emerald-500/20 to-teal-500/10'
              },
              {
                id: 'gandhinagar',
                title: 'Gandhinagar & GIFT City',
                tag: 'Capital Arenas',
                desc: 'Sector 11 cultural grounds, broad avenues & smooth parking.',
                count: '3 Grounds',
                color: 'from-purple-500/20 to-indigo-500/10'
              }
            ].map((zone) => (
              <button
                key={zone.id}
                onClick={() => onFilterChange(zone.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between min-h-[140px] ${
                  activeFilter === zone.id
                    ? 'bg-white border-[#9E0038] shadow-md ring-2 ring-[#9E0038]/20'
                    : 'bg-white border-[#E7E5E4] hover:border-[#9E0038]/40 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#9E0038]">
                      {zone.tag}
                    </span>
                    <span className="text-[10px] font-bold text-[#78716C] bg-[#FCFAF7] px-1.5 py-0.5 rounded-md border border-[#E7E5E4]">
                      {zone.count}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#1C1917] group-hover:text-[#9E0038] transition-colors">
                    {zone.title}
                  </h4>
                  <p className="text-[11px] text-[#57534E] mt-1 leading-snug">
                    {zone.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#9E0038] mt-2">
                  <span>View Grounds</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 5. SEARCH & FILTER INTERACTION BAR */}
        <section id="garba-listings" className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#1C1917] flex items-center gap-2">
                <span>Featured Garba Grounds</span>
                <span className="text-xs font-bold text-[#9E0038] bg-[#FFF0F4] px-2.5 py-0.5 rounded-full">
                  {filteredEvents.length} Verified
                </span>
              </h2>
              <p className="text-xs text-[#57534E]">
                Real-time capacity sensors, verified dress codes & free parking bays
              </p>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-[#78716C]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E7E5E4] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#9E0038]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="rating">Highest Rated</option>
                <option value="capacity">Least Crowded Ground</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Horizontal Rail */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Grounds' },
              { id: 'free-parking', label: '🅿️ Free Parking Nearby' },
              { id: 'sg-hwy', label: 'SG Highway' },
              { id: 'sbr', label: 'Sindhu Bhavan' },
              { id: 'gandhinagar', label: 'Gandhinagar' },
              { id: 'sheri', label: 'Traditional Sheri (Free)' },
              { id: 'under-500', label: 'Under ₹500' },
              { id: 'valet', label: 'Valet Parking' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => onFilterChange(btn.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeFilter === btn.id
                    ? 'bg-[#9E0038] text-white shadow-xs'
                    : 'bg-white text-[#1C1917] border border-[#E7E5E4] hover:bg-[#FCFAF7] hover:border-[#9E0038]/30'
                }`}
              >
                {activeFilter === btn.id && <Check className="w-3.5 h-3.5" />}
                <span>{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Empty State when no events match active filter */}
          {filteredEvents.length === 0 && (
            <div className="w-full p-8 rounded-3xl bg-white border border-[#E7E5E4] flex flex-col items-center justify-center text-center gap-3 my-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center text-xl">
                🔍
              </div>
              <h3 className="text-base font-extrabold text-[#1C1917]">
                No garba grounds found for this filter
              </h3>
              <p className="text-xs text-[#57534E] max-w-sm">
                Try switching to "All Grounds" or clear your search term to see available Navratri events across Ahmedabad and Gandhinagar.
              </p>
              <button
                onClick={() => onFilterChange('all')}
                className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#9E0038] text-white text-xs font-bold hover:bg-[#7D002C] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* 6. GARBA VENUE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((evt) => {
              const primaryLot = evt.parkingLots[0];
              const firstFreeSpot = evt.nearbyFreeParking?.[0];
              
              return (
                <article
                  key={evt.id}
                  className="rounded-3xl bg-white border border-[#E7E5E4] hover:border-[#9E0038]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Media Header */}
                  <div>
                    <div className="relative w-full h-48 overflow-hidden bg-neutral-100">
                      <img
                        src={evt.bannerImage}
                        alt={evt.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-[#9E0038] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          {evt.type === 'Traditional Sheri / Pol' ? 'HERITAGE FREE' : evt.area}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-white/95 text-[#1C1917] text-[10px] font-bold">
                          {evt.city}
                        </span>
                      </div>

                      {/* Rating pill */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-xs font-bold text-[#1C1917]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                        <span>{evt.rating}</span>
                        <span className="text-[10px] text-[#78716C] font-normal">({evt.reviewsCount})</span>
                      </div>

                      {/* Title & Price on Image Bottom */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <div className="min-w-0 pr-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200 block truncate">
                            {evt.venueName}
                          </span>
                          <h3 className="text-base font-extrabold text-white truncate group-hover:text-amber-200 transition-colors">
                            {evt.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] uppercase text-gray-300 block">Pass From</span>
                          <p className="text-base font-extrabold text-pink-100">
                            {evt.startingPrice === 0 ? 'Free' : `₹${evt.startingPrice}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-4 flex flex-col gap-3">
                      {/* Singer & Venue Address */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[#9E0038] font-bold">
                          <Mic className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{evt.headliners.join(' & ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#57534E] mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                          <span className="truncate">{evt.fullAddress}</span>
                        </div>
                      </div>

                      {/* Free Parking Nearby Callout */}
                      {firstFreeSpot && (
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                              P
                            </span>
                            <span className="text-[11px] font-bold truncate">
                              Free Parking: {firstFreeSpot.name.split('(')[0]}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                            {firstFreeSpot.distance}
                          </span>
                        </div>
                      )}

                      {/* Dress Code & Theme Note */}
                      <div className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4] flex flex-col gap-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1C1917] truncate">
                            Theme: {evt.themeTitle}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#9E0038] font-bold border border-[#E7E5E4] shrink-0">
                            {evt.dressCodeStrictness}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#57534E] line-clamp-1">
                          {evt.dressCodeWomen}
                        </p>
                      </div>

                      {/* Live Ground Capacity & Parking Spots */}
                      <div className="flex items-center justify-between text-xs text-[#57534E] pt-0.5">
                        <div className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-[#9E0038]" />
                          <span>
                            {primaryLot ? `${primaryLot.name.split(' ')[0]}: ` : 'Parking: '}
                            <strong className="text-[#1C1917]">{primaryLot?.availableSpots || 80} left</strong>
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9E0038]" />
                          {evt.capacityPercentage}% Capacity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-4 pt-0 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onViewEventDetail(evt)}
                      className="py-2 px-1 rounded-xl bg-[#FCFAF7] hover:bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onSelectEvent(evt)}
                      className="py-2 px-1 rounded-xl bg-[#FFF0F4] hover:bg-[#FFE0E9] border border-[#9E0038]/20 text-[#9E0038] text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1"
                      title="View on Map & Live Navigation"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Map</span>
                    </button>

                    <button
                      onClick={() => onBookPass(evt)}
                      className="py-2 px-1 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>{evt.startingPrice === 0 ? 'Free Pass' : 'Pass'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 7. WHY AMDAVAD RAAS (CORE VALUE PILLARS) */}
        <section className="rounded-3xl bg-white border border-[#E7E5E4] p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9E0038] bg-[#FFF0F4] px-3 py-1 rounded-full">
              Why Amdavad Raas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] mt-3">
              Built for Garba Lovers by Amdavadis
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2">
              Everything you need for seamless Navratri nights without traffic surprises, fake tickets, or dress code rejections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center font-bold text-lg">
                🅿️
              </div>
              <h4 className="text-base font-extrabold text-[#1C1917]">
                Verified ₹0 Free Parking
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Avoid congestion towing. We track official municipal plots, service road bays, and walking distances for every venue.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Shirt className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#1C1917]">
                Strict Attire Guidance
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Know inner-circle dress code policies before you reach. 16-kali chaniya choli, Kediyu standards & color themes verified nightly.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#9E0038] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#1C1917]">
                Anti-Fraud M-Passes
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Instant encrypted QR codes with dynamic refresh timers that prevent turnstile duplication and counterfeit paper passes.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-extrabold text-[#1C1917]">
                Live Ground Telemetry
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Real-time checked-in dancer counters, gate movement speed, dhol sound decibels, and midnight Maha Aarti timings.
              </p>
            </div>
          </div>
        </section>

        {/* 8. GUJARATI CULTURAL HERITAGE & GARBA TRADITIONS */}
        <section className="rounded-3xl bg-gradient-to-br from-[#FFF5EB] via-[#FFF0F4] to-white border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#9E0038] text-[#FEF3C7] flex items-center justify-center shrink-0 shadow-md text-2xl">
            🪔
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9E0038]">
                Gujarat Cultural Heritage
              </span>
              <span className="text-[#A8A29E]">·</span>
              <span className="text-xs font-semibold text-[#57534E]">UNESCO Intangible Cultural Heritage</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1C1917] mt-1">
              The Essence of Garba: From Deepa to Circular Cosmic Raas
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-2 leading-relaxed">
              Garba originates from the Sanskrit word <em>Garbha</em> (womb). The perforated clay lantern with an auspicious diya flame represents life and inner divinity. Whether performing the rhythmic <strong>2-Taali (Be-Taali)</strong>, the energetic <strong>3-Taali (Tran-Taali)</strong>, or the midnight <strong>Sanedo</strong>, dancers form concentric circles symbolizing the eternal cycle of time.
            </p>
          </div>
        </section>

        {/* 9. CALL TO ACTION: HOST A GARBA / REGISTER VENUE */}
        <section className="rounded-3xl bg-gradient-to-r from-[#9E0038] to-[#7D002C] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FEF3C7] bg-white/10 px-3 py-1 rounded-full">
              For Organizers & Societies
            </span>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
              Organizing a Garba in Ahmedabad or Gandhinagar?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              List your society or party plot garba on Amdavad Raas. Enable smart turnstile passes, broadcast dress codes, and guide attendees to municipal parking.
            </p>
          </div>
          <button
            onClick={() => {
              const hostModalTrigger = document.querySelector('button[aria-label="Host A Garba"]') as HTMLElement;
              hostModalTrigger?.click();
            }}
            className="px-6 py-3 rounded-full bg-white hover:bg-[#FEF3C7] text-[#9E0038] text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 shrink-0"
          >
            List Your Garba Ground
          </button>
        </section>

      </div>

      {/* 10. PROFESSIONAL COMPLETE FOOTER */}
      <footer className="mt-12 bg-white border-t border-[#E7E5E4] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Col */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-[#9E0038] tracking-tight">
                  Amdavad Raas
                </span>
              </div>
              <p className="text-xs text-[#57534E] leading-relaxed">
                The premier digital platform for Navratri Garba discovery, live municipal free parking telemetry, venue dress codes, and authentic Gujarati culture across Ahmedabad and Gandhinagar.
              </p>
              <div className="text-[11px] text-[#78716C] mt-1">
                Navratri 2025 Edition · Gujarat, India
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-3">
                Garba Discovery
              </h4>
              <ul className="space-y-2 text-xs text-[#57534E]">
                <li>
                  <button onClick={() => onFilterChange('all')} className="hover:text-[#9E0038] transition-colors">
                    All Verified Grounds
                  </button>
                </li>
                <li>
                  <button onClick={() => onFilterChange('free-parking')} className="hover:text-[#9E0038] transition-colors">
                    🅿️ Free Parking Nearby Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => onFilterChange('sheri')} className="hover:text-[#9E0038] transition-colors">
                    Traditional Sheri Pol Garba
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectNight(4)} className="hover:text-[#9E0038] transition-colors">
                    9-Night Attire & Color Guide
                  </button>
                </li>
              </ul>
            </div>

            {/* Popular Neighborhoods */}
            <div>
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-3">
                Key Amdavad Zones
              </h4>
              <ul className="space-y-2 text-xs text-[#57534E]">
                <li>
                  <button onClick={() => onFilterChange('sg-hwy')} className="hover:text-[#9E0038] transition-colors">
                    SG Highway & Bodakdev Clubs
                  </button>
                </li>
                <li>
                  <button onClick={() => onFilterChange('sbr')} className="hover:text-[#9E0038] transition-colors">
                    Sindhu Bhavan Road (SBR)
                  </button>
                </li>
                <li>
                  <button onClick={() => onFilterChange('gandhinagar')} className="hover:text-[#9E0038] transition-colors">
                    Gandhinagar Cultural Grounds
                  </button>
                </li>
                <li>
                  <button onClick={() => onFilterChange('sheri')} className="hover:text-[#9E0038] transition-colors">
                    Old Ahmedabad Heritage Pols
                  </button>
                </li>
              </ul>
            </div>

            {/* Safety & Emergency Contacts */}
            <div>
              <h4 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider mb-3">
                Navratri Safety & Help
              </h4>
              <div className="space-y-2 text-xs text-[#57534E]">
                <div className="p-2 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4]">
                  <span className="font-bold text-[#1C1917] block">Women Safety (SHE Team)</span>
                  <span className="text-[11px] text-[#9E0038] font-bold">Dial 1091 / 112</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4]">
                  <span className="font-bold text-[#1C1917] block">Ahmedabad Traffic Police</span>
                  <span className="text-[11px] text-[#57534E]">Helpline: 1095</span>
                </div>
                <div className="p-2 rounded-xl bg-[#FCFAF7] border border-[#E7E5E4]">
                  <span className="font-bold text-[#1C1917] block">Medical Emergency</span>
                  <span className="text-[11px] text-[#57534E]">Ambulance: 108</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Cultural Dedication */}
          <div className="pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#78716C]">
            <div className="flex items-center gap-1.5">
              <span>🪔</span>
              <span>Celebrating Gujarat's Living Heritage · Amdavad Raas</span>
            </div>
            <div>
              © 2025 Amdavad Raas. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
