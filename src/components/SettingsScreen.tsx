/**
 * شاشة الإعدادات — حجم الخط، السمة، الإبقاء على الشاشة، إعادة الضبط، حول التطبيق
 */
import type React from 'react'
import { useState } from 'react'
import { actions, useAppStore } from '../store'
import BottomNav from './BottomNav'
import Logo, { LogoMark } from './Logo'
import { IconMoon, IconSun, IconCheck, IconInfoSmall } from './icons'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

interface SettingsScreenProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function SettingsScreen({ activeTab, onTabChange }: SettingsScreenProps) {
  const store = useAppStore()
  const [confirmReset, setConfirmReset] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const notify = (m: string) => {
    setToast(m)
    setTimeout(() => setToast(null), 1600)
  }

  return (
    <div
      dir="rtl"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
      className="min-h-screen flex flex-col screen-enter"
    >
      <header className="px-4 pt-5 pb-3">
        <h1 style={{ color: '#ffffff', fontSize: 20, fontWeight: 800 }}>الإعدادات</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-4">
        {/* Reading */}
        <Card title="القراءة">
          <div className="flex items-center justify-between py-2">
            <div>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>حجم الخط</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>حاليًا: {store.settings.fontSize}px</p>
            </div>
            <div className="flex items-center gap-3">
              <CircleBtn onClick={() => actions.changeFontSize(-2)} label="A−" />
              <input
                type="range"
                min={14}
                max={34}
                step={1}
                value={store.settings.fontSize}
                onChange={(e) => actions.setSettings({ fontSize: Number(e.target.value) })}
                style={{ width: 110 }}
              />
              <CircleBtn onClick={() => actions.changeFontSize(2)} label="A+" big />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-between py-2">
            <div>
              <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>سمة العرض</p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>ليلي داكن أو ورقي دافئ</p>
            </div>
            <div className="flex gap-2">
              <ThemeBtn
                active={store.settings.theme === 'dark'}
                onClick={() => actions.setSettings({ theme: 'dark' })}
                icon={<IconMoon size={16} color="currentColor" />}
                label="ليلي"
              />
              <ThemeBtn
                active={store.settings.theme === 'sepia'}
                onClick={() => actions.setSettings({ theme: 'sepia' })}
                icon={<IconSun size={16} color="currentColor" />}
                label="ورقي"
              />
            </div>
          </div>
          <Divider />
          <ToggleRow
            title="إظهار النص القبطي افتراضياً"
            desc="فتح الصفحات على تبويب الحروف القبطية"
            value={store.settings.showCopticByDefault}
            onChange={(v) => actions.setSettings({ showCopticByDefault: v })}
          />
          <Divider />
          <ToggleRow
            title="إبقاء الشاشة مضاءة أثناء القراءة"
            desc="يمنع إيقاف الشاشة أثناء التسبيح"
            value={store.settings.keepScreenOn}
            onChange={(v) => {
              actions.setSettings({ keepScreenOn: v })
              notify(v ? 'سيتم إبقاء الشاشة مضاءة' : 'استُرجعت إعدادات الشاشة')
            }}
          />
        </Card>

        {/* Data */}
        <Card title="البيانات">
          <div className="py-1">
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              المفضلة: {store.favorites.length} · الإشارات: {store.bookmarks.length} · آخر قراءة: {store.recent.length}
            </p>
          </div>
          <Divider />
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full rounded-xl py-2.5 transition-all active:scale-95"
              style={{
                background: 'rgba(200,60,60,0.12)',
                border: '1px solid rgba(200,60,60,0.35)',
                color: '#ff9a9a',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              مسح كل البيانات وإعادة الضبط
            </button>
          ) : (
            <div
              className="rounded-xl p-3"
              style={{ background: 'rgba(200,60,60,0.1)', border: '1px solid rgba(200,60,60,0.35)' }}
            >
              <p style={{ color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                هل أنت متأكد؟ سيتم حذف المفضلة والإشارات والإعدادات.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    actions.resetAll()
                    setConfirmReset(false)
                    notify('تمت إعادة ضبط التطبيق ✓')
                  }}
                  className="flex-1 rounded-lg py-2"
                  style={{ background: '#c0392b', color: 'white', fontSize: 13, fontWeight: 700 }}
                >
                  نعم، امسح
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 rounded-lg py-2"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* About */}
        <Card title="حول التطبيق">
          <div className="flex items-center gap-4 py-2">
            <LogoMark size={64} glow />
            <div>
              <p style={{ color: '#e0b84a', fontSize: 17, fontWeight: 800 }}>إيفنوتي 99</p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 2 }}>
                تطبيق التسبحة القبطية — عربي وقبطي ولحن
              </p>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 2 }}>الإصدار ١٫٠٫٠</p>
            </div>
          </div>
          <Divider />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12.5, lineHeight: 1.9 }}>
            «إيفنوتي» كلمة قبطية تعني <b style={{ color: '#e0b84a' }}>«ليتنا نسبح الرب»</b>. يجمع هذا التطبيق
            تسابيح الكنيسة القبطية الأرثوذكسية — السنوية والكيهكية والأعياد والأصوام والإبصلمودية والألحان —
            بنصوص عربية وحروف قبطية وخط اللحن، مع مشغل صوتي ومفضلة وإشارات مرجعية تعمل بدون إنترنت.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <IconInfoSmall size={14} color="rgba(201,162,39,0.7)" />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
              للتقديم والصيانة: فريق كورال الكنيسة — Soli Deo Gloria
            </p>
          </div>
        </Card>
      </div>

      {toast && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-2.5 flex items-center gap-2 animate-[fadeUp_.3s_ease-out]"
          style={{ background: 'rgba(19,28,82,0.95)', border: '1px solid rgba(201,162,39,0.5)' }}
        >
          <IconCheck size={16} color="#c9a227" />
          <span style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{toast}</span>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-20">
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <h3 style={{ color: '#c9a227', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
      {children}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '6px 0' }} />
}

function CircleBtn({ onClick, label, big }: { onClick: () => void; label: string; big?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90"
      style={{
        background: 'rgba(201,162,39,0.15)',
        border: '1px solid rgba(201,162,39,0.4)',
        color: '#e0b84a',
        fontSize: big ? 16 : 13,
        fontWeight: 700,
      }}
    >
      {label}
    </button>
  )
}

function ThemeBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg px-3 py-2 flex items-center gap-1.5 transition-all"
      style={{
        background: active ? '#c9a227' : 'rgba(255,255,255,0.06)',
        color: active ? '#080d28' : 'rgba(255,255,255,0.6)',
        fontSize: 12,
        fontWeight: 700,
        border: active ? 'none' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {icon} {label}
    </button>
  )
}

function ToggleRow({
  title,
  desc,
  value,
  onChange,
}: {
  title: string
  desc: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div>
        <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>{title}</p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className="w-12 h-7 rounded-full relative transition-colors"
        style={{ background: value ? '#c9a227' : 'rgba(255,255,255,0.15)' }}
      >
        <span
          className="absolute top-1 w-5 h-5 rounded-full transition-all"
          style={{ background: 'white', right: value ? 4 : 24, boxShadow: '0 1px 4px rgba(0,0,0,.4)' }}
        />
      </button>
    </div>
  )
}
