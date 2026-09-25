import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import CategoryScreen from './components/CategoryScreen'
import ReaderScreen from './components/ReaderScreen'

type Screen = 'home' | 'category' | 'reader'
type Tab = 'home' | 'library' | 'favorites' | 'settings'

const categoryTitles: Record<string, string> = {
  annual: 'التسبحة السنوية',
  kiahk: 'التسبحة الكيهكية',
  feasts: 'تسبحة الأعياد',
  fasting: 'تسبحة الأصوام',
  psalmodia: 'الإبصلمودية',
  hymns: 'الألحان',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedCategory, setSelectedCategory] = useState<string>('annual')
  const [fontSize, setFontSize] = useState(20)

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prev) => Math.min(32, Math.max(14, prev + delta)))
  }

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id)
    setScreen('category')
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'home') setScreen('home')
  }

  if (screen === 'reader') {
    return (
      <ReaderScreen
        onBack={() => setScreen('category')}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />
    )
  }

  if (screen === 'category') {
    return (
      <CategoryScreen
        categoryTitle={categoryTitles[selectedCategory] ?? 'التسبحة'}
        onBack={() => setScreen('home')}
        onOpenReader={() => setScreen('reader')}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />
    )
  }

  return (
    <HomeScreen
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onCategorySelect={handleCategorySelect}
    />
  )
}
