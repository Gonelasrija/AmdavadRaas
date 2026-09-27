import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { GarbaEvent, ParkingLot, ParkingBooking } from '../types';
import { 
  X, 
  Car, 
  ShieldCheck, 
  Check, 
  Navigation, 
  Sparkles, 
  Clock, 
  AlertCircle,
  QrCode
} from 'lucide-react';

interface ParkingPreBookModalProps {
  event: GarbaEvent;
  onClose: () => void;
  onBookingSuccess: (booking: ParkingBooking) => void;
}

export const ParkingPreBookModal: React.FC<ParkingPreBookModalProps> = ({
  event,
  onClose,
  onBookingSuccess,
}) => {
  const [selectedLotCode, setSelectedLotCode] = useState<'P1' | 'P2' | 'P3' | '2W'>('P1');
  const [vehicleType, setVehicleType] = useState<'2-Wheeler' | 'Car' | 'SUV' | 'Valet VIP'>('Valet VIP');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('08:00 PM – 09:30 PM');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedLot = event.parkingLots.find((p) => p.code === selectedLotCode) || event.parkingLots[0];

  const handlePreBook = (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicleNumber.trim()) {
      setErrorMsg('Please enter vehicle registration number (e.g. GJ-01-AB-1234).');
      return;
    }
    if (!driverPhone.trim() || driverPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for parking SMS barcode.');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8d4b00', '#ffdcc3', '#af275a'],
      });

      const randomBookingId = `PRK-${Math.floor(10000 + Math.random() * 90000)}`;

      const newParkingBooking: ParkingBooking = {
        bookingId: randomBookingId,
        eventId: event.id,
        venueName: event.venueName,
        lotCode: selectedLot.code,
        lotName: selectedLot.name,
        vehicleType,
        vehicleNumber: vehicleNumber.toUpperCase().trim(),
        timeSlot,
        price: selectedLot.price,
        entryGate: selectedLot.code === 'P1' ? 'Gate 1 VIP Turnstile' : 'Gate 3 Service Lane',
        qrToken: `QR-PARK-${randomBookingId}`,
        bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      onBookingSuccess(newParkingBooking);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#dee9fc]">
        {/* Header */}
        <div className="p-4 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9E0038] text-white flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#121c2a]">
                Pre-book Parking Spot
              </h3>
              <p className="text-[11px] text-[#554336] truncate max-w-[220px]">
                {event.venueName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePreBook} className="overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* NEW: Nearby Free Parking Zero-Cost Alternative Banner */}
          {event.nearbyFreeParking && event.nearbyFreeParking.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    P
                  </span>
                  <span className="text-xs font-bold text-emerald-950">
                    Nearby Free Parking Available (₹0)
                  </span>
                </div>
                <span className="text-[9px] font-extrabold uppercase bg-white border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full">
                  No Fee
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                If you prefer not to pay for on-ground valet, park freely at:
              </p>
              <div className="space-y-1.5">
                {event.nearbyFreeParking.map((freeP) => (
                  <div key={freeP.id} className="p-2 bg-white rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#121c2a] text-[11px]">{freeP.name}</p>
                      <p className="text-[10px] text-gray-500">{freeP.locationHint} ({freeP.walkTime})</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                      {freeP.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Select Parking Lot */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#121c2a]">Or Reserve On-Venue Guaranteed Bay</label>
            <div className="grid grid-cols-1 gap-2">
              {event.parkingLots.map((lot) => {
                const isSelected = lot.code === selectedLotCode;
                return (
                  <div
                    key={lot.id}
                    onClick={() => {
                      setSelectedLotCode(lot.code);
                      if (lot.code === 'P1') setVehicleType('Valet VIP');
                      else if (lot.code === '2W') setVehicleType('2-Wheeler');
                      else setVehicleType('Car');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#9E0038] bg-pink-50/40 ring-1 ring-[#9E0038]'
                        : 'border-[#dee9fc] bg-white hover:bg-[#eff4ff]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-pink-100 text-[#700028] text-xs font-bold flex items-center justify-center shrink-0">
                        {lot.code}
                      </span>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-[#121c2a]">{lot.name}</span>
                        <span className="text-[10px] text-gray-500">{lot.statusText}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#9E0038]">
                        {lot.price === 0 ? 'Free' : `₹${lot.price}`}
                      </span>
                      <span className="text-[9px] text-emerald-700 font-semibold block">
                        {lot.availableSpots} left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="flex flex-col gap-2.5 text-xs">
            <label className="font-bold text-[#121c2a]">Vehicle Registration Plate</label>
            <input
              type="text"
              required
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="e.g. GJ-01-AB-1234 or GJ-18-XX-9999"
              className="w-full px-3 py-2.5 rounded-xl border border-[#dee9fc] text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#9E0038]/30"
            />

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#554336]">Driver / Owner Name</label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Yash Patel"
                  className="px-3 py-2 rounded-xl border border-[#dee9fc] text-xs focus:outline-none focus:ring-1 focus:ring-[#9E0038]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#554336]">Mobile for SMS Tag</label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="10-digit number"
                  className="px-3 py-2 rounded-xl border border-[#dee9fc] text-xs focus:outline-none focus:ring-1 focus:ring-[#9E0038]"
                />
              </div>
            </div>
          </div>

          {/* Preferred Arrival Slot */}
          <div className="flex flex-col gap-1.5 text-xs">
            <label className="font-bold text-[#121c2a]">Expected Entry Time Slot</label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#dee9fc] bg-white text-xs text-[#121c2a] focus:outline-none focus:ring-1 focus:ring-[#9E0038]"
            >
              <option value="07:30 PM – 08:30 PM">07:30 PM – 08:30 PM (Early Bird / Smooth Flow)</option>
              <option value="08:30 PM – 09:30 PM">08:30 PM – 09:30 PM (Peak Entry)</option>
              <option value="09:30 PM – 10:30 PM">09:30 PM – 10:30 PM (Late Night Entry)</option>
            </select>
          </div>

          {/* Valet Fast Retrieval Guarantee */}
          <div className="p-3 rounded-2xl bg-pink-50/40 border border-pink-100 text-xs flex items-start gap-2 text-[#554336]">
            <ShieldCheck className="w-4 h-4 text-[#9E0038] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Guaranteed reserved bay. Present your digital QR at the turnstile gate barrier for automatic boom barrier opening.
            </p>
          </div>

          {/* Confirm Pre-booking */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs sm:text-sm font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Reserving Parking Bay...
              </span>
            ) : (
              <>
                <Car className="w-4 h-4" />
                <span>Confirm {selectedLot.name.split(' ')[0]} Reservation {selectedLot.price > 0 ? `(₹${selectedLot.price})` : '(Free)'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
