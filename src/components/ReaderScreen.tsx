import type React from 'react'
import { useState } from 'react'
import heroImg from '../imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png'
import {
  IconChevronLeft,
  IconDots,
  IconBookmark,
  IconCopy,
  IconShare,
  IconMusic,
  IconPlayCircle,
  IconPrev,
  IconNext,
  IconTranslate,
  IconCopticCrossOrnate,
} from './icons'

type LanguageTab = 'arabic' | 'coptic' | 'melody'

interface ReaderScreenProps {
  onBack: () => void
  fontSize: number
  onFontSizeChange: (delta: number) => void
}

const hymnPages = [
  [
    'يا مريم',
    'يا ستّ الآبكار',
    'قد نلت تعظيم',
    'من نور الأنوار',
    'وهبت تعظيم',
    'من عنده قد صار',
    'وحملت الخالق',
    'من ذا لا يختار',
  ],
  [
    'يا بنت الملك',
    'مليئة الجمال',
    'نعمة الرب على شفتيك',
    'لذلك باركك الله',
    'إلى الأبد',
    'اسمعي يا ابنة',
    'وانظري وأميلي أذنك',
    'وانسي شعبك وبيت أبيك',
  ],
]

export default function ReaderScreen({ onBack, fontSize, onFontSizeChange }: ReaderScreenProps) {
  const [activeLang, setActiveLang] = useState<LanguageTab>('arabic')
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalPages = 12

  const displayText = hymnPages[currentPage % hymnPages.length]

  return (
    <div
      dir="rtl"
      style={{ fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,13,40,0.78) 0%, rgba(8,13,40,0.88) 60%, rgba(8,13,40,0.97) 100%)' }}
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 pt-5 pb-3">
          <button onClick={onBack} className="p-1 transition-opacity hover:opacity-70">
            <IconChevronLeft size={26} color="white" />
          </button>

          <div className="flex-1 flex flex-col items-center px-2">
            <h1 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, lineHeight: 1.2 }}>
              تسبحة العذراء
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>القطعة الأولى</p>
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
            <button className="p-1 transition-opacity hover:opacity-70">
              <IconDots size={20} color="rgba(255,255,255,0.7)" />
            </button>
          </div>
        </header>

        {/* Cross ornament */}
        <div className="flex justify-center py-2">
          <div className="flex items-center gap-2">
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, rgba(201,162,39,0.6), transparent)' }} />
            <IconCopticCrossOrnate size={22} color="#c9a227" />
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, rgba(201,162,39,0.6), transparent)' }} />
          </div>
        </div>

        {/* Language badge */}
        <div className="flex justify-center mb-3">
          <button
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all"
            style={{
              border: '1px solid rgba(201,162,39,0.5)',
              background: 'rgba(201,162,39,0.08)',
            }}
          >
            <span style={{ color: '#c9a227', fontSize: '13px', fontWeight: 600 }}>العربي</span>
            <IconTranslate size={15} color="#c9a227" />
          </button>
        </div>

        {/* Hymn text */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          <div className="text-center space-y-3 w-full">
            {displayText.map((line, i) => (
              <p
                key={i}
                style={{
                  color: '#ffffff',
                  fontSize: `${fontSize + 4}px`,
                  fontWeight: 700,
                  lineHeight: 1.65,
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  direction: activeLang === 'coptic' ? 'ltr' : 'rtl',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-4 pb-6 space-y-3">
          {/* Toolbar */}
          <div
            className="rounded-2xl px-4 py-3 flex items-center justify-around"
            style={{
              background: 'rgba(8,13,40,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <ReaderActionBtn
              icon={<IconBookmark size={22} color="rgba(255,255,255,0.75)" />}
              label="إضافة للمفضلة"
            />
            <ReaderActionBtn
              icon={<IconCopy size={22} color="rgba(255,255,255,0.75)" />}
              label="نسخ"
            />
            <ReaderActionBtn
              icon={<IconShare size={22} color="rgba(255,255,255,0.75)" />}
              label="مشاركة"
            />
            <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.15)' }} />
            <button
              onClick={() => onFontSizeChange(-2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 700 }}
            >
              A−
            </button>
            <button
              onClick={() => onFontSizeChange(2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '18px', fontWeight: 700 }}
            >
              A+
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600 }}>
              {currentPage + 1} / {totalPages}
            </span>
            <div className="flex-1 relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all"
                style={{
                  background: '#c9a227',
                  width: `${((currentPage + 1) / totalPages) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Audio row */}
          <button
            className="w-full rounded-2xl px-4 py-3 flex items-center justify-between transition-all hover:brightness-110"
            style={{
              background: 'rgba(201,162,39,0.08)',
              border: '1px solid rgba(201,162,39,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(201,162,39,0.18)' }}
              >
                <IconMusic size={18} color="#c9a227" />
              </div>
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>قبطي معرب</span>
            </div>
            <div
              className="flex items-center gap-2"
              style={{ color: '#c9a227', fontSize: '13px', fontWeight: 600 }}
            >
              <span>›</span>
            </div>
          </button>

          {/* Player controls */}
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: 'rgba(8,13,40,0.75)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,162,39,0.15)' }}
            >
              <IconMusic size={17} color="#c9a227" />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>قبطي معرب</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', direction: 'ltr', textAlign: 'right' }}>
                ai mn li
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="transition-opacity hover:opacity-70"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              >
                <IconPrev size={22} color="rgba(255,255,255,0.7)" />
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)}>
                <IconPlayCircle size={40} color="#c9a227" />
              </button>
              <button
                className="transition-opacity hover:opacity-70"
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              >
                <IconNext size={22} color="rgba(255,255,255,0.7)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReaderActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70">
      {icon}
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>{label}</span>
    </button>
  )
}
