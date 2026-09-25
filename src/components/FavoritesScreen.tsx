/**
 * شاشة المفضلة — القطع المفضلة + الإشارات المرجعية المحفوظة
 */
import { useState } from 'react'
import { categories } from '../data'
import { actions, useAppStore } from '../store'
import BottomNav from './BottomNav'
import { IconBook, IconBookmarkFilled, IconChevronLeft, IconTrash } from './icons'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

interface FavoritesScreenProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onOpenSection: (categoryId: string, sectionId: string, page?: number) => void
}

export default function FavoritesScreen({ activeTab, onTabChange, onOpenSection }: FavoritesScreenProps) {
  const store = useAppStore()
  const [tab, setTab] = useState<'fav' | 'marks'>('fav')

  const favItems = store.favorites
    .map((id) => {
      for (const c of categories) {
        const s = c.sections.find((x) => x.id === id)
        if (s) return { cat: c, sec: s }
      }
      return null
    })
    .filter(Boolean) as {
    cat: (typeof categories)[number]
    sec: (typeof categories)[number]['sections'][number]
  }[]

  const markItems = store.bookmarks
    .map((b) => {
      for (const c of categories) {
        const s = c.sections.find((x) => x.id === b.sectionId)
        if (s) return { cat: c, sec: s, page: b.page, savedAt: b.savedAt }
      }
      return null
    })
    .filter(Boolean) as {
    cat: (typeof categories)[number]
    sec: (typeof categories)[number]['sections'][number]
    page: number
    savedAt: number
  }[]

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col screen-enter"
    >
      <header className="px-4 pt-5 pb-3">
        <h1 style={{ color: '#ffffff', fontSize: 20, fontWeight: 800 }}>المفضلة والإشارات</h1>
      </header>

      {/* tabs */}
      <div className="px-4 mb-4 flex gap-2">
        {[
          { id: 'fav' as const, label: `♥ المفضلة (${favItems.length})` },
          { id: 'marks' as const, label: `☆ الإشارات (${markItems.length})` },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 rounded-xl transition-all"
            style={{
              background: tab === t.id ? 'rgba(201,162,39,0.16)' : 'rgba(255,255,255,0.05)',
              border: tab === t.id ? '1px solid rgba(201,162,39,0.5)' : '1px solid rgba(255,255,255,0.08)',
              color: tab === t.id ? '#e0b84a' : 'rgba(255,255,255,0.55)',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-2">
        {tab === 'fav' &&
          (favItems.length === 0 ? (
            <Empty msg="لم تضف أي تسبحة للمفضلة بعد. اضغط ♥ في أي شاشة لإضافتها." />
          ) : (
            favItems.map(({ cat, sec }) => (
              <div
                key={sec.id}
                className="rounded-2xl p-3.5 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <button
                  onClick={() => onOpenSection(cat.id, sec.id)}
                  className="flex-1 flex items-center gap-3 text-right min-w-0"
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
                      {cat.title}
                    </p>
                  </div>
                  <IconChevronLeft size={16} color="#c9a227" />
                </button>
                <button
                  aria-label="إزالة من المفضلة"
                  onClick={() => actions.toggleFavorite(sec.id)}
                  className="p-1.5 transition-opacity hover:opacity-70"
                >
                  <IconTrash size={17} color="rgba(255,120,120,0.8)" />
                </button>
              </div>
            ))
          ))}

        {tab === 'marks' &&
          (markItems.length === 0 ? (
            <Empty msg="لا توجد إشارات مرجعية. احفظ صفحتك أثناء القراءة من زر ☆." />
          ) : (
            markItems.map((m) => (
              <button
                key={`${m.sec.id}-${m.page}`}
                onClick={() => onOpenSection(m.cat.id, m.sec.id, m.page)}
                className="w-full rounded-2xl p-3.5 flex items-center gap-3 text-right transition-all hover:brightness-110"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <IconBookmarkFilled size={20} />
                <div className="flex-1 min-w-0">
                  <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }} className="truncate">
                    {m.sec.title} — صفحة {m.page + 1}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }} className="truncate">
                    {m.cat.title} · {new Date(m.savedAt).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <IconChevronLeft size={16} color="#c9a227" />
              </button>
            ))
          ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

function Empty({ msg }: { msg: string }) {
  return (
    <div className="text-center py-16 px-6">
      <div className="text-4xl mb-3" style={{ opacity: 0.5 }}>
        ☦
      </div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.8 }}>{msg}</p>
    </div>
  )
}
