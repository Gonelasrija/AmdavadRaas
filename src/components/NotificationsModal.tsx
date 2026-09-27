import React from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  Car, 
  Ticket, 
  Sparkles, 
  Check 
} from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
  onNavigateToVenues: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onNavigateToVenues,
}) => {
  const alerts = [
    {
      id: 1,
      type: 'traffic',
      title: 'SG Highway Service Lane Slow at Iscon',
      time: '4 mins ago',
      desc: 'Heavy festival traffic buildup between Pakwan Crossroad and YMCA. Police advising vehicles to use Sindhu Bhavan crossover to P3 lot.',
      actionText: 'View Alternate Route on Map',
    },
    {
      id: 2,
      type: 'pass',
      title: '85% Passes Sold for Mandli Garba',
      time: '18 mins ago',
      desc: 'Early Bird Single dancer passes are down to last 40 slots. Couple passes selling fast at YMCA Club turnstiles.',
      actionText: 'Book Now',
    },
    {
      id: 3,
      type: 'parking',
      title: 'P1 VIP Lot at Karnavati Club 94% Full',
      time: '35 mins ago',
      desc: 'Valet attendants are routing cars to Bodakdev under-flyover bay. Free electric golf cart shuttle active.',
      actionText: 'Check Parking Status',
    },
    {
      id: 4,
      type: 'weather',
      title: 'Clear Skies & Pleasant Autumn Night in Ahmedabad',
      time: '1 hour ago',
      desc: 'Forecast is 27°C with pleasant gentle breeze. No rain threat tonight. Amdavad Rain Protection Guarantee active.',
      actionText: 'Read Weather Policy',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-[#dee9fc]">
        <div className="p-4 bg-pink-50/50 border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9E0038] text-white flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#121c2a]">
                Live Ground Notifications
              </h3>
              <p className="text-[11px] text-[#554336]">
                Ahmedabad & Gandhinagar Navratri updates
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

        <div className="overflow-y-auto p-4 flex flex-col gap-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-[#dee9fc] flex flex-col gap-1.5 text-xs shadow-xs"
            >
              <div className="flex items-start justify-between">
                <span className="font-bold text-[#121c2a]">{alert.title}</span>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">{alert.time}</span>
              </div>
              <p className="text-[#554336] leading-relaxed text-[11px]">
                {alert.desc}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToVenues();
                }}
                className="text-[11px] font-bold text-[#9E0038] hover:underline self-start pt-0.5"
              >
                {alert.actionText} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
