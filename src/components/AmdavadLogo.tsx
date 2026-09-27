import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const AmdavadLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Handcrafted SVG Logo: Dandiya sticks + Diya flame + Knot motifs */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flame / Jyot at top - Sacred Gold & Amber */}
          <path
            d="M60 6C60 6 72 20 72 29C72 35.6 66.6 41 60 41C53.4 41 48 35.6 48 29C48 20 60 6 60 6Z"
            fill="#C41E3A"
          />
          <path
            d="M60 14C60 14 67 22 67 28C67 31.9 63.9 35 60 35C56.1 35 53 31.9 53 28C53 22 60 14 60 14Z"
            fill="#EAB308"
          />

          {/* Top Floral Knot Motif */}
          <path
            d="M60 33C64 36 67 40 60 44C53 40 56 36 60 33Z"
            stroke="#CA8A04"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M51 38C55 35 59 38 56 42C52 42 49 40 51 38Z"
            stroke="#CA8A04"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M69 38C65 35 61 38 64 42C68 42 71 40 69 38Z"
            stroke="#CA8A04"
            strokeWidth="2"
            fill="none"
          />

          {/* Dandiya Stick 1 (Back) */}
          <rect
            x="24"
            y="22"
            width="12"
            height="102"
            rx="6"
            transform="rotate(-45 24 22)"
            fill="#9E0038"
          />
          {/* Dandiya Grips / Bands */}
          <rect
            x="27"
            y="28"
            width="12"
            height="12"
            transform="rotate(-45 27 28)"
            fill="#EAB308"
          />
          <rect
            x="32"
            y="35"
            width="12"
            height="5"
            transform="rotate(-45 32 35)"
            fill="#700028"
          />
          <rect
            x="68"
            y="86"
            width="12"
            height="12"
            transform="rotate(-45 68 86)"
            fill="#EAB308"
          />
          <rect
            x="73"
            y="93"
            width="12"
            height="5"
            transform="rotate(-45 73 93)"
            fill="#700028"
          />

          {/* Dandiya Stick 2 (Front) */}
          <rect
            x="96"
            y="22"
            width="12"
            height="102"
            rx="6"
            transform="rotate(45 96 22)"
            fill="#D92662"
          />
          {/* Front Dandiya Bands */}
          <rect
            x="93"
            y="28"
            width="12"
            height="12"
            transform="rotate(45 93 28)"
            fill="#EAB308"
          />
          <rect
            x="88"
            y="35"
            width="12"
            height="5"
            transform="rotate(45 88 35)"
            fill="#9E0038"
          />
          <rect
            x="52"
            y="86"
            width="12"
            height="12"
            transform="rotate(45 52 86)"
            fill="#CA8A04"
          />

          {/* Bottom Floral Knot Motif */}
          <path
            d="M60 82C64 78 67 74 60 70C53 74 56 78 60 82Z"
            stroke="#CA8A04"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M51 77C55 80 59 77 56 73C52 73 49 75 51 77Z"
            stroke="#CA8A04"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M69 77C65 80 61 77 64 73C68 73 71 75 69 77Z"
            stroke="#CA8A04"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[17px] tracking-tight text-[#9E0038]">
              Amdavad Raas
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#D92662] uppercase mt-0.5">
            Navratri 2025
          </span>
        </div>
      )}
    </div>
  );
};
