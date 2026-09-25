/**
 * الشاشة الرئيسية — HomeScreen مع بحث فعلي وشعار جديد وآية يومية متغيرة
 */
import type React from 'react'
import { useState } from 'react'
import heroImg from '../imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png'
import { categories, todayVerse } from '../data'
import Logo from './Logo'
import BottomNav from './BottomNav'
import {
  IconBook,
  IconDome,
  IconStar,
  IconCrossLeaf,
  IconMusic,
  IconPsalmodia,
  IconChevronLeft,
  IconCopticCrossOrnate,
  IconSearch,
  IconClose,
} from './icons'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

const iconMap: Record<string, React.ReactNode> = {
  book: <IconBook size={28} color="#c9a227" />,
  dome: <IconDome size={28} color="#c9a227" />,
  star: <IconStar size={26} color="#c9a227" />,
  cross: <IconCrossLeaf size={28} color="#c9a227" />,
  psalmodia: <IconPsalmodia size={28} color="#c9a227" />,
  music: <IconMusic size={26} color="#c9a227" />,
}

interface HomeScreenProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onCategorySelect: (id: string) => void
}

export default function HomeScreen({ activeTab, onTabChange, onCategorySelect }: HomeScreenProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const verse = todayVerse()

  const q = query.trim()
  const filteredCategories = q
    ? categories.filter((c) => c.title.includes(q) || c.subtitle.includes(q))
    : categories

  const searchResults = q
    ? categories.flatMap((c) =>
        c.sections
          .filter((s) => s.title.includes(q))
          .slice(0, 3)
          .map((s) => ({ category: c.id, categoryTitle: c.title, section: s })),
      )
    : []

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col screen-enter"
    >
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{ background: 'linear-gradient(to bottom, #060b21, transparent)' }}
      >
        <Logo size={40} withText />
        <button
          onClick={() => setSearchOpen((v) => !v)}
          aria-label="بحث"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          style={{
            background: searchOpen ? '#c9a227' : 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(201,162,39,0.25)',
          }}
        >
          {searchOpen ? <IconClose size={18} color="#080d28" /> : <IconSearch size={18} color="#c9a227" />}
        </button>
      </header>

      {/* Search panel */}
      {searchOpen && (
        <div className="px-4 pb-3 animate-[fadeIn_.25s_ease-out]">
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(201,162,39,0.3)',
            }}
          >
            <IconSearch size={18} color="rgba(255,255,255,0.5)" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن تسبحة أو لحن…"
              className="flex-1 bg-transparent outline-none"
              style={{ color: 'white', fontSize: 15, fontFamily: 'Cairo, sans-serif' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>
                ✕
              </button>
            )}
          </div>

          {searchResults.length > 0 && (
            <div className="mt-2 space-y-1.5 max-h-52 overflow-y-auto">
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => onCategorySelect(r.category)}
                  className="w-full rounded-xl px-3 py-2.5 flex items-center justify-between text-right transition-all hover:brightness-125"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div>
                    <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{r.section.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{r.categoryTitle}</p>
                  </div>
                  <IconChevronLeft size={16} color="#c9a227" />
                </button>
              ))}
            </div>
          )}
          {q && filteredCategories.length === 0 && searchResults.length === 0 && (
            <p className="text-center mt-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
              لا توجد نتائج لـ «{q}»
            </p>
          )}
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Banner */}
        <div className="mx-4 mb-5 rounded-2xl overflow-hidden relative" style={{ height: '190px' }}>
          <img src={heroImg} alt="إيفنوتي 99" className="w-full h-full object-cover object-center" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(8,13,40,0.78) 30%, rgba(8,13,40,0.15) 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: 500 }}>مرحباً بك في</p>
            <h2
              style={{
                color: '#c9a227',
                fontSize: '27px',
                fontWeight: 800,
                lineHeight: 1.2,
                textShadow: '0 2px 8px rgba(0,0,0,0.55)',
              }}
            >
              إيفنوتي 99
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '13px', marginTop: '4px' }}>
              كنز الكنيسة القبطية .. في متناول يدك
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onCategorySelect('annual')}
                className="rounded-full px-4 py-1.5 transition-all active:scale-95"
                style={{ background: '#c9a227', color: '#080d28', fontSize: 12, fontWeight: 700 }}
              >
                ابدأ التسبحة
              </button>
              <button
                onClick={() => onCategorySelect('kiahk')}
                className="rounded-full px-4 py-1.5 transition-all active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  fontSize: 12,
                  fontWeight: 600,
                  backdropFilter: 'blur(6px)',
                }}
              >
                الكيهك
              </button>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <div className="px-4 mb-3 flex items-center justify-between">
          <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>أقسام التسبحة</h3>
          <div className="flex items-center gap-2">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(to left, rgba(201,162,39,.6), transparent)' }} />
            <IconCopticCrossOrnate size={14} color="#c9a227" />
            <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, rgba(201,162,39,.6), transparent)' }} />
          </div>
        </div>

        {/* Category Grid */}
        <div className="px-4 grid grid-cols-2 gap-3 mb-5">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`rounded-2xl p-4 text-right transition-all active:scale-95 hover:brightness-110 ${
                cat.id === 'evening-order' ? 'col-span-2' : ''
              }`}
              style={{
                background:
                  cat.id === 'evening-order'
                    ? 'linear-gradient(135deg, #2a2050 0%, #1a2368 55%, #0d1440 100%)'
                    : 'linear-gradient(135deg, #1a2368 0%, #111a52 60%, #0d1440 100%)',
                border:
                  cat.id === 'evening-order'
                    ? '1px solid rgba(201,162,39,0.45)'
                    : '1px solid rgba(201,162,39,0.18)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <div className={cat.id === 'evening-order' ? 'flex items-center gap-4' : ''}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3 flex-shrink-0"
                  style={{
                    background: 'rgba(201,162,39,0.12)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    marginBottom: cat.id === 'evening-order' ? 0 : 12,
                  }}
                >
                  {iconMap[cat.icon]}
                </div>
                <div className="flex items-start justify-between flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700, lineHeight: 1.3 }}>{cat.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '2px' }}>{cat.subtitle}</p>
                    <p style={{ color: 'rgba(201,162,39,0.7)', fontSize: '10px', marginTop: '4px', fontWeight: 600 }}>
                      {cat.sections.length > 0 ? `${cat.sections.length} قطع` : 'الترتيب الكامل + النصوص'}
                    </p>
                  </div>
                  <IconChevronLeft size={16} color="#c9a227" />
                </div>
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
          <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, lineHeight: 1.7 }}>{verse.text}</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{verse.ref}</p>
          <p style={{ color: 'rgba(201,162,39,0.6)', fontSize: 10, fontWeight: 600 }}>آية اليوم</p>
        </div>

        <div className="h-4" />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}
