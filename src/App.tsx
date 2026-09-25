import { useCallback, useState } from 'react'
import SplashScreen from './components/SplashScreen'
import HomeScreen from './components/HomeScreen'
import CategoryScreen from './components/CategoryScreen'
import EveningOrderScreen from './components/EveningOrderScreen'
import EveningHymnReader from './components/EveningHymnReader'
import ReaderScreen from './components/ReaderScreen'
import LibraryScreen from './components/LibraryScreen'
import FavoritesScreen from './components/FavoritesScreen'
import SettingsScreen from './components/SettingsScreen'

type Tab = 'home' | 'library' | 'favorites' | 'settings'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [readerSection, setReaderSection] = useState<{ id: string; page: number } | null>(null)
  const [eveningHymn, setEveningHymn] = useState<string | null>(null)

  const handleSplashDone = useCallback(() => setBooted(true), [])

  const openSectionFromLibrary = (categoryId: string, sectionId: string, page = 0) => {
    if (categoryId === 'evening-order') {
      setSelectedCategory('evening-order')
      return
    }
    setSelectedCategory(categoryId)
    setReaderSection({ id: sectionId, page })
  }

  if (!booted) return <SplashScreen onDone={handleSplashDone} />

  if (eveningHymn) {
    return <EveningHymnReader hymnId={eveningHymn} onBack={() => setEveningHymn(null)} />
  }

  if (readerSection) {
    return (
      <ReaderScreen
        sectionId={readerSection.id}
        initialPage={readerSection.page}
        onBack={() => setReaderSection(null)}
      />
    )
  }

  if (selectedCategory === 'evening-order') {
    return (
      <EveningOrderScreen
        onBack={() => setSelectedCategory(null)}
        onOpenHymn={(id) => setEveningHymn(id)}
      />
    )
  }

  if (selectedCategory) {
    return (
      <CategoryScreen
        categoryId={selectedCategory}
        onBack={() => setSelectedCategory(null)}
        onOpenReader={(id, page) => setReaderSection({ id, page })}
      />
    )
  }

  if (activeTab === 'library') {
    return (
      <LibraryScreen
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSection={openSectionFromLibrary}
      />
    )
  }

  if (activeTab === 'favorites') {
    return (
      <FavoritesScreen
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSection={openSectionFromLibrary}
      />
    )
  }

  if (activeTab === 'settings') {
    return <SettingsScreen activeTab={activeTab} onTabChange={setActiveTab} />
  }

  return (
    <HomeScreen
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onCategorySelect={setSelectedCategory}
    />
  )
}
