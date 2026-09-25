import type React from 'react'
import heroImg from '../imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png'
import {
  IconSearch,
  IconInfo,
  IconBook,
  IconDome,
  IconStar,
  IconCrossLeaf,
  IconMusic,
  IconChevronLeft,
  IconCopticCrossOrnate,
} from './icons'
import BottomNav from './BottomNav'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

interface Category {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
}

const categories: Category[] = [
  {
    id: 'annual',
    title: 'التسبحة السنوية',
    subtitle: 'ترانيم وصلوات السنة',
    icon: <IconBook size={28} color="#c9a227" />,
  },
  {
    id: 'kiahk',
    title: 'التسبحة الكيهكية',
    subtitle: 'صلوات وطقوس الكيهك',
    icon: <IconDome size={28} color="#c9a227" />,
  },
  {
    id: 'feasts',
    title: 'تسبحة الأعياد',
    subtitle: 'ترانيم وألحان الأعياد',
    icon: <IconStar size={28} color="#c9a227" />,
  },
  {
    id: 'fasting',
    title: 'تسبحة الأصوام',
    subtitle: 'صلوات وألحان الصوم',
    icon: <IconCrossLeaf size={28} color="#c9a227" />,
  },
  {
    id: 'psalmodia',
    title: 'الإبصلمودية',
    subtitle: 'تسبحة الإبصلمودية',
    icon: <IconBook size={28} color="#c9a227" />,
  },
  {
    id: 'hymns',
    title: 'الألحان',
    subtitle: 'ألحان قبطية متنوعة',
    icon: <IconMusic size={28} color="#c9a227" />,
  },
]

interface HomeScreenProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onCategorySelect: (id: string) => void
}

export default function HomeScreen({ activeTab, onTabChange, onCategorySelect }: HomeScreenProps) {
  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col"
    >
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{ background: 'linear-gradient(to bottom, #060b21, transparent)' }}
      >
        <div className="flex items-center gap-2">
          <IconCopticCrossOrnate size={34} color="#c9a227" />
          <span
            style={{
              color: '#c9a227',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '0.02em',
            }}
          >
            إيفنوتي 99
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <IconSearch size={18} color="white" />
          </button>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <IconInfo size={18} color="white" />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Hero Banner */}
        <div className="mx-4 mb-5 rounded-2xl overflow-hidden relative" style={{ height: '180px' }}>
          <img
            src={heroImg}
            alt="إيفنوتي 99"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(8,13,40,0.72) 30%, rgba(8,13,40,0.2) 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>
              مرحباً بك في
            </p>
            <h2
              style={{
                color: '#c9a227',
                fontSize: '26px',
                fontWeight: 800,
                lineHeight: 1.2,
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              إيفنوتي 99
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', fontWeight: 400, marginTop: '4px' }}>
              كنز الكنيسة القبطية .. في متناول يدك
            </p>
          </div>
        </div>

        {/* Category Grid */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="rounded-2xl p-4 text-right transition-all active:scale-95 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #1a2368 0%, #111a52 60%, #0d1440 100%)',
                border: '1px solid rgba(201,162,39,0.18)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.25)' }}
              >
                {cat.icon}
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>
                    {cat.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 400, marginTop: '2px' }}>
                    {cat.subtitle}
                  </p>
                </div>
                <IconChevronLeft size={16} color="#c9a227" />
              </div>
            </button>
          ))}
        </div>

        {/* Daily Verse */}
        <div
          className="mx-4 rounded-2xl p-4 flex flex-col items-center text-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #131c52, #0d1440)',
            border: '1px solid rgba(201,162,39,0.2)',
          }}
        >
          <div className="flex items-center gap-3 w-full justify-center">
            <div style={{ color: '#c9a227', opacity: 0.6, fontSize: '18px' }}>✦</div>
            <IconCopticCrossOrnate size={20} color="#c9a227" />
            <div style={{ color: '#c9a227', opacity: 0.6, fontSize: '18px' }}>✦</div>
          </div>
          <p
            style={{
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            «ليكن تسبيحك دائماً في فمي»
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>(مزمور ١:٣٤)</p>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}
