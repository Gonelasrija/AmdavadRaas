import React, { useState } from 'react';
import { AmdavadLogo } from './AmdavadLogo';
import { Area } from '../types';
import { 
  MapPin, 
  ChevronDown, 
  Bell, 
  Search, 
  SlidersHorizontal,
  Check,
  X
} from 'lucide-react';

interface HeaderProps {
  selectedArea: string;
  onSelectArea: (area: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications: () => void;
  hasActivePasses: boolean;
  activePassesCount: number;
  onNavigateToWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedArea,
  onSelectArea,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  hasActivePasses,
  activePassesCount,
  onNavigateToWallet
}) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const areasList: { name: string; city: string }[] = [
    { name: 'All Ahmedabad & Gandhinagar', city: 'Gujarat' },
    { name: 'SG Highway', city: 'Ahmedabad' },
    { name: 'Sindhu Bhavan', city: 'Ahmedabad' },
    { name: 'Bodakdev & Satellite', city: 'Ahmedabad' },
    { name: 'Old City (Heritage Pols)', city: 'Ahmedabad' },
    { name: 'Kankaria Lakefront', city: 'Ahmedabad' },
    { name: 'Vaishnodevi Circle', city: 'Ahmedabad' },
    { name: 'Sector 11 Cultural Ground', city: 'Gandhinagar' },
    { name: 'GIFT City Promenade', city: 'Gandhinagar' },
    { name: 'Infocity & Kudasan', city: 'Gandhinagar' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e6eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col gap-2">
        {/* Top Tier: Logo, Location, Notification & Wallet */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Location Dropdown */}
          <div className="flex items-center gap-2 sm:gap-4">
            <AmdavadLogo size="md" />

            {/* Location selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-[#eff4ff] transition-colors text-left"
                aria-label="Select Amdavad area"
              >
                <MapPin className="w-3.5 h-3.5 text-[#9E0038] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-[#121c2a] truncate max-w-[130px] sm:max-w-[190px]">
                  {selectedArea}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#554336] shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {isLocationDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsLocationDropdownOpen(false)} 
                  />
                  <div className="absolute left-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-[#dee9fc] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 text-[11px] font-bold text-[#9E0038] uppercase tracking-wider">
                      Select Zone / Neighborhood
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5">
                      {areasList.map((item) => {
                        const isSelected = selectedArea === item.name || (item.name === 'All Ahmedabad & Gandhinagar' && selectedArea === 'All');
                        return (
                          <button
                            key={item.name}
                            onClick={() => {
                              onSelectArea(item.name === 'All Ahmedabad & Gandhinagar' ? 'All' : item.name);
                              setIsLocationDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                              isSelected
                                ? 'bg-pink-50 text-[#9E0038] font-bold'
                                : 'text-[#121c2a] hover:bg-[#eff4ff]'
                            }`}
                          >
                            <div>
                              <div>{item.name}</div>
                              <span className="text-[10px] text-gray-500">{item.city}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#9E0038]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Actions: Notifications & My Wallet / Active Pass Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full text-[#121c2a] hover:bg-[#e6eeff] transition-colors"
              aria-label="Notifications & Pass Alerts"
            >
              <Bell className="w-5 h-5 text-[#554336]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D92662] rounded-full ring-2 ring-white animate-pulse" />
            </button>

            {/* Passes & Wallet Jump Button */}
            <button
              onClick={onNavigateToWallet}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-[#9E0038] hover:bg-[#7D002C] text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <span className="hidden sm:inline">Passes</span>
              {hasActivePasses ? (
                <span className="px-1.5 py-0.2 bg-amber-200 text-[#700028] rounded-full text-[10px] font-bold">
                  {activePassesCount}
                </span>
              ) : (
                <span className="text-[11px] font-bold">Wallet</span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Tier: Universal Search Bar */}
        <div className="relative flex items-center">
          <div className="w-full relative flex items-center bg-white border border-[#dee9fc] hover:border-[#9E0038]/40 focus-within:border-[#9E0038] rounded-xl px-3 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search garba grounds, singers (Aditya Gadhvi, Kinjal Dave), free parking, VIP..."
              className="w-full bg-transparent text-xs sm:text-sm text-[#121c2a] placeholder:text-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="h-4 w-px bg-gray-200 mx-1.5 shrink-0" />
            <button 
              onClick={() => onSearchChange(searchQuery ? '' : 'Free Parking')}
              className="text-[#9E0038] hover:text-[#7D002C] p-0.5 shrink-0"
              title="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
