/**
 * قارئ قطع ترتيب العشية — EveningHymnReader
 * شاشة قراءة كاملة للنص مع اللحن والملاحظة الروحية ومشغل محاكى
 */
import { useEffect, useRef, useState } from 'react'
import { findHymn, sectionKindColors, sectionKindLabels } from '../data'
import { actions, useAppStore } from '../store'
import {
  IconChevronRight,
  IconHeart,
  IconHeartFilled,
  IconCopy,
  IconShare,
  IconPlay,
  IconPause,
  IconCopticCrossOrnate,
  IconCheck,
} from './icons'

interface Props {
  hymnId: string
  onBack: () => void
}

const kindEmoji: Record<string, string> = {
  psalm: '🎼',
  prostration: '🙇',
  theotokia: '🌹',
  hosu: '🎵',
  conclusion: '✝️',
  general: '✦',
}

export default function EveningHymnReader({ hymnId, onBack }: Props) {
  const store = useAppStore()
  const hymn = findHymn(hymnId)
  const fontSize = store.settings.fontSize
  const isFav = store.favorites.includes(hymnId)

  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const duration = 95

  useEffect(() => {
    if (!hymn) return
    actions.addRecent(`evening:${hymn.id}`, "evening-order")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(() => setElapsed((e) => (e + 1 >= duration ? duration : e + 1)), 1000)
    return () => clearInterval(t)
  }, [isPlaying])

  const showToast = (msg: string) => {
    setToast(msg)
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 1800)
  }

  if (!hymn) {
    return (
      <div dir="rtl" className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--color-bg)' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>القطعة غير موجودة</p>
        <button onClick={onBack} style={{ color: '#c9a227', fontWeight: 700 }}>رجوع</button>
      </div>
    )
  }

  const accent = sectionKindColors[hymn.kind]
  const lines = hymn.pages[0]
  const fullText = `${hymn.name}\n\n${lines.join('\n')}`

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      showToast('تم نسخ النص ✓')
    } catch {
      showToast('تعذّر النسخ')
    }
  }

  const shareText = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: hymn.name, text: fullText })
        return
      } catch {
        /* cancelled */
      }
    }
    await copyText()
  }

  return (
    <div dir="rtl" className="min-h-screen flex flex-col screen-enter" style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3 sticky top-0 z-20"
        style={{
          background: 'linear-gradient(to bottom, #060b21, rgba(8,13,40,0.92))',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <button onClick={onBack} aria-label="رجوع" className="p-1 transition-opacity hover:opacity-70">
          <IconChevronRight size={26} color="white" />
        </button>
        <div className="text-center flex-1 min-w-0 px-2">
          <span
            className="rounded-full px-2.5 py-0.5 inline-block"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}66`, color: accent, fontSize: 10.5, fontWeight: 700 }}
          >
            {kindEmoji[hymn.kind]} {sectionKindLabels[hymn.kind]} · {hymn.dayLabel}
          </span>
          <h1 style={{ color: '#fff', fontSize: 14, fontWeight: 800, marginTop: 4 }} className="truncate">
            {hymn.name}
          </h1>
        </div>
        <button
          onClick={() => actions.toggleFavorite(hymn.id)}
          aria-label="المفضلة"
          className="p-1 transition-transform active:scale-90"
        >
          {isFav ? <IconHeartFilled size={22} /> : <IconHeart size={22} color="rgba(255,255,255,0.6)" />}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-40">
        {/* بطاقة اللحن والملاحظة */}
        <div className="space-y-2 mb-4">
          {hymn.melody && (
            <div
              className="rounded-xl px-3.5 py-2.5 flex items-start gap-2"
              style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.3)' }}
            >
              <IconPlay size={15} color="#c9a227" />
              <p style={{ color: '#dcc06a', fontSize: 12.5, lineHeight: 1.7 }}>{hymn.melody.replace('🎵 ', '')}</p>
            </div>
          )}
          {hymn.note && (
            <div
              className="rounded-xl px-3.5 py-2.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12.5, lineHeight: 1.8 }}>{hymn.note.replace('💡 ', '')}</p>
            </div>
          )}
        </div>

        {/* النص */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #131c52, #0d1440)',
            border: `1px solid ${accent}44`,
            boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: 46, height: 1, background: `linear-gradient(to left, ${accent}99, transparent)` }} />
            <IconCopticCrossOrnate size={20} color={accent} />
            <div style={{ width: 46, height: 1, background: `linear-gradient(to right, ${accent}99, transparent)` }} />
          </div>
          <div className="space-y-3">
            {lines.map((line, i) => (
              <p
                key={i}
                className="animate-[fadeUp_.35s_ease-out_both]"
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: fontSize,
                  lineHeight: 2,
                  textAlign: 'center',
                  animationDelay: `${Math.min(i * 0.04, 0.4)}s`,
                }}
              >
                <span style={{ color: `${accent}`, fontSize: Math.max(10, fontSize - 8), marginLeft: 6 }}>{i + 1}.</span>
                {line}
              </p>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div style={{ width: 46, height: 1, background: `linear-gradient(to left, ${accent}99, transparent)` }} />
            <span style={{ color: accent, fontSize: 14 }}>✦</span>
            <div style={{ width: 46, height: 1, background: `linear-gradient(to right, ${accent}99, transparent)` }} />
          </div>
        </div>

        {/* أزرار الإجراءات */}
        <div className="flex justify-center gap-8 mt-5">
          <ActionBtn icon={<IconCopy size={20} color="rgba(255,255,255,0.6)" />} label="نسخ" onClick={copyText} />
          <ActionBtn icon={<IconShare size={20} color="rgba(255,255,255,0.6)" />} label="مشاركة" onClick={shareText} />
          <ActionBtn
            icon={isFav ? <IconHeartFilled size={20} /> : <IconHeart size={20} color="rgba(255,255,255,0.6)" />}
            label="المفضلة"
            onClick={() => actions.toggleFavorite(hymn.id)}
          />
        </div>
      </div>

      {/* Player bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-3"
        style={{ background: 'linear-gradient(to top, #060b21ee, #060b21cc)', borderTop: '1px solid rgba(201,162,39,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying((v) => !v)}
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
            style={{ background: '#c9a227', boxShadow: '0 0 16px rgba(201,162,39,0.4)' }}
            aria-label={isPlaying ? 'إيقاف' : 'تشغيل'}
          >
            {isPlaying ? <IconPause size={22} /> : <IconPlay size={22} />}
          </button>
          <div className="flex-1 min-w-0">
            <p style={{ color: 'white', fontSize: 12, fontWeight: 700 }} className="truncate">
              {hymn.name}
            </p>
            <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(elapsed / duration) * 100}%`, background: 'linear-gradient(to left, #c9a227, #e0b84a)', transition: 'width .5s linear' }}
              />
            </div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
            {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}
          </span>
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

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 transition-transform hover:opacity-80 active:scale-90">
      {icon}
      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10 }}>{label}</span>
    </button>
  )
}
