import React, { useState } from 'react';
import { GarbaEvent } from '../types';
import { GarbaLeafletMap } from './GarbaLeafletMap';
import { VenueIntelligenceCard } from './VenueIntelligenceCard';
import { 
  Compass, 
  MapPin, 
  Car, 
  Sparkles, 
  Clock, 
  Flame, 
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface VenuesMapViewProps {
  events: GarbaEvent[];
  selectedEvent: GarbaEvent;
  onSelectEvent: (event: GarbaEvent) => void;
  onBookPass: (event: GarbaEvent) => void;
  onPreBookParking: (event: GarbaEvent) => void;
  onViewEventDetail: (event: GarbaEvent) => void;
}

export const VenuesMapView: React.FC<VenuesMapViewProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  onBookPass,
  onPreBookParking,
  onViewEventDetail,
}) => {
  const [activeFilterLayer, setActiveFilterLayer] = useState<'all' | 'freeparking' | 'parking' | 'gates' | 'medical' | 'metro'>('all');
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationToast, setLocationToast] = useState<string | null>(null);

  const handleLocateMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserCoords(coords);
          setLocationToast('Located! Calculating shortest route via SG Highway / Ring Road');
          setTimeout(() => setLocationToast(null), 3500);
        },
        () => {
          // Fallback to Bodakdev / SG Highway if user declines browser prompt
          setIsLocating(false);
          setUserCoords([23.033, 72.512]);
          setLocationToast('GPS simulated: Bodakdev, SG Highway Junction');
          setTimeout(() => setLocationToast(null), 3500);
        },
        { timeout: 8000 }
      );
    } else {
      setIsLocating(false);
      setUserCoords([23.033, 72.512]);
      setLocationToast('Location set to Bodakdev, Ahmedabad');
      setTimeout(() => setLocationToast(null), 3500);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 gap-4">
      {/* Toast Notification for GPS */}
      {locationToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#121c2a] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 border border-[#9E0038] animate-in fade-in slide-in-from-top-4">
          <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>{locationToast}</span>
        </div>
      )}

      {/* Map Viewport */}
      <GarbaLeafletMap
        events={events}
        selectedEvent={selectedEvent}
        onSelectEvent={onSelectEvent}
        activeFilterLayer={activeFilterLayer}
        onFilterLayerChange={setActiveFilterLayer}
        userCoords={userCoords}
        onLocateMe={handleLocateMe}
        isLocating={isLocating}
      />

      {/* Live Ground Context Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-pulse" />
          <span className="text-xs font-extrabold text-[#9E0038] uppercase tracking-wider">
            Live Ground & Free Parking Intelligence
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#554336]">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span>Sensors & Municipal Police bays refreshed live</span>
        </div>
      </div>

      {/* Selected Venue Bottom Intelligence Card */}
      <VenueIntelligenceCard
        event={selectedEvent}
        onBookPass={onBookPass}
        onPreBookParking={onPreBookParking}
        onViewEventDetail={onViewEventDetail}
      />

      {/* Explore Other Ahmedabad & Gandhinagar Grounds Carousel */}
      <div className="flex flex-col gap-2.5 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#121c2a]">
            Explore Other Ahmedabad & Gandhinagar Grounds
          </h3>
          <span className="text-xs font-semibold text-[#9E0038]">
            {events.length} Venues
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {events.map((evt) => {
            const isSelected = evt.id === selectedEvent.id;
            return (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className={`min-w-[260px] p-3.5 rounded-2xl bg-white shadow-sm border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'border-[#9E0038] ring-2 ring-[#9E0038]/20 bg-pink-50/30'
                    : 'border-[#dee9fc] hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-extrabold text-[#121c2a] truncate">
                      {evt.venueName}
                    </span>
                    <span className="text-[11px] text-[#554336] truncate">
                      {evt.area}, {evt.city}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    evt.capacityPercentage > 85 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {evt.capacityPercentage > 85 ? 'FAST FILLING' : 'OPEN'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#D92662] font-semibold truncate">
                  <Flame className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{evt.headliners[0]}</span>
                </div>

                {evt.nearbyFreeParking && evt.nearbyFreeParking.length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <span>🅿️ Free Parking: {evt.nearbyFreeParking[0].distance}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#eff4ff]">
                  <span className="font-bold text-[#9E0038]">Pass: {evt.startingPrice === 0 ? 'Free' : `₹${evt.startingPrice}`}</span>
                  <span className="text-[11px] text-gray-500">
                    {evt.parkingLots[0]?.availableSpots || 40}+ P spots
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
