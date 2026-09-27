import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GarbaEvent, PassTier, BookingPass } from '../types';
import { 
  X, 
  Ticket, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Car, 
  CreditCard, 
  Smartphone, 
  Building2, 
  QrCode,
  ArrowRight,
  Lock,
  Tag,
  MapPin,
  Navigation
} from 'lucide-react';

interface PassBookingModalProps {
  event: GarbaEvent;
  tier: PassTier;
  nightNumber: number;
  onClose: () => void;
  onBookingSuccess: (pass: BookingPass) => void;
  onOpenMap?: (event: GarbaEvent) => void;
}

export const PassBookingModal: React.FC<PassBookingModalProps> = ({
  event,
  tier,
  nightNumber,
  onClose,
  onBookingSuccess,
  onOpenMap,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [includeParking, setIncludeParking] = useState(false);
  const [parkingTier, setParkingTier] = useState<'P1' | 'P2'>('P1');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Financial calculations
  const basePrice = tier.price * quantity;
  const parkingPrice = includeParking ? (parkingTier === 'P1' ? 250 : 100) : 0;
  const discount = promoApplied ? 100 : 0;
  const gstAmount = Math.round((basePrice + parkingPrice - discount) * 0.18);
  const platformFee = tier.price === 0 ? 0 : 20;
  const finalTotal = Math.max(0, basePrice + parkingPrice - discount + gstAmount + platformFee);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GARBA2025' || promoCode.trim().toUpperCase() === 'AMDOVERAAS') {
      setPromoApplied(true);
      setErrorMsg(null);
    } else {
      setErrorMsg('Invalid code. Try "GARBA2025" for ₹100 festive discount!');
    }
  };

  const handlePayAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name as on government ID.');
      return;
    }
    if (!mobile.trim() || mobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    // Simulate payment transaction verification
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger festive celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9E0038', '#D92662', '#FF2E75', '#F59E0B'],
      });

      const randomBookingId = `AMD-${Math.floor(100000 + Math.random() * 900000)}`;
      const randomUpiRef = `UPI•AXIS•${Math.floor(10000 + Math.random() * 90000)}`;

      const newPass: BookingPass = {
        bookingId: randomBookingId,
        eventId: event.id,
        eventName: event.title,
        venueName: event.venueName,
        fullAddress: event.fullAddress,
        nightNumber: nightNumber,
        nightName: `Night ${nightNumber} • Maha Raas`,
        dateStr: `Oct 2025`,
        tierId: tier.id,
        tierName: tier.name,
        quantity,
        totalAmount: finalTotal,
        upiRef: randomUpiRef,
        passHolderName: name.trim(),
        gateAssigned: 'Gate 2 Fast-Track (North Arena)',
        dressCodeSummary: `${event.dressCodeTitle} (Traditional Mandatory)`,
        rfidBooth: 'Booth B (Gate 2)',
        bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        qrToken: `TOKEN-${randomBookingId}-${Date.now()}`,
        hasParking: includeParking,
        parkingSlotCode: includeParking ? `${parkingTier}-BAY-${Math.floor(10 + Math.random() * 80)}` : undefined,
      };

      onBookingSuccess(newPass);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#dee9fc]">
        {/* Header */}
        <div className="p-4 bg-[#FFF0F4] border-b border-[#FED7E2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#9E0038] text-white flex items-center justify-center shadow-xs">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#1C1917]">
                Checkout: {event.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-[#57534E]">
                  Night {nightNumber} · {event.venueName}
                </span>
                {onOpenMap && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenMap(event);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#9E0038] hover:text-[#7D002C] bg-white border border-[#FED7E2] px-2 py-0.5 rounded-full transition-colors shadow-2xs"
                    title="View venue on interactive ground map"
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    <span>View Map</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handlePayAndConfirm} className="overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 font-medium">
              <X className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Pass Tier & Quantity Selector */}
          <div className="p-4 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-extrabold text-[#1C1917]">{tier.name}</span>
              <span className="text-[11px] text-[#57534E]">
                {tier.price === 0 ? 'Free Entry' : `₹${tier.price} per pass`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white border border-[#E7E5E4] text-sm font-bold flex items-center justify-center text-[#1C1917] hover:bg-[#FCFAF7] transition-colors"
              >
                -
              </button>
              <span className="text-sm font-extrabold text-[#1C1917] min-w-[20px] text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-xl bg-white border border-[#E7E5E4] text-sm font-bold flex items-center justify-center text-[#1C1917] hover:bg-[#FCFAF7] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Optional Pre-Book Parking Add-on & Nearby Free Parking Alternative */}
          <div className="p-4 rounded-2xl bg-[#FFF0F4]/50 border border-[#FED7E2] flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#9E0038]" />
                <span className="text-xs font-bold text-[#1C1917]">
                  Add Reserved On-Venue Parking Slot?
                </span>
              </div>
              <input
                type="checkbox"
                id="addParkingCheck"
                checked={includeParking}
                onChange={(e) => setIncludeParking(e.target.checked)}
                className="w-4 h-4 accent-[#9E0038] rounded cursor-pointer"
              />
            </div>

            {/* Nearby Free Parking Notice */}
            {event.nearbyFreeParking && event.nearbyFreeParking.length > 0 && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                  P
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-[11px]">Free Parking Alternative Available:</span>
                  <span className="text-[10px] text-emerald-800">
                    {event.nearbyFreeParking[0].name} ({event.nearbyFreeParking[0].distance}, {event.nearbyFreeParking[0].walkTime}). No fee needed.
                  </span>
                </div>
              </div>
            )}

            {includeParking && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setParkingTier('P1')}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-colors ${
                    parkingTier === 'P1'
                      ? 'bg-white border-[#9E0038] font-bold text-[#9E0038] ring-1 ring-[#9E0038]'
                      : 'bg-white/80 border-[#E7E5E4] text-[#57534E]'
                  }`}
                >
                  <div className="font-bold">P1 VIP Valet</div>
                  <span className="text-[10px] text-[#57534E]">+₹250</span>
                </button>
                <button
                  type="button"
                  onClick={() => setParkingTier('P2')}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-colors ${
                    parkingTier === 'P2'
                      ? 'bg-white border-[#9E0038] font-bold text-[#9E0038] ring-1 ring-[#9E0038]'
                      : 'bg-white/80 border-[#E7E5E4] text-[#57534E]'
                  }`}
                >
                  <div className="font-bold">P2 General Lot</div>
                  <span className="text-[10px] text-[#57534E]">+₹100</span>
                </button>
              </div>
            )}
          </div>

          {/* Visitor Primary Details */}
          <div className="flex flex-col gap-2 text-xs">
            <label className="font-bold text-[#1C1917]">Passholder Contact Details</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name (as on Government ID)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#9E0038] focus:ring-2 focus:ring-[#9E0038]/10 text-xs text-[#1C1917] bg-[#FCFAF7] focus:bg-white transition-all"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="tel"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="WhatsApp Mobile (e.g. 98250...)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#9E0038] focus:ring-2 focus:ring-[#9E0038]/10 text-xs text-[#1C1917] bg-[#FCFAF7] focus:bg-white transition-all"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for E-Ticket"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E5E4] focus:outline-none focus:border-[#9E0038] focus:ring-2 focus:ring-[#9E0038]/10 text-xs text-[#1C1917] bg-[#FCFAF7] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Promo Code Strip */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-3" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code (use GARBA2025)"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E7E5E4] text-xs uppercase text-[#1C1917] focus:outline-none focus:border-[#9E0038] bg-[#FCFAF7] focus:bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-3.5 py-2 bg-[#FFF0F4] hover:bg-[#FED7E2] text-[#9E0038] rounded-xl text-xs font-bold shrink-0 transition-colors border border-[#FED7E2]"
            >
              {promoApplied ? 'Applied ✓' : 'Apply'}
            </button>
          </div>

          {/* Payment Method Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#1C1917]">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  paymentMethod === 'upi'
                    ? 'border-[#9E0038] bg-[#FFF0F4] text-[#9E0038] font-bold ring-1 ring-[#9E0038]'
                    : 'border-[#E7E5E4] bg-white text-[#57534E] hover:bg-[#FCFAF7]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI (GPay)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#9E0038] bg-[#FFF0F4] text-[#9E0038] font-bold ring-1 ring-[#9E0038]'
                    : 'border-[#E7E5E4] bg-white text-[#57534E] hover:bg-[#FCFAF7]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Debit/Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#9E0038] bg-[#FFF0F4] text-[#9E0038] font-bold ring-1 ring-[#9E0038]'
                    : 'border-[#E7E5E4] bg-white text-[#57534E] hover:bg-[#FCFAF7]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>NetBanking</span>
              </button>
            </div>
          </div>

          {/* Price Breakdown Summary */}
          <div className="p-3.5 rounded-2xl bg-[#FCFAF7] border border-[#E7E5E4] flex flex-col gap-1.5 text-xs text-[#57534E]">
            <div className="flex justify-between">
              <span>Base Pass ({quantity}x ₹{tier.price})</span>
              <span className="tabular-nums">₹{basePrice}</span>
            </div>
            {includeParking && (
              <div className="flex justify-between text-[#9E0038]">
                <span>Reserved {parkingTier} Parking</span>
                <span className="tabular-nums">₹{parkingPrice}</span>
              </div>
            )}
            {promoApplied && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Festival Promo Discount</span>
                <span className="tabular-nums">-₹100</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Govt GST (18%)</span>
              <span className="tabular-nums">₹{gstAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform & Security Turnstile Fee</span>
              <span className="tabular-nums">₹{platformFee}</span>
            </div>
            <div className="border-t border-[#E7E5E4] pt-2 mt-1 flex justify-between font-extrabold text-sm text-[#1C1917]">
              <span>Grand Total</span>
              <span className="text-[#9E0038] tabular-nums text-base">₹{finalTotal}</span>
            </div>
          </div>

          {/* Submit Action with Map Option */}
          <div className="flex items-center gap-2">
            {onOpenMap && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMap(event);
                }}
                className="py-3 px-4 rounded-xl border border-[#9E0038]/30 hover:border-[#9E0038] bg-[#FFF0F4] hover:bg-[#FFE0E9] text-[#9E0038] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shrink-0"
                title="View live ground map & routes"
              >
                <MapPin className="w-4 h-4 text-[#9E0038]" />
                <span className="hidden xs:inline">Map</span>
              </button>
            )}
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 px-4 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-sm font-bold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Verifying Turnstile Payment...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{finalTotal} & Generate M-Pass</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
