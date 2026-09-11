import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

type View = 'home' | 'login' | 'admin'

function loadPortalUrls(): Record<string, string> {
  try {
    const raw = localStorage.getItem('smkkj-portal-urls')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function App() {
  const [view, setView] = useState<View>(() =>
    sessionStorage.getItem('smkkj-admin') === '1' ? 'admin' : 'home'
  )

  const [portalUrls, setPortalUrls] = useState<Record<string, string>>(loadPortalUrls)

  const handleSaveUrls = (updated: Record<string, string>) => {
    setPortalUrls(updated)
    localStorage.setItem('smkkj-portal-urls', JSON.stringify(updated))
  }

  const handleLogin = () => setView('admin')

  const handleLogout = () => {
    sessionStorage.removeItem('smkkj-admin')
    setView('home')
  }

  if (view === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={() => setView('home')}
      />
    )
  }

  if (view === 'admin') {
    return (
      <AdminPage
        portalUrls={portalUrls}
        onSaveUrls={handleSaveUrls}
        onViewSite={() => setView('home')}
        onLogout={handleLogout}
      />
    )
  }

  return (
    <HomePage
      portalUrls={portalUrls}
      onAdminNav={() => setView('login')}
    />
  )
}
