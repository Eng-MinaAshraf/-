/**
 * إدارة الحالة — المفضلة، الإعدادات، الإشارات المرجعية، وآخر قراءة
 * Global app store with localStorage persistence (favorites, settings, recents).
 */
import { useSyncExternalStore } from 'react'

export interface Settings {
  fontSize: number
  theme: 'dark' | 'sepia'
  keepScreenOn: boolean
  showCopticByDefault: boolean
}

export interface Bookmark {
  sectionId: string
  page: number
  savedAt: number
}

export interface AppState {
  favorites: string[] // section ids
  recent: { sectionId: string; category: string; at: number }[]
  bookmarks: Bookmark[]
  settings: Settings
  onboarded: boolean
}

const STORAGE_KEY = 'eifnoti99.state.v1'

const defaultState: AppState = {
  favorites: [],
  recent: [],
  bookmarks: [],
  settings: {
    fontSize: 20,
    theme: 'dark',
    keepScreenOn: false,
    showCopticByDefault: false,
  },
  onboarded: false,
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    return {
      ...defaultState,
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings ?? {}) },
    }
  } catch {
    return defaultState
  }
}

let state: AppState = typeof window !== 'undefined' ? load() : defaultState
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* ignore quota errors */
  }
}

function emit() {
  persist()
  listeners.forEach((l) => l())
}

function setState(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
  const next = typeof patch === 'function' ? patch(state) : patch
  state = { ...state, ...next }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): AppState {
  return state
}

/* ---------------- actions ---------------- */

export const actions = {
  toggleFavorite(sectionId: string) {
    const has = state.favorites.includes(sectionId)
    setState({
      favorites: has
        ? state.favorites.filter((f) => f !== sectionId)
        : [sectionId, ...state.favorites],
    })
  },
  addRecent(sectionId: string, category: string) {
    const rest = state.recent.filter((r) => r.sectionId !== sectionId)
    setState({ recent: [{ sectionId, category, at: Date.now() }, ...rest].slice(0, 12) })
  },
  toggleBookmark(sectionId: string, page: number) {
    const exists = state.bookmarks.some((b) => b.sectionId === sectionId && b.page === page)
    setState({
      bookmarks: exists
        ? state.bookmarks.filter((b) => !(b.sectionId === sectionId && b.page === page))
        : [{ sectionId, page, savedAt: Date.now() }, ...state.bookmarks].slice(0, 60),
    })
  },
  isBookmarked(sectionId: string, page: number) {
    return state.bookmarks.some((b) => b.sectionId === sectionId && b.page === page)
  },
  setSettings(patch: Partial<Settings>) {
    setState({ settings: { ...state.settings, ...patch } })
  },
  changeFontSize(delta: number) {
    setState((s) => ({
      settings: { ...s.settings, fontSize: Math.min(34, Math.max(14, s.settings.fontSize + delta)) },
    }))
  },
  setOnboarded(v: boolean) {
    setState({ onboarded: v })
  },
  resetAll() {
    state = { ...defaultState }
    emit()
  },
}

/* ---------------- hook ---------------- */

export function useAppStore(): AppState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
