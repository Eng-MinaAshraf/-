export function IconCross({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2v20M2 8h20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 2v6M2 8h20M12 8v14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconCopticCross({ size = 32, color = '#c9a227' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="8" r="3" fill={color} />
      <circle cx="24" cy="16" r="3" fill={color} />
      <circle cx="8" cy="16" r="3" fill={color} />
      <circle cx="16" cy="24" r="3" fill={color} />
      <rect x="14.5" y="5" width="3" height="22" rx="1.5" fill={color} />
      <rect x="5" y="14.5" width="22" height="3" rx="1.5" fill={color} />
    </svg>
  )
}

export function IconCopticCrossOrnate({ size = 28, color = '#c9a227' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill={color}>
      <path d="M14 1c-1 0-1.5.5-1.5 1.5v6.5H6c-1 0-1.5.5-1.5 1.5v2c0 1 .5 1.5 1.5 1.5h6.5V20.5c0 1 .5 1.5 1.5 1.5s1.5-.5 1.5-1.5V14H22c1 0 1.5-.5 1.5-1.5v-2c0-1-.5-1.5-1.5-1.5h-6.5V2.5C15.5 1.5 15 1 14 1Z" />
      <circle cx="14" cy="24" r="2" />
      <circle cx="4" cy="12" r="2" />
      <circle cx="24" cy="12" r="2" />
      <circle cx="14" cy="1.5" r="1.5" />
    </svg>
  )
}

export function IconBook({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7a4 4 0 0 1 4 4v12H4V4Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 8a4 4 0 0 1 4-4h1v16h-1a4 4 0 0 1-4-4V8Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 4v16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function IconDome({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8 2 5 5 5 9v1H4v2h16v-2h-1V9c0-4-3-7-7-7Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 12h16v2H4z" fill={color} fillOpacity="0.2" />
      <rect x="3" y="14" width="18" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <line x1="9" y1="14" x2="9" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="14" x2="15" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="2" x2="12" y2="0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function IconStar({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.9 8.9H23l-7.5 5.4 2.9 8.9L12 19.8l-6.4 5.4 2.9-8.9L1 10.9h8.1L12 2Z" fill={color} />
    </svg>
  )
}

export function IconCrossLeaf({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3v18M5 9h14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 17c2-2 4-2 4-4s-2-2-4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMusic({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18V5l12-2v13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke={color} strokeWidth="1.8" />
      <circle cx="18" cy="16" r="3" stroke={color} strokeWidth="1.8" />
    </svg>
  )
}

export function IconChevronLeft({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M13 5l-5 5 5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronRight({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M7 5l5 5-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSearch({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="2" />
      <path d="M16 16l4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconInfo({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="2" />
      <path d="M11 10v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="11" cy="7" r="1.2" fill={color} />
    </svg>
  )
}

export function IconHeart({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 19S3 13.5 3 7.5A4.5 4.5 0 0 1 11 4.8 4.5 4.5 0 0 1 19 7.5C19 13.5 11 19 11 19Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function IconBookmark({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M5 3h12v16l-6-4-6 4V3Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

export function IconCopy({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="8" y="8" width="11" height="11" rx="2" stroke={color} strokeWidth="2" />
      <path d="M14 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconShare({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="18" cy="5" r="2.5" stroke={color} strokeWidth="2" />
      <circle cx="4" cy="11" r="2.5" stroke={color} strokeWidth="2" />
      <circle cx="18" cy="17" r="2.5" stroke={color} strokeWidth="2" />
      <path d="M6.5 10L15.5 6M6.5 12L15.5 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconHome({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3l9 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconLibrary({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="5" height="18" rx="1" stroke={color} strokeWidth="2" />
      <rect x="10" y="3" width="5" height="18" rx="1" stroke={color} strokeWidth="2" />
      <path d="M17 3l4 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconSettings({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke={color} strokeWidth="2" />
    </svg>
  )
}

export function IconPlayCircle({ size = 48, color = '#c9a227' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" fill={color} />
      <path d="M19 16l14 8-14 8V16Z" fill="#080d28" />
    </svg>
  )
}

export function IconPrev({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M21 5L10 14l11 9V5Z" fill={color} />
      <rect x="5" y="5" width="3" height="18" rx="1.5" fill={color} />
    </svg>
  )
}

export function IconNext({ size = 28, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M7 5l11 9-11 9V5Z" fill={color} />
      <rect x="20" y="5" width="3" height="18" rx="1.5" fill={color} />
    </svg>
  )
}

export function IconDots({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="5" r="1.8" fill={color} />
      <circle cx="11" cy="11" r="1.8" fill={color} />
      <circle cx="11" cy="17" r="1.8" fill={color} />
    </svg>
  )
}

export function IconTranslate({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M2 4h8M6 2v2M4 4c0 3 2 5 4 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10c2 1 4 1 5 0M10 9l4 8M14 9l-4 8" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconClose({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconPsalmodia({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* roll / psalter scroll */}
      <rect x="4" y="3" width="16" height="4" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="4" y="17" width="16" height="4" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M7 7v10M17 7v10" stroke={color} strokeWidth="1.8" />
      <path d="M10 10h4M10 13h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export function IconPause({ size = 24, color = '#080d28' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="7" y="5" width="3.6" height="14" rx="1.6" fill={color} />
      <rect x="13.4" y="5" width="3.6" height="14" rx="1.6" fill={color} />
    </svg>
  )
}

export function IconPlay({ size = 24, color = '#080d28' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" fill={color} />
    </svg>
  )
}

export function IconCheck({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M4 10.5l4 4 8-9" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconHeartFilled({ size = 22, color = '#c9a227' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path
        d="M11 19S3 13.5 3 7.5A4.5 4.5 0 0 1 11 4.8 4.5 4.5 0 0 1 19 7.5C19 13.5 11 19 11 19Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconBookmarkFilled({ size = 22, color = '#c9a227' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M5 3h12v16l-6-4-6 4V3Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconHistory({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M3 11a8 8 0 1 0 2.3-5.6L3 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3v5h5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7v4.5l3 1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMoon({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M18 13.5A7.5 7.5 0 1 1 9.5 3a6 6 0 0 0 8.5 10.5Z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSun({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="4" stroke={color} strokeWidth="1.8" />
      <path
        d="M11 2v2M11 18v2M2 11h2M18 11h2M4.6 4.6l1.4 1.4M16 16l1.4 1.4M17.4 4.6L16 6M6 16l-1.4 1.4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconInfoSmall({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7.2" stroke={color} strokeWidth="1.6" />
      <path d="M9 8.2v4.3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="5.6" r="1" fill={color} />
    </svg>
  )
}

export function IconTrash({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5M5 5l.8 11a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L15 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
