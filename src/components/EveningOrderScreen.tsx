/**
 * ترتيب تسبحة عشية — الأيام السنوية (آدام / واطس)
 * شاشة احترافية تعرض الفلو الكامل: البداية ← المزامير ← نقطة التفرع ← الأيام ← الختام
 */
import { useState } from 'react'
import {
  adamHosu,
  eveningIntro,
  findHymn,
  psalm116Lines,
  psalms148to150,
  sectionKindColors,
  sectionKindLabels,
  watsHosu,
  type HosuSet,
  type SectionKind,
  type WeekDay,
} from '../data'
import { actions, useAppStore } from '../store'
import {
  IconChevronRight,
  IconHeart,
  IconHeartFilled,
  IconBook,
  IconMusic,
  IconCopticCrossOrnate,
  IconPlay,
} from './icons'

type Branch = 'intro' | 'adam' | 'wats'

interface Props {
  onBack: () => void
  onOpenHymn?: (hymnId: string) => void
}

const kindIcon: Record<string, string> = {
  psalm: '🎼',
  prostration: '🙇',
  theotokia: '🌹',
  hosu: '🎵',
  conclusion: '✝️',
}

export default function EveningOrderScreen({ onBack, onOpenHymn }: Props) {
  const store = useAppStore()
  const [branch, setBranch] = useState<Branch>('intro')
  const [openDayId, setOpenDayId] = useState<string | null>(null)
  const [openHymnId, setOpenHymnId] = useState<string | null>(null)

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col screen-enter"
      style={{ background: 'var(--color-bg)', fontFamily: 'Cairo, sans-serif' }}
    >
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
        <div className="text-center">
          <h1 style={{ color: '#fff', fontSize: 16, fontWeight: 800 }}>ترتيب تسبحة عشية</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>الأيام السنوية — الآدام والواطس</p>
        </div>
        <div className="w-8" />
      </header>

      <div className="flex-1 overflow-y-auto px-4 pb-16">
        {/* ===== البداية ===== */}
        <FlowNode
          emoji="✦"
          title="البداية"
          subtitle="مقدمة العشية (إبصلمودية) — تبدأ بتذكار اليوم ثم المزامير"
          tone="#c9a227"
        />
        <Connector />
        {eveningIntro.map((ps, i) => (
          <div key={ps.id}>
            <IntroCard section={ps} />
            {i < eveningIntro.length - 1 && <Connector />}
          </div>
        ))}

        <Connector />
        {/* ===== نقطة التفرع ===== */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,162,39,0.14), rgba(201,162,39,0.05))',
            border: '1px dashed rgba(201,162,39,0.5)',
          }}
        >
          <p style={{ color: '#e0b84a', fontWeight: 800, fontSize: 15 }}>🔀 نقطة التفرع</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>
            يتفرع الترتيب إلى مسارين حسب أيام الأسبوع
          </p>
          <div className="flex gap-2 mt-3">
            <BranchTab active={branch === 'adam'} onClick={() => setBranch('adam')} label="الأيام الآدام" sub="أحد • اثنين • ثلاثاء" color="#c9a227" />
            <BranchTab active={branch === 'wats'} onClick={() => setBranch('wats')} label="الأيام الواطس" sub="أربع • خميس • جمعة • سبت" color="#4ecfa4" />
          </div>
        </div>

        {branch !== 'intro' && (
          <>
            <Connector />
            <HosuTrack
              set={branch === 'adam' ? adamHosu : watsHosu}
              accent={branch === 'adam' ? '#c9a227' : '#4ecfa4'}
              onOpenHymn={onOpenHymn}
              openDayId={openDayId}
              setOpenDayId={setOpenDayId}
              openHymnId={openHymnId}
              setOpenHymnId={setOpenHymnId}
              storeFavs={store.favorites}
            />
            <Connector />
            <FlowNode
              emoji="🏁"
              title="النهاية"
              subtitle={branch === 'adam' ? 'ثم تُقال القطع الست للتسبحة السنوية' : 'ثم تُقال القطع الست للتسبحة السنوية'}
              tone="#ef8354"
            />
          </>
        )}

        {/* ===== الفلو كامل في سطر واحد ===== */}
        <FullFlowSummary />
      </div>
    </div>
  )
}

