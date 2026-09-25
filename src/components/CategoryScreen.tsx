import type React from 'react'
import { useState } from 'react'
import {
  IconChevronLeft,
  IconHeart,
  IconSearch,
  IconBook,
  IconBookmark,
  IconCopy,
  IconShare,
  IconMusic,
  IconPlayCircle,
  IconPrev,
  IconNext,
  IconChevronRight,
} from './icons'

type LanguageTab = 'arabic' | 'coptic' | 'melody'

interface CategoryScreenProps {
  categoryTitle: string
  onBack: () => void
  onOpenReader: () => void
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

const copticPages = [
  ['ai mn li', 'tai sheri en ni parthenos', 'emshaï eroï', 'nai nan'],
  ['xe efesht mmoi', 'nten ni agios', 'nem Pchois'],
]

const categoryHymns = [
  { title: 'تسبحة العذراء', subtitle: 'القطعة الأولى', total: 12 },
  { title: 'تسبحة الملائكة', subtitle: 'القطعة الثانية', total: 12 },
  { title: 'المزمور الفصلي', subtitle: 'القطعة الثالثة', total: 12 },
  { title: 'الإنجيل والتفسير', subtitle: 'القطعة الرابعة', total: 12 },
]

export default function CategoryScreen({
  categoryTitle,
  onBack,
  onOpenReader,
  fontSize,
  onFontSizeChange,
}: CategoryScreenProps) {
  const [activeLang, setActiveLang] = useState<LanguageTab>('arabic')
  const [currentPage, setCurrentPage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const totalPages = 12

  const currentText = activeLang === 'arabic'
    ? hymnPages[currentPage % hymnPages.length]
    : activeLang === 'coptic'
    ? copticPages[currentPage % copticPages.length]
    : hymnPages[currentPage % hymnPages.length]

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col"
    >
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-4 pt-4 pb-3"
        style={{
          background: 'linear-gradient(to bottom, #060b21, var(--color-bg))',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <button onClick={onBack} className="p-1 transition-opacity hover:opacity-70">
          <IconChevronLeft size={26} color="white" />
        </button>
        <h1 style={{ color: '#ffffff', fontSize: '17px', fontWeight: 700 }}>{categoryTitle}</h1>
        <div className="flex items-center gap-3">
          <button className="p-1 transition-opacity hover:opacity-70">
            <IconHeart size={22} color="rgba(255,255,255,0.7)" />
          </button>
          <button className="p-1 transition-opacity hover:opacity-70">
            <IconSearch size={20} color="rgba(255,255,255,0.7)" />
          </button>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4">
        {/* Hymn selector card */}
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
            <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700 }}>تسبحة العذراء</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>القطعة الأولى</p>
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
          {([
            { id: 'arabic', label: 'العربي' },
            { id: 'coptic', label: 'قبطي معرب' },
            { id: 'melody', label: 'اللحن بالهزات' },
          ] as { id: LanguageTab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLang(tab.id)}
              className="flex-1 py-2 rounded-xl text-center transition-all"
              style={{
                background: activeLang === tab.id ? '#c9a227' : 'rgba(255,255,255,0.07)',
                color: activeLang === tab.id ? '#080d28' : 'rgba(255,255,255,0.6)',
                fontSize: '12px',
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
          className="rounded-2xl p-5 flex-1"
          style={{
            background: 'linear-gradient(160deg, #131c52, #0d1440)',
            border: '1px solid rgba(255,255,255,0.07)',
            minHeight: '220px',
          }}
        >
          {/* Language label */}
          <div className="flex items-center gap-1.5 justify-end mb-4">
            <span style={{ color: '#c9a227', fontSize: '12px', fontWeight: 600 }}>
              {activeLang === 'arabic' ? 'العربي' : activeLang === 'coptic' ? 'قبطي معرب' : 'اللحن'}
            </span>
            <div
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}
            >
              <span style={{ color: '#c9a227', fontSize: '11px', fontWeight: 700 }}>T</span>
            </div>
          </div>

          {/* Text */}
          <div className="text-center space-y-2">
            {currentText.map((line, i) => (
              <p
                key={i}
                style={{
                  color: '#ffffff',
                  fontSize: `${fontSize}px`,
                  fontWeight: activeLang === 'coptic' ? 400 : 600,
                  lineHeight: 1.7,
                  direction: activeLang === 'coptic' ? 'ltr' : 'rtl',
                  fontStyle: activeLang === 'coptic' ? 'italic' : 'normal',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom toolbar */}
        <div
          className="rounded-2xl p-3 flex items-center justify-around"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Font size */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFontSizeChange(-2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 700 }}
            >
              A−
            </button>
            <button
              onClick={() => onFontSizeChange(2)}
              className="transition-opacity hover:opacity-70"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', fontWeight: 700 }}
            >
              A+
            </button>
          </div>
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.15)' }} />
          <ActionBtn icon={<IconBookmark size={20} color="rgba(255,255,255,0.7)" />} label="إضافة للمفضلة" />
          <ActionBtn icon={<IconCopy size={20} color="rgba(255,255,255,0.7)" />} label="نسخ" />
          <ActionBtn icon={<IconShare size={20} color="rgba(255,255,255,0.7)" />} label="مشاركة" />
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 600 }}>
            {currentPage + 1} / {totalPages}
          </span>
          <div className="flex-1 relative h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <div
              className="absolute top-0 right-0 h-full rounded-full transition-all"
              style={{
                background: '#c9a227',
                width: `${((currentPage + 1) / totalPages) * 100}%`,
                right: 'auto',
                left: 0,
              }}
            />
          </div>
        </div>

        {/* Audio rows */}
        <div className="space-y-2">
          <button
            onClick={onOpenReader}
            className="w-full rounded-2xl p-3.5 flex items-center justify-between transition-all hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, #1a2368, #0d1440)',
              border: '1px solid rgba(201,162,39,0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(201,162,39,0.15)' }}
              >
                <IconMusic size={20} color="#c9a227" />
              </div>
              <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600 }}>قبطي معرب</span>
            </div>
            <IconChevronRight size={18} color="#c9a227" />
          </button>

          {/* Player bar */}
          <div
            className="rounded-2xl p-3 flex items-center gap-3"
            style={{
              background: 'rgba(201,162,39,0.08)',
              border: '1px solid rgba(201,162,39,0.2)',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,162,39,0.15)' }}
            >
              <IconMusic size={18} color="#c9a227" />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>الحن بالهزات</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>يا مريم</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="transition-opacity hover:opacity-70"
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              >
                <IconPrev size={22} color="rgba(255,255,255,0.7)" />
              </button>
              <button onClick={() => setIsPlaying(!isPlaying)}>
                <IconPlayCircle size={38} color="#c9a227" />
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

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 transition-opacity hover:opacity-70">
      {icon}
      <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '10px' }}>{label}</span>
    </button>
  )
}
