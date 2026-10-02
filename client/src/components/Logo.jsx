import { Link } from "react-router-dom";

export default function Logo({ compact = false }) {
  return (
    <Link
      to="/"
      aria-label="Malik Al Masiah Trading & Contracting L.L.C"
      className="group inline-flex items-center gap-3"
    >
      {/* MM MONOGRAM */}
      <div
        className={`relative flex shrink-0 items-center justify-center ${
          compact ? "h-11 w-11" : "h-14 w-14"
        }`}
      >
        {/* Gold glow */}
        <div className="absolute inset-1 rounded-full bg-[#d4af37]/10 blur-md transition duration-500 group-hover:bg-[#d4af37]/20" />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="logoGold"
              x1="15"
              y1="10"
              x2="85"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff1a8" />
              <stop offset="0.28" stopColor="#f0cf62" />
              <stop offset="0.55" stopColor="#d4af37" />
              <stop offset="0.8" stopColor="#b58a25" />
              <stop offset="1" stopColor="#f4d76b" />
            </linearGradient>

            <filter id="logoShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="3"
                stdDeviation="2.5"
                floodColor="#d4af37"
                floodOpacity="0.28"
              />
            </filter>
          </defs>

          {/* Architectural roof */}
          <path
            d="M14 31 L50 8 L86 31"
            stroke="url(#logoGold)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoShadow)"
          />

          {/* Left M */}
          <path
            d="M18 73V38L36 58L50 42"
            stroke="url(#logoGold)"
            strokeWidth="8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            filter="url(#logoShadow)"
          />

          {/* Center architectural pillar */}
          <path
            d="M50 25V77"
            stroke="url(#logoGold)"
            strokeWidth="8"
            strokeLinecap="square"
            filter="url(#logoShadow)"
          />

          {/* Right M */}
          <path
            d="M50 42L64 58L82 38V73"
            stroke="url(#logoGold)"
            strokeWidth="8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            filter="url(#logoShadow)"
          />

          {/* Bottom foundation */}
          <path
            d="M22 82H78"
            stroke="url(#logoGold)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* COMPANY NAME */}
      <div className="leading-none">
        <div
          className={`font-serif font-semibold tracking-[0.08em] text-white ${
            compact ? "text-[12px]" : "text-[15px]"
          }`}
        >
          MALIK AL MASIAH
        </div>

        <div
          className={`mt-1.5 flex items-center gap-2 text-[#d4af37] ${
            compact ? "text-[6px]" : "text-[7px]"
          } font-medium tracking-[0.24em]`}
        >
          <span className="hidden h-px w-4 bg-[#d4af37]/70 sm:block" />
          TRADING & CONTRACTING L.L.C
          <span className="hidden h-px w-4 bg-[#d4af37]/70 sm:block" />
        </div>
      </div>
    </Link>
  );
}