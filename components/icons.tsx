export function HeartIcon({ filled, size = 17 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#c94b3a" : "none"} stroke={filled ? "#c94b3a" : "#2a2b2e"} strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarIcon({ filled, size = 14 }: { filled: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#d4734a" : "#e0d8ce"}>
      <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7L12 2.5Z" />
    </svg>
  );
}

export function ClockIcon({ size = 14, color = "#8a8178" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FireIcon({ size = 14, color = "#8a8178" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 22c4 0 6.5-2.7 6.5-6.2 0-3-1.8-4.7-2.8-6.6-.6 1.4-1.6 2.2-2.4 1.6-.9-.7-.5-2.6-1-4.8-2.4 1.6-5.8 5.4-5.8 9 0 3.7 2 7 5.5 7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SearchIcon({ size = 18, color = "#8a8178" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

export function PersonIcon({ size = 16, color = "#8a8178" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRight({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ size = 20, color = "#2a2b2e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function XIcon({ size = 20, color = "#2a2b2e" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function ShuffleIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M4 6h3.5L15 18h4.5M4 18h3.5L11 12M16 6h3M19 6l-2.5-2.5M19 6l-2.5 2.5M19 18l-2.5-2.5M19 18l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
