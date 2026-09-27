import React, { useState } from 'react';
import { GarbaEvent } from '../types';
import { 
  MapPin, 
  Mic, 
  Ticket, 
  Users, 
  Car, 
  Navigation, 
  ExternalLink, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface VenueIntelligenceCardProps {
  event: GarbaEvent;
  onBookPass: (event: GarbaEvent) => void;
  onPreBookParking: (event: GarbaEvent) => void;
  onViewEventDetail: (event: GarbaEvent) => void;
}

export const VenueIntelligenceCard: React.FC<VenueIntelligenceCardProps> = ({
  event,
  onBookPass,
  onPreBookParking,
  onViewEventDetail,
}) => {
  const [showReviewsDrawer, setShowReviewsDrawer] = useState(false);

  // Compute primary parking lot states
  const p1 = event.parkingLots.find((p) => p.code === 'P1') || event.parkingLots[0];
  const p2 = event.parkingLots.find((p) => p.code === 'P2') || event.parkingLots[1];
  const p3 = event.parkingLots.find((p) => p.code === 'P3') || event.parkingLots[2];

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    event.googleMapsQuery || `${event.venueName}, Ahmedabad`
  )}`;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#dee9fc] p-4 sm:p-5 flex flex-col gap-4 transition-all">
      {/* Drag handle visual affordance */}
      <div className="w-10 h-1 bg-[#dbc2b0]/60 rounded-full mx-auto" />

      {/* Header Info: Badges, Title, Address & Thumbnail */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 bg-[#FFF0F4] text-[#9E0038] rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-[#9E0038]/20">
              LIVE TONIGHT
            </span>
            <span className="px-2.5 py-0.5 bg-[#FEF3C7] text-[#B45309] rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              {event.area}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-[#1C1917] leading-tight truncate">
            {event.venueName}
          </h2>

          <p className="text-xs text-[#57534E] flex items-center gap-1 mt-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
            <span className="truncate">{event.fullAddress}</span>
          </p>
        </div>

        {/* Thumbnail with Time Tag */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xs shrink-0 border border-[#E7E5E4]">
          <img
            src={event.thumbnailImage || event.bannerImage}
            alt={event.venueName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-[#9E0038]/95 text-white px-2 py-0.5 rounded-tl-lg text-[10px] font-bold">
            {event.dholStartTime}
          </span>
        </div>
      </div>

      {/* Headliner Artist Strip */}
      <div className="p-3 rounded-2xl bg-[#FCFAF7] flex items-center justify-between gap-2 border border-[#E7E5E4]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#9E0038] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Mic className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#9E0038] truncate">
              {event.headliners[0]}
            </span>
            <span className="text-[11px] text-[#57534E] truncate">
              {event.specialGuest || event.themeTitle}
            </span>
          </div>
        </div>
        <button
          onClick={() => onViewEventDetail(event)}
          className="text-xs font-bold text-[#9E0038] hover:underline shrink-0 px-2 py-1"
        >
          Lineup & Bio
        </button>
      </div>

      {/* Theme & Dress Code Highlight Strip */}
      <div className="p-3 rounded-2xl bg-white border border-[#E7E5E4] flex flex-col gap-1 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
            <Sparkles className="w-3.5 h-3.5 text-[#9E0038]" />
            <span>Theme: {event.themeTitle}</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FFF0F4] text-[#9E0038] font-bold border border-[#9E0038]/20">
            {event.dressCodeStrictness}
          </span>
        </div>
        <p className="text-[11px] text-[#57534E] leading-relaxed line-clamp-2">
          <strong>Dress Code:</strong> {event.dressCodeWomen}
        </p>
      </div>

      {/* Pass Pricing Strip */}
      <div className="flex items-center justify-between px-3 py-2.5 rounded-2xl bg-[#FFF0F4]/60 border border-[#FED7E2] text-xs font-bold text-[#1C1917]">
        <div className="flex items-center gap-1.5">
          <Ticket className="w-4 h-4 text-[#9E0038]" />
          <span>Pass from: {event.startingPrice === 0 ? 'Free' : `₹${event.startingPrice}`}</span>
        </div>
        <div className="h-3 w-px bg-pink-200" />
        <span className="text-[#9E0038]">
          Couple: ₹{event.passTiers[1]?.price || Math.round(event.startingPrice * 1.8)}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white text-[#9E0038] font-bold shadow-2xs border border-pink-200">
          Instant QR
        </span>
      </div>

      {/* Live Crowd & Decibel Meter */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#121c2a]">
            <Users className="w-4 h-4 text-[#9E0038]" />
            <span>Ground Crowd & Decibels</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#700028]">
            {event.decibels} dB · {event.capacityPercentage}% Full
          </span>
        </div>

        {/* Segmented capacity bar */}
        <div className="w-full grid grid-cols-4 gap-1 h-2">
          <div className={`rounded-full ${event.capacityPercentage > 20 ? 'bg-[#9E0038]' : 'bg-gray-200'}`} />
          <div className={`rounded-full ${event.capacityPercentage > 45 ? 'bg-[#9E0038]' : 'bg-gray-200'}`} />
          <div className={`rounded-full ${event.capacityPercentage > 70 ? 'bg-[#9E0038]' : 'bg-gray-200'}`} />
          <div className={`rounded-full ${event.capacityPercentage > 85 ? 'bg-[#D92662]' : 'bg-gray-200'}`} />
        </div>

        <div className="flex justify-between text-[11px] text-[#554336]">
          <span>{event.gateStatus.split('·')[0] || 'Gates moving'}</span>
          <span>{event.checkedInDancers.toLocaleString()} dancers inside</span>
        </div>
      </div>

      {/* NEW: Nearby Free Parking Locations Highlight Card */}
      {event.nearbyFreeParking && event.nearbyFreeParking.length > 0 && (
        <div className="flex flex-col gap-2.5 p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-teal-50 border border-emerald-200 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                P
              </span>
              <h3 className="text-xs font-bold text-emerald-950">
                Nearby Free Parking Options (₹0)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-white/90 border border-emerald-200 px-2 py-0.5 rounded-full">
              {event.nearbyFreeParking.length} Spots Identified
            </span>
          </div>

          <p className="text-[11px] text-emerald-800 leading-snug">
            Save on parking fees! Municipal designated and police-monitored free parking available within easy walking distance:
          </p>

          <div className="space-y-2">
            {event.nearbyFreeParking.map((freeSpot) => (
              <div 
                key={freeSpot.id}
                className="p-2.5 bg-white rounded-xl border border-emerald-100 flex flex-col gap-1.5 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#121c2a]">
                        {freeSpot.name}
                      </span>
                      {freeSpot.isOfficialTieUp && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          Official AMC Bay
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-gray-600 mt-0.5">
                      {freeSpot.locationHint}
                    </span>
                  </div>

                  <div className="flex flex-col items-end shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {freeSpot.distance} ({freeSpot.walkTime})
                    </span>
                    <span className="text-[9px] font-extrabold text-emerald-700 mt-0.5">
                      FREE / ₹0
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-emerald-50 text-[10px]">
                  <span className="text-gray-500">
                    🚗 {freeSpot.capacityText}
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      freeSpot.googleMapsQuery || `${freeSpot.name}, Ahmedabad`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5"
                  >
                    <span>Route</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="text-[9px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{freeSpot.safetyNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Parking Monitor Widget */}
      <div className="flex flex-col gap-2.5 bg-[#FCFAF7] p-3.5 rounded-2xl border border-[#E7E5E4]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4 text-[#9E0038]" />
            <h3 className="text-xs font-bold text-[#1C1917]">On-Venue Reserved & Valet Parking</h3>
          </div>
          <span className="text-[10px] font-bold text-[#9E0038] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sensor Live
          </span>
        </div>

        {/* 3 Parking Lots Grid */}
        <div className="grid grid-cols-1 gap-1.5">
          {p1 && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white shadow-2xs border border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center text-[10px] font-bold">
                  {p1.code}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#1C1917]">{p1.name}</span>
                  <span className="text-[10px] text-[#57534E]">₹{p1.price} · Fast Lane Access</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  p1.fillPercentage > 85 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {p1.fillPercentage}% Full
                </span>
                <span className="text-[10px] text-[#57534E]">{p1.availableSpots} spots left</span>
              </div>
            </div>
          )}

          {p2 && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white shadow-2xs border border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-[#5c3a00] flex items-center justify-center text-[10px] font-bold">
                  {p2.code}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#1C1917]">{p2.name}</span>
                  <span className="text-[10px] text-[#57534E]">₹{p2.price} · General Public</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold">
                  {p2.availableSpots} spots left
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">Fast Entrance</span>
              </div>
            </div>
          )}

          {p3 && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white shadow-2xs border border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-[#1C1917] flex items-center justify-center text-[10px] font-bold">
                  {p3.code}
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#1C1917]">{p3.name}</span>
                  <span className="text-[10px] text-[#57534E]">{p3.statusText}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 text-[10px] font-bold">
                  Ample Space
                </span>
                <span className="text-[10px] text-[#57534E]">{p3.availableSpots}+ slots</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Navigate Map + Book Pass + Pre-Book Parking */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          {/* Direct Google Maps Navigation */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#1C1917] text-white text-xs font-bold shadow-xs hover:bg-black transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate Map</span>
          </a>

          {/* Book Pass CTA */}
          <button
            onClick={() => onBookPass(event)}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Pass</span>
          </button>
        </div>

        {/* Pre-book Parking Slot CTA */}
        <button
          onClick={() => onPreBookParking(event)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-[#9E0038] text-[#9E0038] font-bold text-xs hover:bg-[#FFF0F4] active:scale-95 transition-all shadow-2xs"
        >
          <Car className="w-4 h-4" />
          <span>Pre-book Reserved Parking Slot</span>
        </button>

        {/* Community Driver Reviews Toggle */}
        <button
          onClick={() => setShowReviewsDrawer(!showReviewsDrawer)}
          className="w-full flex items-center justify-center gap-1 py-1 text-xs text-[#57534E] hover:text-[#9E0038] transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Read Real-time Parking Reviews (18 Drivers Checked-in)</span>
          {showReviewsDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Micro Parking Community Reviews */}
      {showReviewsDrawer && (
        <div className="flex flex-col gap-2 pt-2 border-t border-[#E7E5E4] animate-in fade-in duration-200">
          <div className="p-2.5 rounded-xl bg-[#FCFAF7] text-xs flex flex-col gap-1 border border-[#E7E5E4]">
            <div className="flex items-center justify-between font-bold text-[#1C1917]">
              <span>Hardik Shah (Swift Dzire)</span>
              <span className="text-[10px] text-[#78716C] font-normal">8 mins ago</span>
            </div>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              P1 is clogged with VIP SUVs near the fountain gate. Take P2 Gate 3 directly from SG Highway service lane to save 20 minutes!
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FCFAF7] text-xs flex flex-col gap-1 border border-[#E7E5E4]">
            <div className="flex items-center justify-between font-bold text-[#1C1917]">
              <span>Meera Joshi</span>
              <span className="text-[10px] text-[#78716C] font-normal">15 mins ago</span>
            </div>
            <p className="text-[11px] text-[#57534E] leading-relaxed">
              Valet at P3 (Iscon crossover) has dedicated female security and buggy drop right up to the Aarti gate. Very smooth!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
