import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GarbaEvent, VenueType } from '../types';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Clock, 
  Music, 
  Shirt, 
  Car, 
  Upload, 
  ShieldCheck, 
  Check, 
  Flame, 
  Ticket
} from 'lucide-react';

interface HostGarbaModalProps {
  onClose: () => void;
  onEventCreated: (event: GarbaEvent) => void;
}

export const HostGarbaModal: React.FC<HostGarbaModalProps> = ({
  onClose,
  onEventCreated,
}) => {
  const [celebrationType, setCelebrationType] = useState<VenueType>('Traditional Sheri / Pol');
  const [eventName, setEventName] = useState('');
  const [selectedNights, setSelectedNights] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [dholStart, setDholStart] = useState('08:30 PM');
  const [mahaAarti, setMahaAarti] = useState('12:00 AM Midnight');
  const [area, setArea] = useState('Old City (Pols)');
  const [address, setAddress] = useState('');
  const [leadArtist, setLeadArtist] = useState('');
  const [soundConfig, setSoundConfig] = useState('Acoustic Dholak & Manjira (Pol Style)');
  const [dressCodeNorm, setDressCodeNorm] = useState('Strict Chaniya Choli / Kediyu');
  const [groundSurface, setGroundSurface] = useState<'Soft Red Sand (Reti)' | 'Spring Wood' | 'Lush Green Turf' | 'Paved Pol Stone'>('Soft Red Sand (Reti)');
  const [entryType, setEntryType] = useState<'free' | 'paid'>('free');
  const [malePassPrice, setMalePassPrice] = useState(499);
  const [couplePassPrice, setCouplePassPrice] = useState(899);
  const [organizerName, setOrganizerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNight = (nightNum: number) => {
    setSelectedNights((prev) =>
      prev.includes(nightNum) ? prev.filter((n) => n !== nightNum) : [...prev, nightNum]
    );
  };

  const handleSelectAllNights = () => {
    setSelectedNights([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      confetti({
        particleCount: 90,
        spread: 70,
        colors: ['#9E0038', '#D92662', '#FF2E75', '#F59E0B'],
      });

      const newId = `custom-garba-${Date.now()}`;
      const newEvent: GarbaEvent = {
        id: newId,
        title: eventName.trim(),
        sansthaName: organizerName || 'Community Yuvak Mandal',
        venueName: eventName.trim(),
        city: area.includes('Gandhinagar') ? 'Gandhinagar' : 'Ahmedabad',
        area: area as any,
        fullAddress: address.trim() || `${area}, Ahmedabad, Gujarat`,
        coordinates: [23.03 + Math.random() * 0.05, 72.52 + Math.random() * 0.05],
        googleMapsQuery: `${eventName} ${address}`,
        bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
        thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
        type: celebrationType,
        rating: 5.0,
        reviewsCount: 1,
        headliners: [leadArtist || 'Local Folk Dhol Troupe'],
        themeTitle: `${dressCodeNorm} Celebration`,
        themeDescription: 'Community organized traditional Navratri Raas with dedicated concentric circles and prasad distribution.',
        dressCodeTitle: dressCodeNorm,
        dressCodeWomen: 'Traditional Chaniya Choli with mirrorwork and oxidized accessories.',
        dressCodeMen: 'Traditional Kediyu or cotton Kurta Dhoti.',
        dressCodeStrictness: 'Strictly Enforced',
        groundSurface: groundSurface,
        capacityPercentage: 45,
        checkedInDancers: 400,
        decibels: 92,
        gateStatus: 'Gates Open & Free Flowing',
        startingPrice: entryType === 'free' ? 0 : malePassPrice,
        dholStartTime: dholStart,
        mahaAartiTime: mahaAarti,
        gatesOpenTime: '07:30 PM',
        participatingNights: selectedNights,
        passTiers: entryType === 'free' ? [
          {
            id: 'free-tier',
            name: 'Free Community Devotee Entry',
            description: 'Open access for all khelaiyas',
            price: 0,
            available: true,
            perks: ['Open ground ring access', 'Midnight prasad']
          }
        ] : [
          {
            id: 'single-tier',
            name: 'Single Entry Pass',
            description: 'Access for 1 dancer',
            price: malePassPrice,
            available: true,
            perks: ['Ring access', 'Complimentary snack']
          },
          {
            id: 'couple-tier',
            name: 'Couple Entry Pass',
            description: 'Access for 1 Couple',
            price: couplePassPrice,
            available: true,
            perks: ['Fast entry lane', 'VIP seating']
          }
        ],
        parkingLots: [
          {
            id: 'lot-gen',
            name: 'General Street Parking',
            code: 'P1',
            type: 'General',
            totalSpots: 150,
            availableSpots: 80,
            fillPercentage: 46,
            statusText: '80 spots free',
            fastEntrance: true,
            price: 0
          },
          {
            id: 'lot-2w',
            name: 'Dedicated 2-Wheeler Stand',
            code: '2W',
            type: 'Two-Wheeler',
            totalSpots: 300,
            availableSpots: 180,
            fillPercentage: 40,
            statusText: 'Ample motorcycle space',
            fastEntrance: true,
            price: 0
          }
        ],
        setlist: [
          { id: 1, title: 'Jay Adhya Shakti', artist: leadArtist || 'Mandli Troupe', round: 'Aarti', duration: '12:00', vibe: 'Devotional' }
        ]
      };

      onEventCreated(newEvent);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#f8f9ff] sm:rounded-3xl shadow-2xl flex flex-col min-h-screen sm:min-h-0 sm:max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-30 px-4 py-3 bg-[#f8f9ff]/90 backdrop-blur-md border-b border-[#dee9fc] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9E0038] animate-pulse" />
            <h2 className="text-sm font-bold text-[#121c2a]">Host A Garba · List Event</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 pb-20">
          {/* Greeting Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#9E0038] via-[#C41E3A] to-[#D92662] p-4 text-white shadow-md">
            <div className="relative z-10 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-200">
                Navratri 2025 Registration
              </span>
              <h3 className="text-base sm:text-lg font-bold">List Your Garba Event</h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Share your local Sheri Garba, Pol mandli, or grand party plot celebration with 50,000+ enthusiastic Amdavadis.
              </p>
            </div>
          </div>

          {/* Celebration Type 2x2 Grid */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#121c2a]">Celebration Type</label>
              <span className="text-[10px] font-bold text-[#9E0038] uppercase">Step 1 of 5</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'Traditional Sheri / Pol', desc: 'Free traditional communal', icon: 'nightlife' },
                { type: 'Society Mandli', desc: 'Residents & friends', icon: 'groups' },
                { type: 'Party Plot / Club', desc: 'Ticketed live orchestra', icon: 'stadium' },
                { type: 'College / Youth', desc: 'Campus energy & passes', icon: 'school' },
              ].map((item) => {
                const isSelected = celebrationType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setCelebrationType(item.type as VenueType)}
                    className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between h-22 ${
                      isSelected
                        ? 'border-[#9E0038] bg-pink-50/40 ring-2 ring-[#9E0038]/20'
                        : 'border-[#dee9fc] bg-white hover:bg-[#eff4ff]'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <Sparkles className={`w-4 h-4 ${isSelected ? 'text-[#9E0038]' : 'text-gray-400'}`} />
                      {isSelected && <Check className="w-4 h-4 text-[#9E0038]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#121c2a]">{item.type}</div>
                      <div className="text-[10px] text-gray-500">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Details */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#9E0038]">
              <Ticket className="w-4 h-4" />
              <span>Core Details</span>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Event / Mahotsav Name</label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Manek Chowk Heritage Pol Raas or Gulmohar Greens Mandli"
                className="w-full px-3 py-2.5 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              />
            </div>

            {/* Participating Nights Selector */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#554336]">Participating Nights</span>
                <button
                  type="button"
                  onClick={handleSelectAllNights}
                  className="text-[10px] text-[#8d4b00] font-bold hover:underline"
                >
                  Select All 9 Nights
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
                  const isChecked = selectedNights.includes(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleNight(n)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isChecked
                          ? 'bg-[#8d4b00] text-white shadow-xs'
                          : 'bg-[#eff4ff] text-[#554336] hover:bg-[#dee9fc]'
                      }`}
                    >
                      N{n}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timings */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="font-semibold text-[#554336] block mb-1">Dhol Start</label>
                <input
                  type="text"
                  value={dholStart}
                  onChange={(e) => setDholStart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs text-center"
                />
              </div>
              <div>
                <label className="font-semibold text-[#554336] block mb-1">Maha Aarti</label>
                <input
                  type="text"
                  value={mahaAarti}
                  onChange={(e) => setMahaAarti(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs text-center"
                />
              </div>
            </div>
          </div>

          {/* Venue & Amdavad Area */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#8d4b00]">
              <MapPin className="w-4 h-4" />
              <span>Venue & Amdavad Area</span>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Primary Neighborhood</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              >
                <option value="Old City (Pols)">Old City (Heritage Pols)</option>
                <option value="SG Highway">SG Highway (Bodakdev / Thaltej)</option>
                <option value="Sindhu Bhavan">Sindhu Bhavan Road</option>
                <option value="Satellite">Satellite / Prahladnagar</option>
                <option value="Sector 11 Gandhinagar">Gandhinagar (Sector 11 / Capital)</option>
                <option value="GIFT City">GIFT City (Gandhinagar)</option>
                <option value="Vaishnodevi Circle">Vaishnodevi Circle / Shantigram</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Ground / Hall Exact Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Near Astodia Darwaja, Khadia or Club O7 Road"
                className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Troupe & Sound Configuration */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#8d4b00]">
              <Music className="w-4 h-4" />
              <span>Musical Troupe & Sound</span>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Lead Artist / Troupe Name</label>
              <input
                type="text"
                value={leadArtist}
                onChange={(e) => setLeadArtist(e.target.value)}
                placeholder="e.g. Baroda Dholaks or Hemant Chauhan Troupe"
                className="w-full px-3 py-2.5 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Sound Configuration</label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'Acoustic Dholak & Manjira (Pol Style)',
                  'Line Array Professional Rig (100 dB)',
                  'Silent Garba (Wireless Headphones)',
                ].map((s) => (
                  <label key={s} className="flex items-center gap-2 p-2 rounded-xl bg-[#eff4ff] cursor-pointer">
                    <input
                      type="radio"
                      name="sound"
                      checked={soundConfig === s}
                      onChange={() => setSoundConfig(s)}
                      className="accent-[#8d4b00]"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Vibe, Attire & Ground Surface */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#af275a]">
              <Shirt className="w-4 h-4" />
              <span>Vibe, Attire & Ground Safety</span>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Dress Code Norms</label>
              <select
                value={dressCodeNorm}
                onChange={(e) => setDressCodeNorm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              >
                <option value="Strict Chaniya Choli / Kediyu">Strict Chaniya Choli / Kediyu (No Casuals)</option>
                <option value="Kutchhi Rabari Attire">Kutchhi Rabari Traditional</option>
                <option value="Casual Kurta Friendly">Casual Kurta Friendly</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#554336] block mb-1">Ground Surface (Knee & Barefoot Safety)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Soft Red Sand (Reti)',
                  'Lush Green Turf',
                  'Spring Wood',
                  'Paved Pol Stone',
                ].map((surface) => (
                  <button
                    key={surface}
                    type="button"
                    onClick={() => setGroundSurface(surface as any)}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-colors ${
                      groundSurface === surface
                        ? 'border-[#9E0038] bg-pink-50/40 font-bold text-[#9E0038]'
                        : 'border-[#dee9fc] bg-[#f8f9ff] text-[#554336]'
                    }`}
                  >
                    {surface}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Entry & Passes Controls */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#9E0038]">
              <Ticket className="w-4 h-4" />
              <span>Entry & Access Controls</span>
            </div>

            <div className="flex p-1 bg-[#eff4ff] rounded-xl">
              <button
                type="button"
                onClick={() => setEntryType('free')}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
                  entryType === 'free' ? 'bg-[#9E0038] text-white shadow-xs' : 'text-[#554336]'
                }`}
              >
                Free / Open Devotees
              </button>
              <button
                type="button"
                onClick={() => setEntryType('paid')}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
                  entryType === 'paid' ? 'bg-[#9E0038] text-white shadow-xs' : 'text-[#554336]'
                }`}
              >
                Pass / Ticketed Only
              </button>
            </div>

            {entryType === 'paid' && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="font-semibold text-[#554336] block mb-1">Single Pass (₹)</label>
                  <input
                    type="number"
                    value={malePassPrice}
                    onChange={(e) => setMalePassPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#554336] block mb-1">Couple Pass (₹)</label>
                  <input
                    type="number"
                    value={couplePassPrice}
                    onChange={(e) => setCouplePassPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Organizer Verification */}
          <div className="p-4 rounded-2xl bg-white border border-[#dee9fc] shadow-xs flex flex-col gap-3 text-xs">
            <span className="font-bold text-[#121c2a]">Organizer & WhatsApp Verification</span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                placeholder="Organizer / Mandal Lead"
                className="px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              />
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="WhatsApp (+91 98250...)"
                className="px-3 py-2 rounded-xl border border-[#dee9fc] bg-[#f8f9ff] text-xs focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-gray-500">
              Listing undergoes rapid community moderation (under 15 mins).
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Publishing to Amdavad Raas Hub...</span>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Submit Event for Community Raas</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
