import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { useAppStore } from './store'

function Root() {
  const { settings } = useAppStore()
  return (
    <div className={settings.theme === 'sepia' ? 'theme-sepia' : undefined}>
      <App />
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