/* ---------------- components ---------------- */

function Connector() {
  return (
    <div className="flex justify-center py-1" aria-hidden>
      <div
        style={{
          width: 2,
          height: 26,
          background: 'linear-gradient(to bottom, rgba(201,162,39,0.7), rgba(201,162,39,0.15))',
          borderRadius: 2,
        }}
      />
    </div>
  )
}

function FlowNode({ emoji, title, subtitle, tone }: { emoji: string; title: string; subtitle: string; tone: string }) {
  return (
    <div
      className="rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{ background: `${tone}14`, border: `1px solid ${tone}55` }}
    >
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <div>
        <p style={{ color: tone, fontWeight: 800, fontSize: 14 }}>{title}</p>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5 }}>{subtitle}</p>
      </div>
    </div>
  )
}

function IntroCard({ section }: { section: (typeof eveningIntro)[number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #131c52, #0d1440)', border: '1px solid rgba(90,169,230,0.3)' }}
    >
      <button onClick={() => setOpen((v) => !v)} className="w-full px-4 py-3.5 text-right flex items-start gap-3">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(90,169,230,0.14)', border: '1px solid rgba(90,169,230,0.35)' }}
        >
          <IconMusic size={20} color="#5aa9e6" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <KindBadge kind="psalm" />
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{section.totalPieces} مزامير</span>
          </div>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 4 }}>{section.title}</p>
          <p style={{ color: '#5aa9e6', fontSize: 12, marginTop: 2 }}>{section.subtitle}</p>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2 animate-[fadeIn_.2s_ease-out]">
          {section.melody && <MelodyRow text={section.melody} />}
          {section.note && <NoteRow text={section.note} />}

          {/* نص المزامير */}
          <div
            className="rounded-xl p-3.5 mt-1"
            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(90,169,230,0.25)' }}
          >
            {section.id === 'eve-ps116' ? (
              <div className="space-y-1.5">
                {psalm116Lines.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: 13,
                      lineHeight: 1.8,
                      textAlign: 'center',
                      direction: line.startsWith('Ⲡ') || line.startsWith('ⲛ') ? 'rtl' : 'rtl',
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {['المزمور ١٤٨', 'المزمور ١٤٩', 'المزمور ١٥٠'].map((t, pi) => (
                  <div key={t}>
                    <p style={{ color: '#5aa9e6', fontWeight: 700, fontSize: 12, marginBottom: 6 }}>{t}</p>
                    <div className="space-y-1.5">
                      {psalms148to150[pi].map((line, li) => (
                        <p
                          key={li}
                          style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 1.8, textAlign: 'center' }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function KindBadge({ kind }: { kind: SectionKind }) {
  const c = sectionKindColors[kind]
  return (
    <span
      className="rounded-full px-2.5 py-0.5 inline-flex items-center gap-1"
      style={{ background: `${c}1f`, border: `1px solid ${c}66`, color: c, fontSize: 10.5, fontWeight: 700 }}
    >
      {kindIcon[kind]} {sectionKindLabels[kind]}
    </span>
  )
}

function MelodyRow({ text }: { text: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2 flex items-start gap-2"
      style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.25)' }}
    >
      <IconPlay size={14} color="#c9a227" />
      <p style={{ color: '#dcc06a', fontSize: 12, lineHeight: 1.6 }}>{text.replace('🎵 ', '')}</p>
    </div>
  )
}

function NoteRow({ text }: { text: string }) {
  return (
    <div
      className="rounded-xl px-3 py-2"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, lineHeight: 1.7 }}>{text.replace('💡 ', '')}</p>
    </div>
  )
}

function BranchTab({
  active,
  onClick,
  label,
  sub,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  sub: string
  color: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-xl py-2.5 px-2 transition-all active:scale-95"
      style={{
        background: active ? `${color}26` : 'rgba(255,255,255,0.05)',
        border: active ? `1.5px solid ${color}` : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <p style={{ color: active ? color : 'rgba(255,255,255,0.75)', fontWeight: 800, fontSize: 13 }}>{label}</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 2 }}>{sub}</p>
    </button>
  )
}

function HosuTrack({
  set,
  accent,
  openDayId,
  setOpenDayId,
  openHymnId,
  setOpenHymnId,
  storeFavs,
  onOpenHymn,
}: {
  set: HosuSet
  accent: string
  onOpenHymn?: (id: string) => void
  openDayId: string | null
  setOpenDayId: (id: string | null) => void
  openHymnId: string | null
  setOpenHymnId: (id: string | null) => void
  storeFavs: string[]
}) {
  return (
    <div className="space-y-3">
      {/* عنوان المسار */}
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-3"
        style={{ background: `${accent}12`, border: `1px solid ${accent}55` }}
      >
        <IconCopticCrossOrnate size={24} color={accent} />
        <div className="flex-1">
          <p style={{ color: accent, fontWeight: 800, fontSize: 15 }}>{set.title}</p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11.5 }}>{set.melody.replace('🎵 ', '')}</p>
        </div>
      </div>
      <div
        className="rounded-xl px-3 py-2"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 1.7 }}>{set.note.replace('💡 ', '')}</p>
      </div>

      {set.days.map((day, di) => (
        <DayCard
          key={day.id}
          day={day}
          accent={accent}
          isOpen={openDayId === day.id}
          onToggle={() => setOpenDayId(openDayId === day.id ? null : day.id)}
          openHymnId={openHymnId}
          setOpenHymnId={setOpenHymnId}
          favs={storeFavs}
          isLast={di === set.days.length - 1}
          onOpenHymn={onOpenHymn}
        />
      ))}

      {/* الختام */}
      <Connector />
      <div
        className="rounded-2xl px-4 py-3.5"
        style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}0a)`, border: `1.5px solid ${accent}66` }}
      >
        <div className="flex items-center gap-2">
          <KindBadge kind="conclusion" />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
            {set.id === 'hosu-adam' ? 'تتجمع مسارات الأحد + الاثنين + الثلاثاء' : 'تتجمع مسارات الأربع + الخميس + الجمعة + السبت'}
          </span>
        </div>
        <p style={{ color: '#fff', fontWeight: 800, fontSize: 14, marginTop: 6 }}>{set.conclusionTitle}</p>
        <div className="mt-2 space-y-2">
          <MelodyRow text={set.conclusionMelody} />
          <NoteRow text={set.conclusionNote} />
        </div>
      </div>
    </div>
  )
}

function DayCard({
  day,
  accent,
  isOpen,
  onToggle,
  openHymnId,
  setOpenHymnId,
  favs,
  isLast,
  onOpenHymn,
}: {
  day: WeekDay
  accent: string
  isOpen: boolean
  onToggle: () => void
  openHymnId: string | null
  setOpenHymnId: (id: string | null) => void
  favs: string[]
  isLast: boolean
  onOpenHymn?: (id: string) => void
}) {
  return (
    <div>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${isOpen ? accent + '66' : 'rgba(255,255,255,0.09)'}` }}
      >
        <button onClick={onToggle} className="w-full px-4 py-3 flex items-center gap-3 text-right">
          <span
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}55`, color: accent, fontWeight: 800, fontSize: 13 }}
          >
            {day.day.replace('ال', '').slice(0, 2)}
          </span>
          <div className="flex-1">
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>يوم {day.day}</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
              {day.hymns.map((h) => sectionKindLabels[h.kind]).join(' ← ')}
            </p>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <div className="px-3 pb-3 space-y-2 animate-[fadeIn_.2s_ease-out]">
            {day.hymns.map((h, i) => {
              const hymn = findHymn(h.id)!
              const open = openHymnId === h.id
              const isFav = favs.includes(h.id)
              return (
                <div
                  key={h.id}
                  className="rounded-xl"
                  style={{ background: 'rgba(13,20,64,0.7)', border: `1px solid ${sectionKindColors[h.kind]}44` }}
                >
                  <div className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <KindBadge kind={h.kind} />
                      <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10 }}>
                        {i === 0 ? '١. إبصالية' : ''}
                      </span>
                      <button
                        onClick={() => actions.toggleFavorite(h.id)}
                        className="mr-auto p-1 transition-transform active:scale-90"
                        aria-label="المفضلة"
                      >
                        {isFav ? <IconHeartFilled size={16} /> : <IconHeart size={16} color="rgba(255,255,255,0.5)" />}
                      </button>
                    </div>
                    <p style={{ color: '#fff', fontWeight: 700, fontSize: 13.5, marginTop: 6 }}>{h.name}</p>
                    {h.melody && <MelodyRow text={h.melody} />}
                    {h.note && (
                      <div className="mt-2">
                        <NoteRow text={h.note} />
                      </div>
                    )}
                    <div className="flex gap-2 mt-2.5">
                      <button
                        onClick={() => setOpenHymnId(open ? null : h.id)}
                        className="flex-1 rounded-lg py-2 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
                        style={{ background: open ? 'rgba(255,255,255,0.08)' : `${accent}1c`, color: open ? '#fff' : accent, fontSize: 12, fontWeight: 700 }}
                      >
                        <IconBook size={14} color={open ? '#fff' : accent} />
                        {open ? 'إخفاء النص' : 'عرض النص'}
                      </button>
                      {onOpenHymn && (
                        <button
                          onClick={() => onOpenHymn(h.id)}
                          className="rounded-lg px-3 py-2 flex items-center justify-center gap-1 transition-all active:scale-[0.98]"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700 }}
                        >
                          <IconPlay size={13} color="#e0b84a" />
                          قراءة
                        </button>
                      )}
                    </div>

                    {open && (
                      <div
                        className="mt-2.5 rounded-lg p-3 space-y-1.5 animate-[fadeIn_.2s_ease-out]"
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {hymn.pages[0].map((line, li) => (
                          <p key={li} style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 1.8, textAlign: 'center' }}>
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {!isLast && <Connector />}
    </div>
  )
}

function FullFlowSummary() {
  return (
    <div
      className="mt-8 rounded-2xl p-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p style={{ color: '#e0b84a', fontWeight: 800, fontSize: 14, marginBottom: 10 }}>🧭 الفلو كامل في سطر واحد</p>
      <FlowLine
        steps={[
          'البداية',
          'المزمور ١١٦ / لحن ني إنتوس تيرو',
          'المزامير ١٤٨، ١٤٩، ١٥٠ / الطقس الرابع',
          'الأيام الآدام أو الواطس',
        ]}
        color="#5aa9e6"
      />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 12, margin: '10px 0 4px' }}>الآدام:</p>
      <FlowLine
        steps={[
          'الأحد → طلبتك من عمق قلبي → كل الأسماء العالية → نيم غار',
          'الاثنين → ألوف ألوف وربوات ربوات → آدم بينما هو حزين',
          'الثلاثاء → تعال إلينا اليوم يا سيدنا المسيح → إكليل فخرنا',
          'اللبش الآدام: لساني الضعيف',
          'الختام الآدام: مراحِمك يا إلهي',
          'النهاية',
        ]}
        color="#c9a227"
      />
      <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 12, margin: '10px 0 4px' }}>الواطس:</p>
      <FlowLine
        steps={[
          'الأربع → فليفرح ويتهلل طالبوا الرب → كل القطعات السماوية → حزقيال النبي',
          'الخميس → وأيضًا يا أحبابي فلنطرح عنا → العليقة التي رآها → الله غير المنظور',
          'الجمعة → بالحقيقة قد تقدمت → مباركة أنتِ في النساء → بماذا أدعوكِ',
          'السبت → أعطى فرحًا لنفوسنا → أيتها الغير الدنسة العفيفة → السلام للملكة',
          'الختام الواطس: ربنا يسوع المسيح',
          'النهاية',
        ]}
        color="#4ecfa4"
      />
    </div>
  )
}

function FlowLine({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
      {steps.map((s, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <span
            className="rounded-md px-2 py-1"
            style={{ background: `${color}14`, border: `1px solid ${color}3d`, color: 'rgba(255,255,255,0.85)', fontSize: 11, lineHeight: 1.5 }}
          >
            {s}
          </span>
          {i < steps.length - 1 && <span style={{ color, fontSize: 11 }}>←</span>}
        </span>
      ))}
    </div>
  )
}
