import React, { useState } from 'react';
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
  Music, 
  Palette, 
  Car, 
  Users, 
  Play, 
  Square,
  ShieldAlert,
  Shirt,
  Check,
  ArrowRight,
  Info
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

  // Filter events based on active category
  const filteredEvents = events.filter((evt) => {
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

  const spotlightEvent = events.find((e) => e.isSpotlight) || events[0];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 gap-5">
      {/* 9-Night Navratri Interactive Rail */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#9E0038]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#9E0038]">
              Navratri 9 Raas Raatri
            </h2>
          </div>
          <span className="text-xs font-bold text-[#D92662] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D92662] animate-ping" />
            Day {selectedNight} Active
          </span>
        </div>

        {/* 9-Day Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {NAVRATRI_NIGHTS.map((night) => {
            const isActive = night.night === selectedNight;
            return (
              <button
                key={night.night}
                onClick={() => onSelectNight(night.night)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl transition-all duration-200 shadow-xs ${
                  isActive
                    ? 'bg-[#9E0038] text-white shadow-md scale-105 ring-2 ring-[#9E0038]/30'
                    : 'bg-white text-[#121c2a] border border-[#dee9fc] hover:bg-[#eff4ff]'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  N{night.night}
                </span>
                <span className="text-base font-extrabold leading-none my-0.5">
                  {night.dayNum}
                </span>
                <span className={`text-[9px] truncate max-w-[48px] ${isActive ? 'text-white/90' : 'text-gray-500'}`}>
                  {night.tithi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day Color & Devotion Guide Banner */}
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-100 via-rose-50 to-amber-100 text-[#2f1500] border border-pink-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-full ring-2 ring-white shadow-xs shrink-0" 
              style={{ backgroundColor: currentNightData.colorHex }} 
            />
            <span>
              <strong>Night {currentNightData.night} Attire Color:</strong> {currentNightData.color} ({currentNightData.dressAdvice})
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E0038] shrink-0">
            {currentNightData.goddess}
          </span>
        </div>
      </section>

      {/* Hero Spotlight: Tonight's Top Garba */}
      {spotlightEvent && (
        <section className="relative w-full rounded-2xl overflow-hidden bg-white shadow-md border border-[#dee9fc]">
          <div className="relative w-full h-56 sm:h-64">
            <img
              src={spotlightEvent.bannerImage}
              alt={spotlightEvent.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Badges on image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#9E0038] text-white text-[10px] font-bold tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5" />
                TONIGHT'S SPOTLIGHT
              </span>
              <span className="px-2 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-bold shadow-sm">
                🅿️ Free Parking Nearby
              </span>
            </div>

            {/* Audio Rhythm Player Preview on Hero */}
            <div className="absolute top-3 right-3">
              <button
                onClick={() => handlePlayAudio(spotlightEvent.setlist[0]?.title || 'Khalasi')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#9E0038] text-xs font-bold shadow-md hover:bg-white active:scale-95 transition-all"
                title="Hear Live Dhol Preview"
              >
                {playingSong ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current text-[#D92662]" />
                    <span className="text-[#D92662]">Playing Dhol...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Live Sample</span>
                  </>
                )}
              </button>
            </div>

            {/* Text Overlay inside Hero Banner */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <div className="flex items-center gap-1.5 mb-1 text-amber-200 text-xs font-bold">
                <Mic className="w-3.5 h-3.5" />
                <span>{spotlightEvent.headliners[0]}</span>
                <span className="opacity-80">· {spotlightEvent.specialGuest || 'Special Folk Set'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {spotlightEvent.title}
              </h3>
              <p className="text-xs text-white/90 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>{spotlightEvent.venueName}, {spotlightEvent.area}</span>
              </p>
            </div>
          </div>

          {/* Hero Details & CTA Bar */}
          <div className="p-4 bg-white flex flex-col gap-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-pink-50/60 border border-pink-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9E0038] animate-pulse" />
                <div>
                  <p className="font-bold text-[#121c2a]">Vibrant Atmosphere</p>
                  <p className="text-[11px] text-[#554336]">{spotlightEvent.checkedInDancers.toLocaleString()} Raas dancers checked in</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-lg bg-pink-100 text-[#9E0038] font-extrabold text-[11px]">
                {spotlightEvent.capacityPercentage}% FULL
              </span>
            </div>

            {/* Spotlight Free Parking Banner */}
            {spotlightEvent.nearbyFreeParking && spotlightEvent.nearbyFreeParking.length > 0 && (
              <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">P</span>
                  <span className="font-bold">Free Parking Available:</span>
                  <span className="truncate max-w-[200px] text-[11px]">{spotlightEvent.nearbyFreeParking[0].name} ({spotlightEvent.nearbyFreeParking[0].distance})</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-md">
                  {spotlightEvent.nearbyFreeParking[0].walkTime}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[11px] text-[#554336]">Passes start at</span>
                <p className="text-xl font-extrabold text-[#9E0038]">
                  ₹{spotlightEvent.startingPrice} <span className="text-xs font-normal text-gray-500">/ night</span>
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onViewEventDetail(spotlightEvent)}
                  className="px-3 py-2 rounded-xl bg-[#e6eeff] text-[#121c2a] text-xs font-semibold hover:bg-[#dee9fc] transition-colors flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Theme & Bio</span>
                </button>
                <button
                  onClick={() => onSelectEvent(spotlightEvent)}
                  className="px-3.5 py-2 rounded-xl bg-pink-50 border border-pink-200 text-[#9E0038] text-xs font-bold hover:bg-pink-100 transition-all active:scale-95 flex items-center gap-1.5 shadow-2xs"
                  title="View on Map & Live Navigation"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#9E0038]" />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => onBookPass(spotlightEvent)}
                  className="px-4 py-2 rounded-xl bg-[#9E0038] text-white text-xs font-bold shadow-md hover:bg-[#7D002C] active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book Pass</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Horizontal Strip */}
      <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Venues' },
          { id: 'free-parking', label: '🅿️ Free Parking Nearby' },
          { id: 'sg-hwy', label: 'SG Highway' },
          { id: 'sbr', label: 'Sindhu Bhavan' },
          { id: 'gandhinagar', label: 'Gandhinagar' },
          { id: 'sheri', label: 'Traditional Sheri' },
          { id: 'under-500', label: 'Under ₹500' },
          { id: 'valet', label: 'Valet Parking' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => onFilterChange(btn.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeFilter === btn.id
                ? 'bg-[#9E0038] text-white shadow-sm'
                : 'bg-white text-[#121c2a] border border-[#dee9fc] hover:bg-[#eff4ff]'
            }`}
          >
            {activeFilter === btn.id && <Check className="w-3.5 h-3.5" />}
            <span>{btn.label}</span>
          </button>
        ))}
      </section>

      {/* Section Title & Venues Count */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-[#121c2a] flex items-center gap-1.5">
            Featured Garba Nights
            <span className="w-2 h-2 rounded-full bg-[#9E0038]" />
          </h3>
          <p className="text-xs text-[#554336]">
            Verified dress codes, theme guidelines & smart parking monitors
          </p>
        </div>
        <span className="text-[11px] font-extrabold text-[#700028] bg-pink-100 px-2.5 py-1 rounded-full">
          {filteredEvents.length} OPEN
        </span>
      </div>

      {/* Featured Garba Cards List */}
      <section className="flex flex-col gap-4">
        {filteredEvents.map((evt) => {
          const primaryP = evt.parkingLots[0];
          return (
            <article
              key={evt.id}
              className="w-full rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#dee9fc] overflow-hidden flex flex-col"
            >
              {/* Card Media Header */}
              <div className="relative w-full h-44 sm:h-48">
                <img
                  src={evt.bannerImage}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="px-2.5 py-1 rounded-md bg-[#9E0038] text-white text-[10px] font-bold shadow-xs">
                    {evt.type === 'Traditional Sheri / Pol' ? 'HERITAGE FREE' : 'FEW PASSES LEFT'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/90 text-[#121c2a] text-[10px] font-bold">
                    {evt.city}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold text-[#121c2a]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span>{evt.rating}</span>
                  <span className="text-[10px] text-gray-500 font-normal">({evt.reviewsCount})</span>
                </div>

                {/* Bottom Overlay Title & Price */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200">
                      {evt.area}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-white truncate">
                      {evt.title}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] uppercase text-gray-300 block">Pass Tier</span>
                    <p className="text-base sm:text-lg font-extrabold text-pink-100">
                      {evt.startingPrice === 0 ? 'Free' : `₹${evt.startingPrice}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body with Venue, Singer, Theme, Dress Code & Parking */}
              <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
                {/* Location & Headliner */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#554336]">
                    <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
                    <span className="font-semibold text-[#121c2a] truncate">{evt.venueName}</span>
                    <span>· {evt.area}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#D92662] font-bold">
                    <Mic className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{evt.headliners.join(' & ')}</span>
                  </div>
                </div>

                {/* Nearby Free Parking Pill if Available */}
                {evt.nearbyFreeParking && evt.nearbyFreeParking.length > 0 && (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        P
                      </span>
                      <span className="text-[11px] font-bold truncate">
                        Free Parking: {evt.nearbyFreeParking[0].name.split('(')[0]}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md shrink-0 shadow-2xs">
                      {evt.nearbyFreeParking[0].distance}
                    </span>
                  </div>
                )}

                {/* Theme & Dress Code Banner */}
                <div className="p-2.5 rounded-xl bg-pink-50/40 border border-pink-100 flex flex-col gap-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-[#9E0038]">
                      <Palette className="w-3.5 h-3.5" />
                      <span className="truncate">Theme: {evt.themeTitle}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#9E0038] font-bold shrink-0">
                      {evt.dressCodeStrictness}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#554336] line-clamp-1">
                    <strong>Attire:</strong> {evt.dressCodeWomen}
                  </p>
                </div>

                {/* Live Parking & Capacity Status */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <div className="flex items-center gap-1.5 text-[#554336]">
                    <Car className="w-3.5 h-3.5 text-[#9E0038]" />
                    <span>
                      {primaryP ? `${primaryP.name.split(' ')[0]}: ` : 'Parking: '}
                      <strong className="text-[#9E0038]">{primaryP?.availableSpots || 100} spots free</strong>
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#D92662] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D92662]" />
                    {evt.capacityPercentage}% Capacity
                  </span>
                </div>

                {/* Action Trigger Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#eff4ff]">
                  <button
                    onClick={() => onViewEventDetail(evt)}
                    className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#eff4ff] hover:bg-[#dee9fc] text-[#121c2a] text-xs font-semibold transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-[#9E0038]" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-[#9E0038] text-xs font-bold transition-all active:scale-95 shadow-2xs"
                    title="View on Map & Live Navigation"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#9E0038]" />
                    <span>Map</span>
                  </button>

                  <button
                    onClick={() => onBookPass(evt)}
                    className="flex items-center justify-center gap-1 py-2 px-1 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{evt.startingPrice === 0 ? 'Get Pass' : 'Book Pass'}</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Traditional Attire Advisory Banner */}
      <section className="w-full p-4 rounded-2xl bg-[#ffd9e0]/40 border border-[#ffd9e0] flex items-start gap-3 text-xs">
        <div className="w-10 h-10 rounded-full bg-[#ffd9e0] text-[#af275a] flex items-center justify-center shrink-0">
          <Shirt className="w-5 h-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-[#121c2a]">
            Traditional Attire Advisory for Amdavad & Gandhinagar Grounds
          </h4>
          <p className="text-[#554336] leading-relaxed">
            Strict traditional Chaniya Choli (with dupatta) and Kurta Kediyu required for entry into inner dancing circles across SG Highway, Bodakdev, and Sector 11 grounds. T-shirts and western casuals are redirected to outer spectator lounges.
          </p>
        </div>
      </section>
    </div>
  );
};
