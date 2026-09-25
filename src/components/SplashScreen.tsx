/**
 * شاشة التحميل الأولية — Splash / Boot screen
 */
import { useEffect, useState } from 'react'
import { LogoMark } from './Logo'

interface SplashScreenProps {
  onDone: () => void
}

const tips = [
  '«رنّمي للرب يا كل الأرض» 🎵',
  'التسبحة صلاة الكنيسة الأولى منذ القرن الأول',
  'الكلمة «إيفنوتي» تعني: ليتنا يسبح الرب',
  'أضف تسبحتك المفضلة إلى المفضلة بضغطة قلب ❤',
  'غيّر حجم الخط من أزرار A+ / A− أثناء القراءة',
]

export default function SplashScreen({ onDone }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [tipIndex, setTipIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 2600
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const tipTimer = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 900)

    const fadeTimer = setTimeout(() => setFading(true), duration)
    const doneTimer = setTimeout(onDone, duration + 550)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(tipTimer)
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden transition-opacity duration-500"
      style={{
        opacity: fading ? 0 : 1,
        background:
          'radial-gradient(circle at 50% 18%, #16216b 0%, #0d1440 45%, #070b24 100%)',
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      {/* decorative stars */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {[
          { top: '8%', right: '12%', s: 10, d: 0 },
          { top: '14%', left: '16%', s: 7, d: 0.6 },
          { top: '30%', right: '22%', s: 6, d: 1.2 },
          { top: '26%', left: '10%', s: 9, d: 1.8 },
          { top: '62%', right: '8%', s: 7, d: 0.9 },
          { top: '70%', left: '14%', s: 10, d: 1.5 },
          { top: '84%', right: '20%', s: 6, d: 0.3 },
        ].map((st, i) => (
          <span
            key={i}
            className="absolute animate-pulse"
            style={{
              top: st.top,
              left: st.left,
              right: st.right,
              width: st.s,
              height: st.s,
              animationDelay: `${st.d}s`,
              color: '#c9a227',
              opacity: 0.5,
              fontSize: st.s,
              lineHeight: 1,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* top ornament line */}
      <div className="flex items-center gap-3 mt-16 px-8">
        <div style={{ width: 70, height: 1, background: 'linear-gradient(to left, rgba(201,162,39,.7), transparent)' }} />
        <span style={{ color: 'rgba(201,162,39,.75)', fontSize: 13, fontWeight: 600 }}>☦</span>
        <div style={{ width: 70, height: 1, background: 'linear-gradient(to right, rgba(201,162,39,.7), transparent)' }} />
      </div>

      {/* center logo block */}
      <div className="flex flex-col items-center gap-5 animate-[fadeUp_.9s_ease-out]">
        <div className="relative">
          {/* rotating halo ring */}
          <div
            className="absolute inset-0 rounded-full animate-spin-slow"
            style={{
              border: '1px dashed rgba(201,162,39,0.4)',
              transform: 'scale(1.35)',
            }}
          />
          <LogoMark size={128} glow />
        </div>

        <div className="text-center">
          <h1
            style={{
              color: '#e0b84a',
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: '0.02em',
              textShadow: '0 4px 24px rgba(201,162,39,0.35)',
            }}
          >
            إيفنوتي ٩٩
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: 500, marginTop: 6 }}>
            كنز الكنيسة القبطية .. في متناول يدك
          </p>
          <p dir="ltr" style={{ color: 'rgba(201,162,39,0.55)', fontSize: 11, fontWeight: 600, marginTop: 4, letterSpacing: '0.35em' }}>
            EIFNOTI 99 · COPTIC TASBEHA
          </p>
        </div>
      </div>

      {/* bottom: progress + tip */}
      <div className="w-full max-w-md px-8 pb-12 flex flex-col items-center gap-3">
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-[width] duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to left, #8f6f16, #c9a227, #e8c566)',
              boxShadow: '0 0 10px rgba(201,162,39,0.6)',
            }}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{Math.round(progress)}%</span>
          <span key={tipIndex} className="animate-[fadeIn_.5s_ease-out]" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 500 }}>
            {tips[tipIndex]}
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>الإصدار ١٫٠ — لصُنع كل مجد لله</span>
      </div>
    </div>
  )
}
