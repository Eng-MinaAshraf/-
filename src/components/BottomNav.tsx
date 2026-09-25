import type React from 'react'
import { IconHome, IconLibrary, IconHeart, IconSettings } from './icons'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; color?: string }> }[] = [
  { id: 'home', label: 'الرئيسية', Icon: IconHome },
  { id: 'library', label: 'المكتبة', Icon: IconLibrary },
  { id: 'favorites', label: 'المفضلة', Icon: IconHeart },
  { id: 'settings', label: 'الإعدادات', Icon: IconSettings },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      style={{
        background: 'linear-gradient(to top, #06091e, #0a1038)',
        borderTop: '1px solid rgba(201,162,39,0.2)',
      }}
      className="flex items-center justify-around py-3 px-2 safe-area-bottom"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-1 px-4 py-1 transition-all"
          >
            <Icon size={24} color={isActive ? '#c9a227' : 'rgba(255,255,255,0.45)'} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#c9a227' : 'rgba(255,255,255,0.45)',
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
