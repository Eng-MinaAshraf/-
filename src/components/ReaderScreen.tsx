/**
 * شاشة القراءة بوضع الشاشة الكاملة — Reader fullscreen mode
 */
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import heroImg from '../imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png'
import { categories, getHymnLines, type LangKey } from '../data'
import { actions, useAppStore } from '../store'
import {
  IconChevronRight,
  IconBookmark,
  IconBookmarkFilled,
  IconCopy,
  IconShare,
  IconMusic,
  IconPlay,
  IconPause,
  IconPrev,
  IconNext,
  IconCopticCrossOrnate,
  IconCheck,
} from './icons'

interface ReaderScreenProps {
  sectionId: string
  initialPage: number
  onBack: () => void
}

const langLabels: Record<LangKey, string> = {
  arabic: 'العربي',
  coptic: 'قبطي',
  melody: 'اللحن',
}

export default function ReaderScreen({ sectionId, initialPage, onBack }: ReaderScreenProps) {
  const store = useAppStore()
  const found = (() => {
    for (const c of categories) {
      const s = c.sections.find((x) => x.id === sectionId)
      if (s) return { category: c, section: s }
    }
    return { category: categories[0], section: categories[0].sections[0] }
  })()

  const [currentPage, setCurrentPage] = useState(initialPage)
  const [lang, setLang] = useState<LangKey>('arabic')
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const touchStartX = useRef<number | null>(null)

  const { section } = found
  const totalPages = section.totalPieces
  const fontSize = store.settings.fontSize
  const trackDuration = 95

  useEffect(() => {
    actions.addRecent(section.id, found.category.id)
  }, [section.id, found.category.id])

  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= trackDuration) {
          setCurrentPage((p) => (p < totalPages - 1 ? p + 1 : p))
          return 0
        }
        return e + 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isPlaying, totalPages])

  const showToast = (m: string) => {
    setToast(m)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1600)
  }

  const lines = getHymnLines(lang, currentPage)
  const isMarked = actions.isBookmarked(section.id, currentPage)
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(`${section.title}\n\n${getHymnLines('arabic', currentPage).join('\n')}`)
      showToast('تم نسخ النص ✓')
    } catch {
      showToast('تعذّر النسخ')
    }
  }

  const shareText = async () => {
    const text = getHymnLines('arabic', currentPage).join('\n')
    if (navigator.share) {
      try {
        await navigator.share({ title: `${section.title} — إيفنوتي 99`, text })
      } catch {
        /* cancelled */
      }
    } else {
      await copyText()
    }
  }

  // swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) {
      setCurrentPage((p) => Math.min(totalPages - 1, Math.max(0, p + (dx > 0 ? -1 : 1))))
      setElapsed(0)
    }
    touchStartX.current = null
  }

  return (
    <div
      dir="rtl"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col relative overflow-hidden screen-enter"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(8,13,40,0.8) 0%, rgba(8,13,40,0.9) 55%, rgba(8,13,40,0.98) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 pt-5 pb-3">
          <button onClick={onBack} aria-label="رجوع" className="p-1 transition-opacity hover:opacity-70">
            <IconChevronRight size={26} color="white" />
          </button>
          <div className="flex-1 flex flex-col items-center px-2">
            <h1 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700 }}>{section.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>{found.category.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-2.5 py-1"
              style={{
                background: 'rgba(201,162,39,0.15)',
                border: '1px solid rgba(201,162,39,0.35)',
                color: '#c9a227',
                fontSize: '12px',
                fontWeight: 700,
              }}
            >
              {currentPage + 1} / {totalPages}
            </span>
            <button className="p-1 transition-opacity hover:opacity-70" onClick={() => setMenuOpen((v) => !v)} aria-label="خيارات">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="5" r="1.8" fill="rgba(255,255,255,0.7)" />
                <circle cx="11" cy="11" r="1.8" fill="rgba(255,255,255,0.7)" />
                <circle cx="11" cy="17" r="1.8" fill="rgba(255,255,255,0.7)" />
              </svg>
            </button>
          </div>
        </header>

        {/* options menu */}
        {menuOpen && (
          <div className="absolute top-16 left-4 z-40 rounded-2xl overflow-hidden animate-[fadeIn_.2s_ease-out]"
            style={{ background: 'rgba(13,20,64,0.97)', border: '1px solid rgba(201,162,39,0.3)', minWidth: 210, boxShadow: '0 12px 32px rgba(0,0,0,.6)' }}>
            {(Object.keys(langLabels) as LangKey[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setLang(l)
                  setMenuOpen(false)
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-right transition-colors"
                style={{
                  background: lang === l ? 'rgba(201,162,39,0.12)' : 'transparent',
                  color: lang === l ? '#e0b84a' : 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                عرض بلغة: {langLabels[l]}
                {lang === l && <IconCheck size={16} color="#c9a227" />}
              </button>
            ))}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <button
              onClick={() => {
                actions.toggleBookmark(section.id, currentPage)
                showToast(isMarked ? 'أُزيلت الإشارة' : 'حُفظت إشارة الصفحة ✓')
                setMenuOpen(false)
              }}
              className="w-full px-4 py-3 text-right transition-colors"
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600 }}
            >
              {isMarked ? '✕ إزالة إشارة هذه الصفحة' : '☆ إضافة إشارة لهذه الصفحة'}
            </button>
          </div>
        )}

        {/* ornament */}
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-2">
            <div style={{ width: 40, height: 1, background: 'linear-gradient(to left, rgba(201,162,39,0.6), transparent)' }} />
            <IconCopticCrossOrnate size={22} color="#c9a227" />
            <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, rgba(201,162,39,0.6), transparent)' }} />
          </div>
        </div>

        {/* language pill */}
        <div className="flex justify-center mb-2 gap-2">
          {(Object.keys(langLabels) as LangKey[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="rounded-full px-3.5 py-1.5 transition-all"
              style={{
                border: `1px solid ${lang === l ? 'rgba(201,162,39,0.7)' : 'rgba(255,255,255,0.15)'}`,
                background: lang === l ? 'rgba(201,162,39,0.16)' : 'transparent',
                color: lang === l ? '#e0b84a' : 'rgba(255,255,255,0.55)',
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {langLabels[l]}
            </button>
          ))}
        </div>

        {/* Hymn text */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div key={`${lang}-${currentPage}`} className="text-center space-y-3 w-full animate-[fadeIn_.45s_ease-out]">
            {lines.map((line, i) => (
              <p
                key={i}
                style={{
                  color: '#ffffff',
                  fontSize: `${fontSize + 4}px`,
                  fontWeight: lang === 'arabic' ? 700 : 500,
                  lineHeight: 1.7,
                  textShadow: '0 2px 12px rgba(0,0,0,0.65)',
                  direction: lang === 'arabic' ? 'rtl' : 'ltr',
                  fontStyle: lang === 'coptic' ? 'italic' : 'normal',
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 14 }}>← اسحب لتغيير الصفحة →</p>
        </div>

        {/* Bottom */}
        <div className="px-4 pb-6 space-y-3">
          {/* toolbar */}
          <div
            className="rounded-2xl px-4 py-3 flex items-center justify-around"
            style={{
              background: 'rgba(8,13,40,0.72)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <ReaderActionBtn
              icon={isMarked ? <IconBookmarkFilled size={22} /> : <IconBookmark size={22} color="rgba(255,255,255,0.75)" />}
              label="إشارة"
              onClick={() => {
                actions.toggleBookmark(section.id, currentPage)
                showToast(isMarked ? 'أُزيلت الإشارة' : 'حُفظت الإشارة ✓')
              }}
            />
            <ReaderActionBtn
              icon={<IconCopy size={22} color="rgba(255,255,255,0.75)" />}
              label="نسخ"
              onClick={copyText}
            />
            <ReaderActionBtn
              icon={<IconShare size={22} color="rgba(255,255,255,0.75)" />}
              label="مشاركة"
              onClick={shareText}
            />
            <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.15)' }} />
            <button
              onClick={() => actions.changeFontSize(-2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 700 }}
            >
              A−
            </button>
            <button
              onClick={() => actions.changeFontSize(2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', fontWeight: 700 }}
            >
              A+
            </button>
          </div>

          {/* progress */}
          <div className="flex items-center gap-3">
            <span dir="ltr" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, width: 32 }}>{fmt(elapsed)}</span>
            <div className="flex-1 relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(elapsed / trackDuration) * 100}%`, background: '#c9a227' }}
              />
            </div>
            <span dir="ltr" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, width: 32, textAlign: 'right' }}>
              {fmt(trackDuration)}
            </span>
          </div>

          {/* player */}
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: 'rgba(8,13,40,0.75)',
              border: '1px solid rgba(201,162,39,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,162,39,0.15)' }}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[2.5px] h-3.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="eq-bar" style={{ height: '100%', animationDelay: `${i * 0.18}s` }} />
                  ))}
                </div>
              ) : (
                <IconMusic size={17} color="#c9a227" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>تسجيل اللحن</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }} className="truncate">
                {getHymnLines('coptic', currentPage)[0]}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                aria-label="السابق"
                className="transition-opacity hover:opacity-70 disabled:opacity-30"
                disabled={currentPage === 0}
                onClick={() => {
                  setCurrentPage((p) => Math.max(0, p - 1))
                  setElapsed(0)
                }}
              >
                <IconPrev size={22} color="rgba(255,255,255,0.7)" />
              </button>
              <button
                aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                onClick={() => setIsPlaying((v) => !v)}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ background: '#c9a227', boxShadow: '0 0 14px rgba(201,162,39,0.45)' }}
              >
                {isPlaying ? <IconPause size={20} /> : <IconPlay size={20} />}
              </button>
              <button
                aria-label="التالي"
                className="transition-opacity hover:opacity-70 disabled:opacity-30"
                disabled={currentPage >= totalPages - 1}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                  setElapsed(0)
                }}
              >
                <IconNext size={22} color="rgba(255,255,255,0.7)" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-2.5 flex items-center gap-2 animate-[fadeUp_.3s_ease-out]"
          style={{ background: 'rgba(19,28,82,0.95)', border: '1px solid rgba(201,162,39,0.5)', boxShadow: '0 8px 24px rgba(0,0,0,.5)' }}
        >
          <IconCheck size={16} color="#c9a227" />
          <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{toast}</span>
        </div>
      )}
    </div>
  )
}

function ReaderActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 transition-transform hover:opacity-80 active:scale-90">
      {icon}
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>{label}</span>
    </button>
  )
}
