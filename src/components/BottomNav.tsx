import React from 'react';
import { 
  Sparkles, 
  Map, 
  Music, 
  Ticket, 
  MessageSquare, 
  Plus 
} from 'lucide-react';

export type TabType = 'explore' | 'venues' | 'lineup' | 'wallet' | 'community';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenHostModal: () => void;
  hasActivePass: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenHostModal,
  hasActivePass,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#dee9fc] shadow-[0_-2px_12px_rgba(0,0,0,0.04)] pb-safe">
      <div className="max-w-md mx-auto flex items-center justify-between h-16 px-2 sm:px-4">
        {/* Tab 1: Explore */}
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'explore'
              ? 'text-[#9E0038] font-extrabold'
              : 'text-[#554336] hover:text-[#121c2a]'
          }`}
          aria-label="Explore Garba"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Explore</span>
        </button>

        {/* Tab 2: Venues (Map) */}
        <button
          onClick={() => onTabChange('venues')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'venues'
              ? 'text-[#9E0038] font-extrabold'
              : 'text-[#554336] hover:text-[#121c2a]'
          }`}
          aria-label="Map & Venues"
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Venues</span>
        </button>

        {/* Center Action: Host A Garba */}
        <div className="relative -top-3 flex flex-col items-center justify-center px-1">
          <button
            onClick={onOpenHostModal}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9E0038] to-[#D92662] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(158,0,56,0.35)] active:scale-95 transition-transform"
            title="List Local Garba"
            aria-label="Host A Garba"
          >
            <Plus className="w-6 h-6" />
          </button>
          <span className="text-[9px] font-bold text-[#9E0038] mt-0.5 uppercase tracking-wide">
            Host
          </span>
        </div>

        {/* Tab 3: My Passes & Wallet */}
        <button
          onClick={() => onTabChange('wallet')}
          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'wallet'
              ? 'text-[#9E0038] font-extrabold'
              : 'text-[#554336] hover:text-[#121c2a]'
          }`}
          aria-label="My Passes"
        >
          <Ticket className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">My Passes</span>
          {hasActivePass && (
            <span className="absolute top-2 right-4 w-2 h-2 rounded-full bg-[#D92662] ring-2 ring-white" />
          )}
        </button>

        {/* Tab 4: Community */}
        <button
          onClick={() => onTabChange('community')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            activeTab === 'community'
              ? 'text-[#9E0038] font-extrabold'
              : 'text-[#554336] hover:text-[#121c2a]'
          }`}
          aria-label="Community Buzz"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 tracking-tight">Community</span>
        </button>
      </div>
    </nav>
  );
};
