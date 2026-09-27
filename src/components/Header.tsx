import React, { useState } from 'react';
import { AmdavadLogo } from './AmdavadLogo';
import { TabType } from './BottomNav';
import { 
  MapPin, 
  ChevronDown, 
  Bell, 
  Search, 
  SlidersHorizontal,
  Check,
  X,
  Plus,
  Compass,
  Ticket,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenHostModal: () => void;
  hasActivePasses: boolean;
  activePassesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  selectedArea,
  onSelectArea,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenHostModal,
  hasActivePasses,
  activePassesCount,
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const areasList: { name: string; city: string; tag: string }[] = [
    { name: 'All Ahmedabad & Gandhinagar', city: 'Gujarat', tag: 'All Venues' },
    { name: 'SG Highway', city: 'Ahmedabad', tag: 'Club & Party Plots' },
    { name: 'Sindhu Bhavan', city: 'Ahmedabad', tag: 'VIP Arenas' },
    { name: 'Bodakdev & Satellite', city: 'Ahmedabad', tag: 'Premier Clubs' },
    { name: 'Old City (Heritage Pols)', city: 'Ahmedabad', tag: 'Free Sheri Garba' },
    { name: 'Kankaria Lakefront', city: 'Ahmedabad', tag: 'Cultural Arena' },
    { name: 'Vaishnodevi Circle', city: 'Ahmedabad', tag: 'Open Grounds' },
    { name: 'Sector 11 Cultural Ground', city: 'Gandhinagar', tag: 'Capital Stage' },
    { name: 'GIFT City Promenade', city: 'Gandhinagar', tag: 'Hi-Tech Arena' },
    { name: 'Infocity & Kudasan', city: 'Gandhinagar', tag: 'Youth Raas' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Nav Row */}
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Brand & Location Lockup */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button 
              onClick={() => onTabChange('explore')}
              className="text-left focus:outline-none group transition-transform active:scale-98"
            >
              <AmdavadLogo size="md" />
            </button>

            {/* Location selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-full bg-[#FCFAF7] border border-[#E7E5E4] hover:border-[#9E0038]/30 transition-all text-left text-xs font-semibold text-[#1C1917]"
                aria-label="Select Amdavad area"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
                <span className="truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px]">
                  {selectedArea === 'All' ? 'All Amdavad' : selectedArea}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#57534E] shrink-0" />
              </button>

              {/* Location Dropdown Menu */}
              {isLocationDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLocationDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E7E5E4] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-[#9E0038] uppercase tracking-wider">
                      Select Amdavad / Gandhinagar Zone
                    </div>
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {areasList.map((item) => {
                        const isSelected = selectedArea === item.name || (item.name === 'All Ahmedabad & Gandhinagar' && selectedArea === 'All');
                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              onSelectArea(item.name === 'All Ahmedabad & Gandhinagar' ? 'All' : item.name);
                              setIsLocationDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                              isSelected
                                ? 'bg-[#FFF0F4] text-[#9E0038] font-bold'
                                : 'text-[#1C1917] hover:bg-[#FCFAF7]'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{item.name}</div>
                              <span className="text-[10px] text-[#57534E]">{item.city} · {item.tag}</span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-[#9E0038] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => onTabChange('explore')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'explore'
                  ? 'bg-[#FFF0F4] text-[#9E0038]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FCFAF7]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Garba</span>
            </button>

            <button
              onClick={() => onTabChange('venues')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'venues'
                  ? 'bg-[#FFF0F4] text-[#9E0038]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FCFAF7]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Venues & Map</span>
            </button>

            <button
              onClick={() => onTabChange('wallet')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'wallet'
                  ? 'bg-[#FFF0F4] text-[#9E0038]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FCFAF7]'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Passes & Wallet</span>
              {hasActivePasses && (
                <span className="w-2 h-2 rounded-full bg-[#D92662]" />
              )}
            </button>

            <button
              onClick={() => onTabChange('community')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'community'
                  ? 'bg-[#FFF0F4] text-[#9E0038]'
                  : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FCFAF7]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Community Buzz</span>
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Host Garba Button (Desktop) */}
            <button
              onClick={onOpenHostModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#9E0038]/30 hover:border-[#9E0038] bg-white text-[#9E0038] text-xs font-bold hover:bg-[#FFF0F4] transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Host Garba</span>
            </button>

            {/* Notification Bell with alert pulse */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full text-[#1C1917] hover:bg-[#FCFAF7] border border-transparent hover:border-[#E7E5E4] transition-all"
              aria-label="Notifications & Alerts"
            >
              <Bell className="w-4 h-4 text-[#57534E]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D92662] rounded-full ring-2 ring-white" />
            </button>

            {/* My Passes CTA Button */}
            <button
              onClick={() => onTabChange('wallet')}
              className="flex items-center gap-1.5 py-1.5 px-3 sm:px-4 rounded-full bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">My Passes</span>
              {hasActivePasses ? (
                <span className="px-1.5 py-0.2 bg-[#FEF3C7] text-[#700028] rounded-full text-[10px] font-bold">
                  {activePassesCount}
                </span>
              ) : (
                <span className="xs:hidden">Passes</span>
              )}
            </button>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="pb-3 pt-0.5">
          <div className="w-full relative flex items-center bg-[#FCFAF7] border border-[#E7E5E4] hover:border-[#9E0038]/40 focus-within:border-[#9E0038] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#9E0038]/10 rounded-2xl px-3.5 py-2 shadow-2xs transition-all">
            <Search className="w-4 h-4 text-[#57534E] shrink-0 mr-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by garba ground, singer (Aditya Gadhvi, Kinjal Dave), free parking, pol garba..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 text-[#57534E] hover:text-[#1C1917] rounded-full transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="h-4 w-px bg-[#E7E5E4] mx-2 shrink-0" />
            <button 
              onClick={() => onSearchChange(searchQuery ? '' : 'Free Parking')}
              className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all shrink-0 flex items-center gap-1 ${
                searchQuery.toLowerCase().includes('free parking')
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-[#9E0038] hover:bg-[#FFF0F4]'
              }`}
              title="Filter Free Parking"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">🅿️ Free Parking</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

