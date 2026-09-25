/**
 * شاشة التصنيف — قائمة القطع + نص التسبحة + مشغل صوتي محاكى
 */
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { categories, getHymnLines, type LangKey } from '../data'
import { actions, useAppStore } from '../store'
import {
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconHeartFilled,
  IconBook,
  IconBookmark,
  IconBookmarkFilled,
  IconCopy,
  IconShare,
  IconMusic,
  IconPlay,
  IconPause,
  IconPrev,
  IconNext,
  IconCheck,
} from './icons'

interface CategoryScreenProps {
  categoryId: string
  onBack: () => void
  onOpenReader: (sectionId: string, page: number) => void
}

const langTabs: { id: LangKey; label: string }[] = [
  { id: 'arabic', label: 'العربي' },
  { id: 'coptic', label: 'قبطي (حروف قبطية)' },
  { id: 'melody', label: 'اللحن بالهزات' },
]

export default function CategoryScreen({ categoryId, onBack, onOpenReader }: CategoryScreenProps) {
  const category =
    categories.find((c) => c.id === categoryId && c.sections.length > 0) ?? categories.find((c) => c.sections.length > 0)!
  const store = useAppStore()

  const [selectedSectionId, setSelectedSectionId] = useState(category.sections[0].id)
  const [showList, setShowList] = useState(true)
  const [activeLang, setActiveLang] = useState<LangKey>(
    store.settings.showCopticByDefault ? 'coptic' : 'arabic',
  )
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const section = category.sections.find((s) => s.id === selectedSectionId) ?? category.sections[0]
  const totalPages = section.totalPieces
  const fontSize = store.settings.fontSize
  const trackDuration = 95 // seconds (simulated)

  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= trackDuration) {
          setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
          return 0
        }
        return e + 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [isPlaying, totalPages])

  const showToast = (msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1800)
  }

  const lines = getHymnLines(activeLang, currentPage)
  const isFav = store.favorites.includes(section.id)
  const isMarked = actions.isBookmarked(section.id, currentPage)

  const changeFont = (d: number) => {
    actions.changeFontSize(d)
  }

  const copyText = async () => {
    const text = getHymnLines('arabic', currentPage).join('\n')
    try {
      await navigator.clipboard.writeText(`${section.title}\n\n${text}`)
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
      showToast('انسخ النص ثم شاركه')
    }
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col screen-enter"
    >
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{
          background: 'linear-gradient(to bottom, #060b21, var(--color-bg))',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button onClick={onBack} aria-label="رجوع" className="p-1 transition-opacity hover:opacity-70">
          <IconChevronRight size={26} color="white" />
        </button>
        <h1 style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700 }}>{category.title}</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowList((v) => !v)}
            className="p-1 transition-opacity hover:opacity-70"
            aria-label="قائمة القطع"
          >
            <IconBook size={22} color={showList ? '#c9a227' : 'rgba(255,255,255,0.7)'} />
          </button>
          <button
            onClick={() => {
              actions.toggleFavorite(section.id)
              showToast(isFav ? 'أُزيلت من المفضلة' : 'أُضيفت إلى المفضلة ♥')
            }}
            className="p-1 transition-transform active:scale-90"
            aria-label="المفضلة"
          >
            {isFav ? <IconHeartFilled size={22} /> : <IconHeart size={22} color="rgba(255,255,255,0.7)" />}
          </button>
        </div>
      </header>

      {/* Sections list */}
      {showList && (
        <div className="px-4 pt-3 animate-[fadeIn_.25s_ease-out]">
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {category.sections.map((s, i) => {
              const active = s.id === selectedSectionId
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSectionId(s.id)
                    setCurrentPage(0)
                    setElapsed(0)
                  }}
                  className="flex-shrink-0 rounded-xl px-3.5 py-2 text-right transition-all active:scale-95"
                  style={{
                    background: active ? 'rgba(201,162,39,0.16)' : 'rgba(255,255,255,0.05)',
                    border: active ? '1px solid rgba(201,162,39,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <p style={{ color: active ? '#e0b84a' : 'white', fontSize: 13, fontWeight: 700 }}>
                    {i + 1}. {s.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 2 }}>
                    {s.subtitle} · {s.totalPieces} صفحة
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pb-40 flex flex-col gap-4">
        {/* Selected hymn card */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3 mt-2"
          style={{
            background: 'linear-gradient(135deg, #1a2368, #0d1440)',
            border: '1px solid rgba(201,162,39,0.25)',
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.3)' }}
          >
            <IconBook size={24} color="#c9a227" />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700 }}>{section.title}</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>{section.subtitle}</p>
          </div>
          <span
            className="rounded-full px-3 py-1 flex-shrink-0"
            style={{
              background: 'rgba(201,162,39,0.15)',
              border: '1px solid rgba(201,162,39,0.4)',
              color: '#c9a227',
              fontSize: '12px',
              fontWeight: 700,
            }}
          >
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* Language tabs */}
        <div className="flex gap-2">
          {langTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLang(tab.id)}
              className="flex-1 py-2 rounded-xl text-center transition-all"
              style={{
                background: activeLang === tab.id ? '#c9a227' : 'rgba(255,255,255,0.07)',
                color: activeLang === tab.id ? '#080d28' : 'rgba(255,255,255,0.6)',
                fontSize: '11.5px',
                fontWeight: activeLang === tab.id ? 700 : 500,
                border: activeLang === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hymn text panel */}
        <div
          className="rounded-2xl p-5 cursor-pointer"
          onClick={() => onOpenReader(section.id, currentPage)}
          title="اضغط للوضع الكامل"
          style={{
            background: 'linear-gradient(160deg, #131c52, #0d1440)',
            border: '1px solid rgba(255,255,255,0.07)',
            minHeight: '220px',
          }}
        >
          <div className="flex items-center gap-1.5 justify-end mb-4">
            <span style={{ color: '#c9a227', fontSize: '12px', fontWeight: 600 }}>
              {langTabs.find((t) => t.id === activeLang)?.label}
            </span>
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}
            >
              <span style={{ color: '#c9a227', fontSize: '11px', fontWeight: 700 }}>T</span>
            </div>
          </div>
          <div className="text-center space-y-2">
            {lines.map((line, i) => (
              <p
                key={i}
                style={{
                  color: '#ffffff',
                  fontSize: `${fontSize}px`,
                  fontWeight: activeLang === 'arabic' ? 600 : 400,
                  lineHeight: 1.7,
                  direction: activeLang === 'arabic' ? 'rtl' : 'ltr',
                  fontStyle: activeLang === 'coptic' ? 'italic' : 'normal',
                }}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="text-center mt-4" style={{ color: 'rgba(201,162,39,0.55)', fontSize: 11 }}>
            ⤢ اضغط للقراءة بوضع الشاشة الكاملة
          </p>
        </div>

        {/* Bottom toolbar */}
        <div
          className="rounded-2xl p-3 flex items-center justify-around"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeFont(-2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 700 }}
            >
              A−
            </button>
            <button
              onClick={() => changeFont(2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 700 }}
            >
              A+
            </button>
          </div>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
          <ActionBtn
            icon={
              isMarked ? (
                <IconBookmarkFilled size={20} />
              ) : (
                <IconBookmark size={20} color="rgba(255,255,255,0.7)" />
              )
            }
            label="إشارة"
            onClick={() => {
              actions.toggleBookmark(section.id, currentPage)
              showToast(isMarked ? 'أُزيلت الإشارة' : 'تم حفظ إشارة الصفحة ✓')
            }}
          />
          <ActionBtn icon={<IconCopy size={20} color="rgba(255,255,255,0.7)" />} label="نسخ" onClick={copyText} />
          <ActionBtn icon={<IconShare size={20} color="rgba(255,255,255,0.7)" />} label="مشاركة" onClick={shareText} />
        </div>

        {/* Page navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'white', fontSize: 13, fontWeight: 600 }}
          >
            <IconChevronRight size={16} color="#c9a227" /> السابقة
          </button>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 600 }}>
            صفحة {currentPage + 1} من {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1}
            className="rounded-xl px-4 py-2 flex items-center gap-1.5 transition-all disabled:opacity-30"
            style={{ background: 'rgba(201,162,39,0.15)', color: '#e0b84a', fontSize: 13, fontWeight: 700 }}
          >
            التالية <IconChevronLeft size={16} color="#c9a227" />
          </button>
        </div>
      </div>

      {/* Fixed player at bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-3"
        style={{
          background: 'linear-gradient(to top, #06091e 60%, rgba(6,9,30,0.92) 90%, transparent)',
        }}
      >
        <div
          className="rounded-2xl p-3.5 mx-auto max-w-md"
          style={{
            background: 'rgba(19,28,82,0.85)',
            border: '1px solid rgba(201,162,39,0.25)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 -6px 30px rgba(0,0,0,0.45)',
          }}
        >
          {/* progress */}
          <div className="flex items-center gap-2 mb-2.5">
            <span dir="ltr" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, width: 32 }}>
              {fmt(elapsed)}
            </span>
            <div className="flex-1 relative h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${(elapsed / trackDuration) * 100}%`, background: '#c9a227' }}
              />
            </div>
            <span
              dir="ltr"
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, width: 32, textAlign: 'right' }}
            >
              {fmt(trackDuration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(201,162,39,0.25), rgba(201,162,39,0.1))',
                border: '1px solid rgba(201,162,39,0.35)',
              }}
            >
              {isPlaying ? (
                <div className="flex items-end gap-[3px] h-4">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="eq-bar" style={{ height: '100%', animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              ) : (
                <IconMusic size={18} color="#c9a227" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }} className="truncate">
                {section.title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }} className="truncate">
                {getHymnLines('arabic', currentPage)[0]} — صفحة {currentPage + 1}
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                aria-label="السابق"
                className="transition-opacity hover:opacity-70"
                onClick={() => {
                  setCurrentPage((p) => Math.max(0, p - 1))
                  setElapsed(0)
                }}
              >
                <IconPrev size={22} color="rgba(255,255,255,0.75)" />
              </button>
              <button
                aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
                onClick={() => setIsPlaying((v) => !v)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-90"
                style={{ background: '#c9a227', boxShadow: '0 0 16px rgba(201,162,39,0.4)' }}
              >
                {isPlaying ? <IconPause size={22} /> : <IconPlay size={22} />}
              </button>
              <button
                aria-label="التالي"
                className="transition-opacity hover:opacity-70"
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                  setElapsed(0)
                }}
              >
                <IconNext size={22} color="rgba(255,255,255,0.75)" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-2.5 flex items-center gap-2 animate-[fadeUp_.3s_ease-out]"
          style={{
            background: 'rgba(19,28,82,0.95)',
            border: '1px solid rgba(201,162,39,0.5)',
            boxShadow: '0 8px 24px rgba(0,0,0,.5)',
          }}
        >
          <IconCheck size={16} color="#c9a227" />
          <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{toast}</span>
        </div>
      )}
    </div>
  )
}

function ActionBtn({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 transition-transform hover:opacity-80 active:scale-90"
    >
      {icon}
      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px' }}>{label}</span>
    </button>
  )
}
