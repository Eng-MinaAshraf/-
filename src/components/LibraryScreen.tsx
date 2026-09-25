/**
 * شاشة المكتبة — كل الأقسام مع البحث والفلترة وآخر ما تمت قراءته
 */
import { useState } from 'react'
import { categories } from '../data'
import { useAppStore } from '../store'
import BottomNav from './BottomNav'
import Logo from './Logo'
import { IconChevronLeft, IconSearch, IconBook, IconHistory, IconHeart, IconHeartFilled } from './icons'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

interface LibraryScreenProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onOpenSection: (categoryId: string, sectionId: string) => void
}

export default function LibraryScreen({ activeTab, onTabChange, onOpenSection }: LibraryScreenProps) {
  const store = useAppStore()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const q = query.trim()
  const shownCategories = filter === 'all' ? categories : categories.filter((c) => c.id === filter)

  const allSections = shownCategories.flatMap((c) => c.sections.map((s) => ({ cat: c, sec: s })))
  const filtered = q ? allSections.filter((x) => x.sec.title.includes(q) || x.cat.title.includes(q)) : allSections

  const recents = store.recent
    .map((r) => {
      for (const c of categories) {
        const s = c.sections.find((x) => x.id === r.sectionId)
        if (s) return { category: c, section: s, at: r.at }
      }
      return null
    })
    .filter(Boolean) as {
    category: (typeof categories)[number]
    section: (typeof categories)[number]['sections'][number]
    at: number
  }[]

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col screen-enter"
    >
      <header className="px-4 pt-4 pb-3 flex items-center justify-between">
        <Logo size={36} withText />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-28">
        {/* Search */}
        <div
          className="rounded-2xl px-4 py-3 flex items-center gap-2 mb-3"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.25)' }}
        >
          <IconSearch size={18} color="rgba(255,255,255,0.5)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في كل التسابيح…"
            className="flex-1 bg-transparent outline-none"
            style={{ color: 'white', fontSize: 14 }}
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth: 'none' }}>
          <Chip active={filter === 'all'} onClick={() => setFilter('all')} label="الكل" />
          {categories.map((c) => (
            <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} label={c.title} />
          ))}
        </div>

        {/* Recently read */}
        {!q && recents.length > 0 && (
          <>
            <h3 className="flex items-center gap-2 mb-2 mt-1" style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>
              <IconHistory size={17} color="#c9a227" /> آخر ما قرأت
            </h3>
            <div className="flex gap-2.5 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
              {recents.slice(0, 6).map((r) => (
                <button
                  key={r.section.id}
                  onClick={() => onOpenSection(r.category.id, r.section.id)}
                  className="flex-shrink-0 rounded-xl px-3.5 py-3 text-right transition-all active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg,#1a2368,#0d1440)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    minWidth: 150,
                  }}
                >
                  <p style={{ color: '#e0b84a', fontSize: 13, fontWeight: 700 }} className="truncate">
                    {r.section.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 2 }} className="truncate">
                    {r.category.title}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* All sections */}
        <h3 className="mb-2" style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>
          {q ? `نتائج البحث (${filtered.length})` : 'جميع القطع'}
        </h3>
        <div className="space-y-2">
          {filtered.map(({ cat, sec }) => {
            const fav = store.favorites.includes(sec.id)
            return (
              <button
                key={`${cat.id}-${sec.id}`}
                onClick={() => onOpenSection(cat.id, sec.id)}
                className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-right transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,162,39,0.12)', border: '1px solid rgba(201,162,39,0.25)' }}
                >
                  <IconBook size={20} color="#c9a227" />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }} className="truncate">
                    {sec.title}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }} className="truncate">
                    {cat.title} · {sec.totalPieces} صفحة
                  </p>
                </div>
                {fav ? <IconHeartFilled size={18} /> : <span />}
                <IconChevronLeft size={16} color="#c9a227" />
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-10">
              <IconHeart size={36} color="rgba(255,255,255,0.2)" />
              <p className="mt-3" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                لا توجد قطع مطابقة
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 rounded-full px-3.5 py-1.5 transition-all"
      style={{
        background: active ? '#c9a227' : 'rgba(255,255,255,0.06)',
        color: active ? '#080d28' : 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {label}
    </button>
  )
}
