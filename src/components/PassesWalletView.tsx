import React, { useState, useEffect } from 'react';
import { BookingPass, ParkingBooking } from '../types';
import { 
  Ticket, 
  QrCode, 
  ShieldCheck, 
  Navigation, 
  Share2, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Car, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  PhoneCall,
  Check,
  Plus,
  MapPin
} from 'lucide-react';

interface PassesWalletViewProps {
  activePasses: BookingPass[];
  parkingBookings: ParkingBooking[];
  onNavigateToExplore: () => void;
  onNavigateToMap?: () => void;
}

export const PassesWalletView: React.FC<PassesWalletViewProps> = ({
  activePasses,
  parkingBookings,
  onNavigateToExplore,
  onNavigateToMap,
}) => {
  const [activeTab, setActiveTab] = useState<'tonight' | 'upcoming' | 'parking'>('tonight');
  const [qrCountdown, setQrCountdown] = useState(42);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [externalBookingId, setExternalBookingId] = useState('');
  const [externalSyncNotice, setExternalSyncNotice] = useState<string | null>(null);

  // Dynamic QR countdown simulation to prevent turnstile screenshot fraud
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Primary active pass: either user's latest booked pass or default Mandli Garba pass
  const primaryPass = activePasses[0] || {
    bookingId: 'AMD-94821',
    eventId: 'ymca-mandli',
    eventName: 'Mandli Garba 2025',
    venueName: 'YMCA Club Grounds, SG Highway',
    fullAddress: 'SG Highway, Bodakdev, Ahmedabad',
    nightNumber: 5,
    nightName: 'Night 5 of 9 • Maha Raas',
    dateStr: '07 Oct 2025',
    tierId: 'couple',
    tierName: 'Couple Pass',
    quantity: 2,
    totalAmount: 1199,
    upiRef: 'AXIS•48291',
    passHolderName: 'Kavita Patel',
    gateAssigned: 'Gate 2 Fast-Track (North Arena)',
    dressCodeSummary: 'Traditional Mandatory (Kedia / Chaniya Choli)',
    rfidBooth: 'Booth B (Gate 2)',
    bookedAt: '06:45 PM',
    qrToken: 'TOKEN-ACTIVE-94821',
    hasParking: true,
    parkingSlotCode: 'P1-VIP-BAY-12',
  };

  const handleShareEntry = () => {
    if (navigator.share) {
      navigator.share({
        title: `Garba Pass: ${primaryPass.eventName}`,
        text: `Here is our entry ticket for ${primaryPass.eventName} at ${primaryPass.venueName}! Gate: ${primaryPass.gateAssigned}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(
        `Entry Pass: ${primaryPass.eventName} at ${primaryPass.venueName}. Gate: ${primaryPass.gateAssigned}. Booking ID: ${primaryPass.bookingId}`
      );
      setShareNotice('Pass link copied for your Garba partner!');
      setTimeout(() => setShareNotice(null), 3000);
    }
  };

  const handleDownloadWallet = () => {
    // Generate digital pass file download
    const passData = {
      event: primaryPass.eventName,
      venue: primaryPass.venueName,
      bookingId: primaryPass.bookingId,
      tier: primaryPass.tierName,
      gate: primaryPass.gateAssigned,
      passholder: primaryPass.passHolderName,
      issuedAt: new Date().toISOString(),
      securityHash: `AMD-RAAS-HASH-${Math.random().toString(36).substring(7)}`,
    };

    const blob = new Blob([JSON.stringify(passData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${primaryPass.bookingId}-AmdavadRaas-Pass.json`;
    a.click();
    URL.revokeObjectURL(url);

    setShareNotice('Downloaded Pass to Device Wallet!');
    setTimeout(() => setShareNotice(null), 3000);
  };

  const handleSyncExternal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalBookingId.trim()) return;

    setExternalSyncNotice('Verifying with BookMyShow / Paytm Partner Gateway...');
    setTimeout(() => {
      setExternalSyncNotice(`Pass #${externalBookingId.toUpperCase()} verified and synced to your Amdavad Raas Wallet!`);
      setExternalBookingId('');
      setTimeout(() => setExternalSyncNotice(null), 4000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 gap-6 text-[#1C1917]">
      {/* Toast Feedback */}
      {shareNotice && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1C1917] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-[#9E0038] animate-in fade-in">
          {shareNotice}
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#9E0038] uppercase tracking-wider block">
              Khelaiya Passbook
            </span>
            <h1 className="text-2xl font-extrabold text-[#1C1917] tracking-tight">
              My Passes & Wallet
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F4] text-[#9E0038] text-xs font-bold border border-[#FED7E2] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-ping" />
            <span>{activePasses.length > 0 ? activePasses.length : 1} Pass Active</span>
          </div>
        </div>

      {/* Tab Filters */}
      <div className="flex p-1 bg-[#FCFAF7] border border-[#E7E5E4] rounded-2xl gap-1 mt-2">
        <button
          onClick={() => setActiveTab('tonight')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all text-center ${
            activeTab === 'tonight'
              ? 'bg-[#9E0038] text-white shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          Active (Tonight)
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all text-center ${
            activeTab === 'upcoming'
              ? 'bg-[#9E0038] text-white shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          Upcoming Nights
        </button>
        <button
          onClick={() => setActiveTab('parking')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all text-center ${
            activeTab === 'parking'
              ? 'bg-[#9E0038] text-white shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          Parking & Free Spots ({parkingBookings.length})
        </button>
      </div>
      </div>

      {activeTab === 'tonight' && (
        <>
          {/* Hero Digital Pass Ticket */}
          <div className="relative w-full rounded-3xl bg-white shadow-lg border border-[#E7E5E4] overflow-hidden">
            {/* Top Decorative Banner */}
            <div className="bg-gradient-to-r from-[#9E0038] via-[#85002C] to-[#58001F] px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FEF3C7]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]">
                  {primaryPass.nightName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 backdrop-blur-md text-[10px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Gate Entry Open</span>
              </div>
            </div>

            {/* Event Name & Venue */}
            <div className="p-4 sm:p-5 flex items-start justify-between">
              <div className="flex-1 pr-2">
                <span className="text-[10px] font-bold text-[#9E0038] uppercase tracking-wider">
                  Navratri Mahotsav 2025
                </span>
                <h2 className="text-xl font-extrabold text-[#1C1917] mt-0.5">
                  {primaryPass.eventName}
                </h2>
                <p className="text-xs text-[#57534E] flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
                  <span>{primaryPass.venueName}</span>
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F4] text-[#9E0038] flex items-center justify-center shrink-0 border border-[#FED7E2]">
                <Ticket className="w-6 h-6" />
              </div>
            </div>

            {/* Ticket Tear Cutout Edge (Visual Notch Effect) */}
            <div className="relative flex items-center w-full my-0.5">
              <div className="w-4 h-6 rounded-r-full bg-[#FCFAF7] shadow-inner -ml-1 border-r border-t border-b border-[#E7E5E4]" />
              <div className="flex-1 border-t-2 border-dashed border-[#E7E5E4] mx-2" />
              <div className="w-4 h-6 rounded-l-full bg-[#FCFAF7] shadow-inner -mr-1 border-l border-t border-b border-[#E7E5E4]" />
            </div>

            {/* QR Code & Security Stamp */}
            <div className="p-4 sm:p-5 flex flex-col items-center gap-3 bg-[#FCFAF7]">
              <div className="w-full flex items-center justify-between px-3 py-1.5 bg-[#FFF0F4] border border-[#FED7E2] rounded-xl text-[10px] font-bold">
                <span className="text-[#9E0038] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Amdavad Raas Verified Turnstile Pass
                </span>
                <span className="text-[#78716C]">Non-Transferable</span>
              </div>

              {/* High-Contrast Interactive QR Code representation */}
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#E7E5E4] flex flex-col items-center">
                <svg className="w-48 h-48 rounded-lg" viewBox="0 0 100 100" fill="none">
                  {/* Position Corners */}
                  <rect x="6" y="6" width="26" height="26" rx="4" fill="#1C1917" />
                  <rect x="10" y="10" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="14" y="14" width="10" height="10" rx="1" fill="#9E0038" />
                  
                  <rect x="68" y="6" width="26" height="26" rx="4" fill="#1C1917" />
                  <rect x="72" y="10" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="76" y="14" width="10" height="10" rx="1" fill="#9E0038" />

                  <rect x="6" y="68" width="26" height="26" rx="4" fill="#1C1917" />
                  <rect x="10" y="72" width="18" height="18" rx="2" fill="#FFFFFF" />
                  <rect x="14" y="76" width="10" height="10" rx="1" fill="#9E0038" />

                  {/* QR Matrix Payload Pattern */}
                  <rect x="36" y="8" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="46" y="8" width="6" height="6" rx="1" fill="#D92662" />
                  <rect x="56" y="8" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="36" y="18" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="46" y="24" width="6" height="6" rx="1" fill="#9E0038" />
                  <rect x="56" y="18" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="8" y="38" width="6" height="6" rx="1" fill="#D92662" />
                  <rect x="18" y="44" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="26" y="38" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="36" y="36" width="8" height="8" rx="2" fill="#9E0038" />
                  <rect x="48" y="36" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="58" y="36" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="36" y="48" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="46" y="46" width="8" height="8" rx="2" fill="#D92662" />
                  <rect x="58" y="48" width="6" height="6" rx="1" fill="#9E0038" />
                  <rect x="8" y="56" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="18" y="56" width="6" height="6" rx="1" fill="#9E0038" />
                  <rect x="28" y="56" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="68" y="38" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="78" y="44" width="6" height="6" rx="1" fill="#D92662" />
                  <rect x="88" y="38" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="36" y="68" width="6" height="6" rx="1" fill="#9E0038" />
                  <rect x="46" y="68" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="56" y="74" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="68" y="56" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="78" y="62" width="6" height="6" rx="1" fill="#9E0038" />
                  <rect x="88" y="56" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="68" y="78" width="6" height="6" rx="1" fill="#D92662" />
                  <rect x="78" y="78" width="6" height="6" rx="1" fill="#1C1917" />
                  <rect x="88" y="86" width="6" height="6" rx="1" fill="#9E0038" />
                </svg>

                {/* Auto Refresh Token Pill */}
                <div className="flex items-center gap-1.5 mt-2 bg-[#FFF0F4] px-3 py-1 rounded-full text-[11px] font-semibold text-[#1C1917] border border-[#FED7E2]">
                  <RefreshCw className="w-3.5 h-3.5 text-[#9E0038] animate-spin" />
                  <span>
                    Dynamic QR Refreshes in <strong className="text-[#9E0038] font-bold tabular-nums">{qrCountdown}s</strong>
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-[#57534E] text-center max-w-sm">
                Present at scanner kiosk · Max phone screen brightness applied automatically
              </span>
            </div>

            {/* Pass Metadata 2x2 Grid */}
            <div className="p-4 sm:p-5 grid grid-cols-2 gap-2.5 bg-white text-xs border-t border-[#E7E5E4]">
              <div className="p-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] uppercase font-bold">Pass Tier</span>
                <p className="font-bold text-[#1C1917] mt-0.5">{primaryPass.tierName}</p>
                <span className="text-[10px] text-[#9E0038] font-medium">1 Female + 1 Male Entry</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] uppercase font-bold">Designated Entry</span>
                <p className="font-bold text-[#9E0038] mt-0.5">{primaryPass.gateAssigned}</p>
                <span className="text-[10px] text-[#57534E]">North Arena Turnstile</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] uppercase font-bold">Payment Info</span>
                <p className="font-bold text-[#1C1917] mt-0.5 tabular-nums">₹{primaryPass.totalAmount}.00</p>
                <span className="text-[10px] text-[#57534E]">UPI Ref: {primaryPass.upiRef}</span>
              </div>

              <div className="p-2.5 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4]">
                <span className="text-[10px] text-[#78716C] uppercase font-bold">Dress Code</span>
                <p className="font-bold text-[#1C1917] mt-0.5">Traditional Mandatory</p>
                <span className="text-[10px] text-[#57534E]">Kediyu / Chaniya Choli</span>
              </div>
            </div>

            {/* Physical RFID Wristband & Valet Tag Alert */}
            <div className="mx-4 sm:mx-5 mb-4 p-3 rounded-2xl bg-[#FFF0F4] border border-[#FED7E2] flex items-start gap-2.5 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#FED7E2] text-[#9E0038] flex items-center justify-center shrink-0 mt-0.5">
                <Ticket className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#9E0038]">
                  RFID Wristband & Valet Tag Pickup
                </span>
                <p className="text-[11px] text-[#57534E] mt-0.5 leading-relaxed">
                  Collect your glowing RFID wristband at <strong>{primaryPass.rfidBooth}</strong> before 9:00 PM. Includes reserved <strong>Valet Tag ({primaryPass.parkingSlotCode || 'P1 VIP Tag'})</strong>.
                </p>
              </div>
            </div>

            {/* Quick Action Button Strip */}
            <div className="px-4 sm:px-5 pb-5 grid grid-cols-4 gap-1.5 sm:gap-2">
              <button
                onClick={handleDownloadWallet}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50/50 hover:bg-pink-100 text-[#121c2a] transition-colors"
              >
                <Download className="w-4 h-4 text-[#9E0038]" />
                <span className="text-[10px] font-bold mt-1 text-center">Wallet Pass</span>
              </button>

              <button
                onClick={handleShareEntry}
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50/50 hover:bg-pink-100 text-[#121c2a] transition-colors"
              >
                <Share2 className="w-4 h-4 text-[#D92662]" />
                <span className="text-[10px] font-bold mt-1 text-center">Share</span>
              </button>

              {onNavigateToMap && (
                <button
                  onClick={onNavigateToMap}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#9E0038] border border-pink-200 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#9E0038]" />
                  <span className="text-[10px] font-bold mt-1 text-center">Venue Map</span>
                </button>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(primaryPass.venueName)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-pink-50/50 hover:bg-pink-100 text-[#121c2a] transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#9E0038]" />
                <span className="text-[10px] font-bold mt-1 text-center">Directions</span>
              </a>
            </div>
          </div>

          {/* Live YMCA Ground Pulse Bar */}
          <div className="p-3.5 rounded-2xl bg-white shadow-xs border border-[#dee9fc] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#9E0038] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Live YMCA Turnstile Pulse</span>
                <p className="font-bold text-[#121c2a]">Lively Garba Ring (76% Full)</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 block">Entry Wait</span>
              <span className="font-extrabold text-sm text-[#9E0038]">~3 Mins</span>
            </div>
          </div>
        </>
      )}

      {activeTab === 'upcoming' && (
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#9E0038] uppercase">
                  Night 7 • Oct 09
                </span>
                <h3 className="text-sm font-bold text-[#121c2a]">
                  Suvarn Navratri Mahotsav
                </h3>
                <p className="text-xs text-[#554336]">Karnavati Club, SG Highway</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-[#700028] text-[10px] font-bold">
                Confirmed
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#eff4ff]">
              <span>1x Early Bird Solo Dancer</span>
              <span className="text-gray-500">QR live at 06:00 PM</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#9E0038] uppercase">
                  Night 8 • Oct 10
                </span>
                <h3 className="text-sm font-bold text-[#121c2a]">
                  United Way of Amdavad
                </h3>
                <p className="text-xs text-[#554336]">Adani Shantigram Grand Lawns</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-[#700028] text-[10px] font-bold">
                VIP Lounge
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#eff4ff]">
              <span>2x Full-Season Access Wristband</span>
              <span className="text-[#9E0038] font-semibold">Active Tag Ready</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'parking' && (
        <div className="flex flex-col gap-3">
          {/* Nearby Free Parking Quick Guidance Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">P</span>
              <span>City-Wide Free Parking Available at All Venues</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Every major venue (YMCA, Karnavati, Shantigram, Gandhinagar Sector 11, SBR, GIFT City, Kankaria) features verified free municipal bays, police-guarded service lanes, or 2-wheeler lots within 200m–400m walking distance. Check the venue card or map anytime!
            </p>
          </div>

          {parkingBookings.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-[#dee9fc] text-center flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-pink-50 text-[#9E0038] flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121c2a]">No Paid Parking Pre-booked</h3>
              <p className="text-xs text-[#554336] max-w-sm">
                You can either reserve an on-venue P1 VIP / Valet spot in advance, or use the verified free municipal parking spots identified nearby each venue.
              </p>
              <button
                onClick={onNavigateToExplore}
                className="px-4 py-2 bg-[#9E0038] hover:bg-[#7D002C] text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
              >
                Browse Venues & Parking
              </button>
            </div>
          ) : (
            parkingBookings.map((pb) => (
              <div
                key={pb.bookingId}
                className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#9E0038] uppercase">
                      Parking Pass #{pb.bookingId}
                    </span>
                    <h4 className="text-sm font-bold text-[#121c2a]">{pb.venueName}</h4>
                    <p className="text-xs text-[#554336]">
                      {pb.lotName} · {pb.entryGate}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-50 text-[#9E0038] text-xs font-bold">
                    {pb.lotCode} Valid
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl bg-[#eff4ff]">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase">Vehicle Plate</span>
                    <p className="font-mono font-bold text-[#121c2a]">{pb.vehicleNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase">Slot Window</span>
                    <p className="font-bold text-[#121c2a]">{pb.timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    RFID Boom Barrier Auto-Open Active
                  </span>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pb.venueName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9E0038] font-bold hover:underline"
                  >
                    Drive to {pb.lotCode}
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Sync External Passes Box */}
      <section className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-50/50 to-rose-50/30 border border-pink-100 flex flex-col gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white text-[#9E0038] flex items-center justify-center shadow-xs">
            <Ticket className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#121c2a]">Sync External Passes</h3>
            <p className="text-[11px] text-[#554336]">
              Booked via BookMyShow, Paytm Insider or Club offline counters?
            </p>
          </div>
        </div>

        <form onSubmit={handleSyncExternal} className="flex gap-2 mt-1">
          <input
            type="text"
            value={externalBookingId}
            onChange={(e) => setExternalBookingId(e.target.value)}
            placeholder="Enter BMS / Paytm Booking ID or Mobile..."
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#dee9fc] text-xs text-[#121c2a] focus:outline-none focus:ring-1 focus:ring-[#9E0038]"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-[#9E0038] text-white rounded-xl text-xs font-bold hover:bg-[#7D002C] transition-colors shrink-0"
          >
            Sync Pass
          </button>
        </form>

        {externalSyncNotice && (
          <p className="text-xs text-emerald-800 font-medium">{externalSyncNotice}</p>
        )}

        <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-1">
          <span>Supported platforms:</span>
          <span className="font-semibold text-[#D92662]">BookMyShow · Paytm Insider · Offline Club Desks</span>
        </div>
      </section>

      {/* Amdavad Rain Protection Guarantee Banner */}
      <section className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-2.5 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#ffd9e0] text-[#af275a] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-[#121c2a]">
              Amdavad Rain Protection Guarantee
            </h4>
            <p className="text-[11px] text-[#554336] leading-relaxed mt-0.5">
              If unexpected rain interrupts tonight's raas before 10:00 PM, 100% automated UPI refund or free rollover to Night 9 grand finale is guaranteed.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff]">
          <a
            href="tel:18002332222"
            className="flex items-center gap-1 text-[#554336] hover:text-[#9E0038]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Gate Desk</span>
          </a>
          <button
            onClick={() => setShareNotice('Support team is active 24/7 on WhatsApp: +91 98250 99999')}
            className="flex items-center gap-1 font-bold text-[#9E0038] hover:underline"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Pass Support Hotline</span>
          </button>
        </div>
      </section>
    </div>
  );
};
