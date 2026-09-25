/**
 * شعار إيفنوتي 99 — صليب قبطي ذهبي داخل حلقة مع زخرفة نجوم
 * Logo component: ornate Coptic cross in a golden ring with sparkles.
 */

interface LogoProps {
  size?: number
  withText?: boolean
  glow?: boolean
}

export function LogoMark({ size = 48, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 35% 30%, #1d2a75 0%, #101a52 55%, #0a1136 100%)',
        border: '1.5px solid rgba(201,162,39,0.55)',
        boxShadow: glow
          ? '0 0 18px rgba(201,162,39,0.35), inset 0 0 12px rgba(201,162,39,0.12)'
          : 'none',
      }}
    >
      <svg
        width={size * 0.62}
        height={size * 0.62}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGold" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#e8c566" />
            <stop offset="50%" stopColor="#c9a227" />
            <stop offset="100%" stopColor="#9a7a1c" />
          </linearGradient>
        </defs>
        {/* arms of the cross with flared (cross-crossing) ends */}
        <path
          d="M24 4l4 6h-3v9h9v-3l6 4-6 4v-3h-9v13h3l-6 4-6-4h3V24h-9v3l-6-4 6-4v3h9V10h-3l4-6Z"
          fill="url(#logoGold)"
          stroke="#f0d68a"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        {/* center diamond */}
        <path d="M24 20l3 4-3 4-3-4 3-4Z" fill="#0d1440" opacity="0.55" />
        {/* four corner dots (Coptic three-nail motif) */}
        <circle cx="12" cy="12" r="2" fill="url(#logoGold)" />
        <circle cx="36" cy="12" r="2" fill="url(#logoGold)" />
        <circle cx="12" cy="36" r="2" fill="url(#logoGold)" />
        <circle cx="36" cy="36" r="2" fill="url(#logoGold)" />
      </svg>
    </div>
  )
}

export default function Logo({ size = 48, withText = false, glow = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5" dir="rtl">
      <LogoMark size={size} glow={glow} />
      {withText && (
        <div className="flex flex-col leading-none">
          <span
            style={{
              color: '#c9a227',
              fontSize: size * 0.46,
              fontWeight: 800,
              letterSpacing: '0.01em',
            }}
          >
            إيفنوتي <span style={{ fontFamily: "'Cairo', sans-serif" }}>99</span>
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: size * 0.2,
              fontWeight: 500,
              marginTop: 3,
            }}
          >
            كنز الكنيسة القبطية
          </span>
        </div>
      )}
    </div>
  )
}
