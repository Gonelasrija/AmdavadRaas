import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { ExploreView } from './components/ExploreView';
import { VenuesMapView } from './components/VenuesMapView';
import { PassesWalletView } from './components/PassesWalletView';
import { CommunityBuzzView } from './components/CommunityBuzzView';
import { EventDetailModal } from './components/EventDetailModal';
import { PassBookingModal } from './components/PassBookingModal';
import { ParkingPreBookModal } from './components/ParkingPreBookModal';
import { HostGarbaModal } from './components/HostGarbaModal';
import { NotificationsModal } from './components/NotificationsModal';
import { GARBA_EVENTS, INITIAL_REVIEWS, INITIAL_POLL_OPTIONS } from './data/garbaData';
import { GarbaEvent, PassTier, BookingPass, ParkingBooking, CommunityReview, SongPollOption } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNight, setSelectedNight] = useState<number>(4); // Day 4 Tonight
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const [events, setEvents] = useState<GarbaEvent[]>(GARBA_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<GarbaEvent>(GARBA_EVENTS[0]);

  // Passes & Wallet State with localStorage hydration
  const [activePasses, setActivePasses] = useState<BookingPass[]>(() => {
    try {
      const saved = localStorage.getItem('amdavad_raas_passes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Parking Bookings State
  const [parkingBookings, setParkingBookings] = useState<ParkingBooking[]>(() => {
    try {
      const saved = localStorage.getItem('amdavad_raas_parking');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Community Reviews & Poll
  const [reviews, setReviews] = useState<CommunityReview[]>(INITIAL_REVIEWS);
  const [pollOptions, setPollOptions] = useState<SongPollOption[]>(INITIAL_POLL_OPTIONS);
  const [userVotedSong, setUserVotedSong] = useState<string | null>(null);

  // Modals
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false);
  const [isPassBookingOpen, setIsPassBookingOpen] = useState(false);
  const [bookingTier, setBookingTier] = useState<PassTier>(GARBA_EVENTS[0].passTiers[0]);
  const [isParkingPreBookOpen, setIsParkingPreBookOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('amdavad_raas_passes', JSON.stringify(activePasses));
    } catch (e) {
      console.warn('Storage quota exceeded');
    }
  }, [activePasses]);

  useEffect(() => {
    try {
      localStorage.setItem('amdavad_raas_parking', JSON.stringify(parkingBookings));
    } catch (e) {
      console.warn('Storage quota exceeded');
    }
  }, [parkingBookings]);

  // Filtered Events by Search & Area
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Area filter
      if (selectedArea !== 'All') {
        const matchesArea = 
          evt.area.toLowerCase().includes(selectedArea.toLowerCase()) ||
          evt.city.toLowerCase().includes(selectedArea.toLowerCase()) ||
          (selectedArea.includes('Pols') && evt.area.includes('Pol')) ||
          (selectedArea.includes('Gandhinagar') && evt.city === 'Gandhinagar');
        if (!matchesArea) return false;
      }

      // Search query filter (matches singer, venue, theme, address, or pass tiers)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          evt.title.toLowerCase().includes(q) ||
          evt.venueName.toLowerCase().includes(q) ||
          evt.headliners.some((h) => h.toLowerCase().includes(q)) ||
          evt.area.toLowerCase().includes(q) ||
          evt.themeTitle.toLowerCase().includes(q) ||
          evt.dressCodeTitle.toLowerCase().includes(q) ||
          evt.passTiers.some((t) => t.name.toLowerCase().includes(q) || t.badge?.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [events, selectedArea, searchQuery]);

  const handleSelectEvent = (event: GarbaEvent) => {
    setSelectedEvent(event);
    setActiveTab('venues');
  };

  const handleOpenBooking = (event: GarbaEvent, tier?: PassTier) => {
    setSelectedEvent(event);
    setBookingTier(tier || event.passTiers[0]);
    setIsPassBookingOpen(true);
  };

  const handleOpenParkingPreBook = (event: GarbaEvent) => {
    setSelectedEvent(event);
    setIsParkingPreBookOpen(true);
  };

  const handleViewDetail = (event: GarbaEvent) => {
    setSelectedEvent(event);
    setIsEventDetailOpen(true);
  };

  const handleBookingSuccess = (newPass: BookingPass) => {
    setActivePasses((prev) => [newPass, ...prev]);
    setIsPassBookingOpen(false);
    setIsEventDetailOpen(false);
    setActiveTab('wallet');
  };

  const handleParkingSuccess = (newBooking: ParkingBooking) => {
    setParkingBookings((prev) => [newBooking, ...prev]);
    setIsParkingPreBookOpen(false);
    setActiveTab('wallet');
  };

  const handleAddReview = (newReview: CommunityReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleVotePoll = (songId: string) => {
    if (userVotedSong === songId) return;
    setUserVotedSong(songId);
    setPollOptions((prev) =>
      prev.map((opt) => {
        if (opt.id === songId) {
          return { ...opt, votesPercentage: opt.votesPercentage + 1 };
        }
        return opt;
      })
    );
  };

  const handleEventCreated = (newEvent: GarbaEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEvent(newEvent);
    setActiveTab('explore');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#9E0038]/20 selection:text-[#9E0038]">
      {/* Universal Responsive Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        hasActivePasses={activePasses.length > 0}
        activePassesCount={activePasses.length}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full pb-20">
        {activeTab === 'explore' && (
          <ExploreView
            events={filteredEvents}
            selectedNight={selectedNight}
            onSelectNight={setSelectedNight}
            onSelectEvent={handleSelectEvent}
            onBookPass={handleOpenBooking}
            onPreBookParking={handleOpenParkingPreBook}
            onViewEventDetail={handleViewDetail}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        )}

        {activeTab === 'venues' && (
          <VenuesMapView
            events={filteredEvents.length > 0 ? filteredEvents : events}
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
            onBookPass={handleOpenBooking}
            onPreBookParking={handleOpenParkingPreBook}
            onViewEventDetail={handleViewDetail}
          />
        )}

        {activeTab === 'lineup' && (
          // Opens full detail / lineup for selected or spotlight event
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#121c2a]">
                Headliner Lineup & Troupe Bios
              </h2>
              <button
                onClick={() => setActiveTab('explore')}
                className="text-xs font-bold text-[#9E0038]"
              >
                Back to Explore
              </button>
            </div>
            <EventDetailModal
              event={selectedEvent}
              onClose={() => setActiveTab('explore')}
              onBookPass={handleOpenBooking}
              onPreBookParking={handleOpenParkingPreBook}
              onOpenMap={handleSelectEvent}
            />
          </div>
        )}

        {activeTab === 'wallet' && (
          <PassesWalletView
            activePasses={activePasses}
            parkingBookings={parkingBookings}
            onNavigateToExplore={() => setActiveTab('explore')}
            onNavigateToMap={() => setActiveTab('venues')}
          />
        )}

        {activeTab === 'community' && (
          <CommunityBuzzView
            reviews={reviews}
            pollOptions={pollOptions}
            onAddReview={handleAddReview}
            onVotePoll={handleVotePoll}
            userVotedSong={userVotedSong}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        hasActivePass={activePasses.length > 0}
      />

      {/* Interactive Modals */}
      {isEventDetailOpen && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setIsEventDetailOpen(false)}
          onBookPass={handleOpenBooking}
          onPreBookParking={handleOpenParkingPreBook}
          onOpenMap={handleSelectEvent}
        />
      )}

      {isPassBookingOpen && (
        <PassBookingModal
          event={selectedEvent}
          tier={bookingTier}
          nightNumber={selectedNight}
          onClose={() => setIsPassBookingOpen(false)}
          onBookingSuccess={handleBookingSuccess}
          onOpenMap={handleSelectEvent}
        />
      )}

      {isParkingPreBookOpen && (
        <ParkingPreBookModal
          event={selectedEvent}
          onClose={() => setIsParkingPreBookOpen(false)}
          onBookingSuccess={handleParkingSuccess}
        />
      )}

      {isHostModalOpen && (
        <HostGarbaModal
          onClose={() => setIsHostModalOpen(false)}
          onEventCreated={handleEventCreated}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          onClose={() => setIsNotificationsOpen(false)}
          onNavigateToVenues={() => setActiveTab('venues')}
        />
      )}
    </div>
  );
}
