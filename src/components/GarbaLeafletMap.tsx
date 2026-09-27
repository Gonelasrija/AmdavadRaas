import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { GarbaEvent } from '../types';
import { 
  Navigation, 
  Layers, 
  Locate, 
  Compass, 
  MapPin, 
  Car, 
  ShieldAlert, 
  Train,
  Check
} from 'lucide-react';

interface GarbaLeafletMapProps {
  events: GarbaEvent[];
  selectedEvent: GarbaEvent;
  onSelectEvent: (event: GarbaEvent) => void;
  activeFilterLayer: 'all' | 'freeparking' | 'parking' | 'gates' | 'medical' | 'metro';
  onFilterLayerChange: (layer: 'all' | 'freeparking' | 'parking' | 'gates' | 'medical' | 'metro') => void;
  userCoords: [number, number] | null;
  onLocateMe: () => void;
  isLocating: boolean;
}

export const GarbaLeafletMap: React.FC<GarbaLeafletMapProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
  activeFilterLayer,
  onFilterLayerChange,
  userCoords,
  onLocateMe,
  isLocating,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered around SG Highway & Gandhinagar corridor
    const map = L.map(mapContainerRef.current, {
      center: selectedEvent.coordinates,
      zoom: 12,
      zoomControl: false,
    });

    // Clean, readable OpenStreetMap tiles with warm tone
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers and Route when events or selected event changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Render Event Markers
    events.forEach((evt) => {
      const isSelected = evt.id === selectedEvent.id;
      const primaryP1 = evt.parkingLots.find((p) => p.code === 'P1') || evt.parkingLots[0];
      const parkingSummary = primaryP1 ? `${primaryP1.availableSpots} ${primaryP1.code} left` : 'P Open';

      // Custom Festive Marker Pin HTML in Royal Crimson and Gold
      const iconHtml = `
        <div class="relative flex flex-col items-center cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-10'
        }">
          <!-- Floating Pill Label -->
          <div class="px-2 py-0.5 rounded-md shadow-md flex items-center gap-1.5 mb-1 whitespace-nowrap text-[11px] font-bold ${
            isSelected 
              ? 'bg-[#121c2a] text-white ring-2 ring-[#9E0038]' 
              : 'bg-white/95 text-[#121c2a] border border-[#f0c2cf]'
          }">
            <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-[#FF2E75] animate-ping' : 'bg-[#9E0038]'}"></span>
            <span class="truncate max-w-[120px]">${evt.venueName.split(' ')[0]} · ${evt.headliners[0]?.split(' ')[0] || ''}</span>
            <span class="px-1 py-0.2 rounded text-[10px] ${
              primaryP1 && primaryP1.fillPercentage > 85 
                ? 'bg-red-100 text-red-700' 
                : 'bg-emerald-100 text-emerald-700'
            }">${parkingSummary}</span>
          </div>

          <!-- Pin Beacon Head -->
          <div class="w-8 h-8 rounded-full p-0.5 shadow-lg flex items-center justify-center ${
            isSelected 
              ? 'bg-gradient-to-tr from-[#9E0038] to-[#D92662] ring-2 ring-white' 
              : 'bg-white ring-1 ring-[#9E0038]/30'
          }">
            <div class="w-full h-full rounded-full flex items-center justify-center ${
              isSelected ? 'bg-[#9E0038] text-white' : 'bg-white text-[#9E0038]'
            }">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>
          <!-- Pulse Indicator Ground Ring -->
          <div class="w-3 h-1 bg-black/25 rounded-full blur-[1px] mt-0.5"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-garba-pin',
        html: iconHtml,
        iconSize: [160, 60],
        iconAnchor: [80, 56],
      });

      const marker = L.marker(evt.coordinates, { icon: customIcon });
      marker.on('click', () => {
        onSelectEvent(evt);
      });
      marker.addTo(markersGroup);
    });

    // Render Nearby Free Parking Pins on Map
    if (activeFilterLayer === 'freeparking' || activeFilterLayer === 'all' || activeFilterLayer === 'parking') {
      events.forEach((evt) => {
        if (evt.nearbyFreeParking) {
          evt.nearbyFreeParking.forEach((freeP, idx) => {
            // Place slightly offset from main venue
            const offsetLat = evt.coordinates[0] + (idx === 0 ? 0.0025 : -0.0028);
            const offsetLng = evt.coordinates[1] + (idx === 0 ? 0.0032 : -0.0035);

            const freeParkIcon = L.divIcon({
              className: 'free-parking-pin',
              html: `
                <div class="cursor-pointer flex items-center gap-1 bg-emerald-700 text-white px-2 py-1 rounded-full shadow-lg border-2 border-white text-[10px] font-extrabold whitespace-nowrap hover:scale-105 transition-transform">
                  <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  <span>FREE P: ${freeP.distance}</span>
                </div>
              `,
              iconSize: [130, 26],
              iconAnchor: [65, 13],
            });

            const freeMarker = L.marker([offsetLat, offsetLng], { icon: freeParkIcon });
            freeMarker.bindPopup(`
              <div style="font-family: system-ui; max-width: 220px; padding: 4px;">
                <div style="font-weight: 800; color: #047857; font-size: 12px; margin-bottom: 2px;">
                  🅿️ FREE PARKING AVAILABLE
                </div>
                <div style="font-weight: 700; font-size: 11px; color: #1e293b;">
                  ${freeP.name}
                </div>
                <div style="font-size: 10px; color: #475569; margin: 4px 0;">
                  📍 ${freeP.distance} (${freeP.walkTime}) to ${evt.venueName.split(' ')[0]}
                </div>
                <div style="font-size: 10px; color: #047857; font-weight: 600;">
                  ✓ ${freeP.capacityText}
                </div>
                <div style="font-size: 9px; color: #64748b; margin-top: 3px;">
                  🛡️ ${freeP.safetyNote}
                </div>
              </div>
            `);
            freeMarker.addTo(markersGroup);
          });
        }
      });
    }

    // Render Auxiliary Layers if activated
    if (activeFilterLayer === 'medical') {
      const aidPosts: { name: string; coords: [number, number] }[] = [
        { name: 'SBR Police & 108 Aid Post', coords: [23.038, 72.502] },
        { name: 'Iskcon Crossroad First Aid Point', coords: [23.029, 72.507] },
        { name: 'Vaishnodevi Traffic & Medical Chowki', coords: [23.138, 72.548] },
      ];
      aidPosts.forEach((post) => {
        const aidIcon = L.divIcon({
          className: 'aid-pin',
          html: `
            <div class="bg-red-600 text-white p-1 rounded-full shadow-md flex items-center gap-1 text-[10px] font-bold px-2 whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>${post.name}</span>
            </div>
          `,
          iconSize: [140, 24],
          iconAnchor: [70, 12],
        });
        L.marker(post.coords, { icon: aidIcon }).addTo(markersGroup);
      });
    }

    if (activeFilterLayer === 'metro') {
      const metroStations: { name: string; coords: [number, number] }[] = [
        { name: 'Thaltej Metro (Line 1 Terminus)', coords: [23.051, 72.515] },
        { name: 'Doordarshan Kendra Metro', coords: [23.048, 72.529] },
        { name: 'Kankaria East Metro', coords: [22.998, 72.608] },
      ];
      metroStations.forEach((station) => {
        const metroIcon = L.divIcon({
          className: 'metro-pin',
          html: `
            <div class="bg-[#831843] text-white p-1 rounded-full shadow-md flex items-center gap-1 text-[10px] font-bold px-2 whitespace-nowrap">
              <span>🚇 ${station.name}</span>
            </div>
          `,
          iconSize: [150, 24],
          iconAnchor: [75, 12],
        });
        L.marker(station.coords, { icon: metroIcon }).addTo(markersGroup);
      });
    }

    // Pan smoothly to selected event
    map.panTo(selectedEvent.coordinates, { animate: true, duration: 0.8 });

    // Draw Simulated Route Polyline if user coordinates exist
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    const startCoords: [number, number] = userCoords || [23.033, 72.512]; // Bodakdev center if no GPS
    const endCoords = selectedEvent.coordinates;

    // Create intermediate curved points simulating road path along SG Highway / Ring Road
    const midLat = (startCoords[0] + endCoords[0]) / 2 + 0.003;
    const midLng = (startCoords[1] + endCoords[1]) / 2 - 0.002;

    const routePath: [number, number][] = [
      startCoords,
      [startCoords[0] + (midLat - startCoords[0]) * 0.5, startCoords[1]],
      [midLat, midLng],
      [endCoords[0] - (endCoords[0] - midLat) * 0.4, endCoords[1]],
      endCoords,
    ];

    const polyline = L.polyline(routePath, {
      color: '#9E0038',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85,
    }).addTo(map);
    routePolylineRef.current = polyline;

  }, [events, selectedEvent, activeFilterLayer, userCoords]);

  // Update user marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userCoords) {
      const userIcon = L.divIcon({
        className: 'user-location-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="w-6 h-6 rounded-full bg-blue-500/30 animate-ping absolute"></span>
            <span class="w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white shadow-md relative z-10"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const marker = L.marker(userCoords, { icon: userIcon }).addTo(map);
      userMarkerRef.current = marker;
    }
  }, [userCoords]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-inner border border-[#E7E5E4] bg-stone-100">
      {/* Map viewport */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Status Toast Top-Left */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-[#E7E5E4] text-[11px] font-bold text-[#1C1917]">
        <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-ping" />
        <span className="tracking-wide">Live Traffic: SG Hwy Slow at Iscon Crossroad</span>
      </div>

      {/* Floating Map Action Buttons Top-Right */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={onLocateMe}
          className={`w-9 h-9 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#1C1917] hover:bg-stone-50 active:scale-95 transition-all border border-[#E7E5E4] ${
            isLocating ? 'animate-spin text-[#9E0038]' : ''
          }`}
          title="My Live Location in Amdavad"
        >
          <Locate className="w-4 h-4 text-[#9E0038]" />
        </button>

        <button
          onClick={() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.setView(selectedEvent.coordinates, 14, { animate: true });
            }
          }}
          className="w-9 h-9 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#1C1917] hover:bg-stone-50 active:scale-95 transition-all border border-[#E7E5E4]"
          title="Center on Selected Venue"
        >
          <Compass className="w-4 h-4 text-[#57534E]" />
        </button>
      </div>

      {/* Bottom Floating Filter Rail inside Map */}
      <div className="absolute bottom-3 left-3 right-3 z-10 overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 w-max bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-[#E7E5E4]">
          <button
            onClick={() => onFilterLayerChange('all')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilterLayer === 'all'
                ? 'bg-[#9E0038] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>All 9 Venues</span>
          </button>

          {/* Dedicated Free Parking Layer Filter */}
          <button
            onClick={() => onFilterLayerChange('freeparking')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilterLayer === 'freeparking'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nearby Free Parking</span>
          </button>

          <button
            onClick={() => onFilterLayerChange('parking')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilterLayer === 'parking'
                ? 'bg-[#9E0038] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-stone-100'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>All Parking Lots</span>
          </button>

          <button
            onClick={() => onFilterLayerChange('medical')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilterLayer === 'medical'
                ? 'bg-red-700 text-white shadow-xs'
                : 'text-[#57534E] hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Police & Medical</span>
          </button>

          <button
            onClick={() => onFilterLayerChange('metro')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              activeFilterLayer === 'metro'
                ? 'bg-[#7D002C] text-white shadow-xs'
                : 'text-[#57534E] hover:bg-stone-100'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-[#7D002C]" />
            <span>Metro / BRTS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
