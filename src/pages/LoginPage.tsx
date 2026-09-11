import { useState, type FormEvent } from 'react'
import { SchoolCrest } from '../components/icons'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'smkkj@admin2025'

interface LoginPageProps {
  onLogin: () => void
  onBack: () => void
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('smkkj-admin', '1')
        onLogin()
      } else {
        setError('Nama pengguna atau kata laluan salah.')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #0f2744 0%, #0d1b2a 60%, #070e18 100%)',
      }}
    >
      {/* Back link */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Kembali ke Laman Utama
      </button>

      {/* Login card */}
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg mb-4">
              <SchoolCrest />
            </div>
            <span className="inline-block bg-amber-100 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-full tracking-wider uppercase mb-3">
              Editor Mode
            </span>
            <h1 className="text-[#0d1b2a] font-extrabold text-xl text-center leading-tight">
              Panel Admin SMKKJ
            </h1>
            <p className="text-slate-400 text-sm text-center mt-1">
              Log masuk untuk menguruskan pautan portal.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[#0d1b2a] text-xs font-semibold mb-1.5 tracking-wide">
                Nama Pengguna
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0d1b2a] placeholder-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[#0d1b2a] text-xs font-semibold mb-1.5 tracking-wide">
                Kata Laluan
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0d1b2a] placeholder-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl text-sm transition-colors mt-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Mengesahkan...
                </>
              ) : (
                'Log Masuk'
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-xs mt-6">
            Akses terhad kepada pentadbir sekolah sahaja.
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          SMK Kampung Jawa &middot; Kementerian Pendidikan Malaysia
        </p>
      </div>
    </div>
  )
}
