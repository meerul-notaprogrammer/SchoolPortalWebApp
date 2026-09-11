import { useState, useEffect } from 'react'
import { portals } from '../data/portals'
import { SchoolCrest } from '../components/icons'

declare const anime: any

interface AdminPageProps {
  portalUrls: Record<string, string>
  onSaveUrls: (updated: Record<string, string>) => void
  onViewSite: () => void
  onLogout: () => void
}

export default function AdminPage({ portalUrls, onSaveUrls, onViewSite, onLogout }: AdminPageProps) {
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    portals.forEach((p) => {
      init[p.id] = portalUrls[p.id] ?? p.url
    })
    return init
  })

  const [savedStates, setSavedStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof anime === 'undefined') return
    anime({
      targets: '.admin-card',
      opacity: [0, 1],
      translateY: [24, 0],
      delay: anime.stagger(100, { start: 200 }),
      duration: 600,
      easing: 'easeOutExpo',
    })
  }, [])

  const handleSave = (id: string) => {
    const updated = { ...portalUrls, [id]: drafts[id] }
    onSaveUrls(updated)

    setSavedStates((prev) => ({ ...prev, [id]: true }))

    if (typeof anime !== 'undefined') {
      anime({
        targets: `#saved-indicator-${id}`,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutBack',
      })
    }

    setTimeout(() => {
      setSavedStates((prev) => ({ ...prev, [id]: false }))
    }, 2500)
  }

  const handleRestore = (id: string, defaultUrl: string) => {
    setDrafts((prev) => ({ ...prev, [id]: defaultUrl }))
  }

  const handleLogout = () => {
    sessionStorage.removeItem('smkkj-admin')
    onLogout()
  }

  const isModified = (id: string) => {
    const p = portals.find((p) => p.id === id)
    return drafts[id] !== (portalUrls[id] ?? p?.url)
  }

  const hasCustomUrl = (id: string) => {
    const p = portals.find((p) => p.id === id)
    return (portalUrls[id] ?? p?.url) !== p?.url
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ─── ADMIN TOPBAR ─── */}
      <header className="bg-[#0d1b2a] sticky top-0 z-50 shadow-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <SchoolCrest />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-sm">SMK Kampung Jawa</div>
                <div className="text-blue-400 text-[11px] font-medium">SMKKJ Portal Rasmi</div>
              </div>
              <span className="ml-2 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase">
                Editor Mode
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onViewSite}
                className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Lihat Laman
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 hover:text-red-300 text-sm px-4 py-2 rounded-lg transition-all"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── CONTENT ─── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0d1b2a]">Urus Pautan Portal</h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed max-w-xl">
            Kemaskini pautan untuk setiap portal di bawah. Perubahan disimpan dalam pelayar ini dan akan kekal walaupun halaman dimuat semula.
          </p>
          <button
            onClick={onViewSite}
            className="sm:hidden mt-4 inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Lihat Laman Utama
          </button>
        </div>

        {/* Portal edit cards */}
        <div className="flex flex-col gap-5">
          {portals.map((p) => (
            <div
              key={p.id}
              id={`admin-card-${p.id}`}
              className="admin-card bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Color strip */}
              <div className="h-1 w-full" style={{ backgroundColor: p.color }} />

              <div className="p-6 sm:p-7">
                {/* Card header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: p.bg }}
                  >
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-[#0d1b2a] font-bold text-base leading-tight">{p.title}</h3>
                      {hasCustomUrl(p.id) && (
                        <span className="inline-block bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                          DIUBAH
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{p.description}</p>
                  </div>
                </div>

                {/* URL editor */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#0d1b2a] text-xs font-semibold mb-1.5 tracking-wide">
                      URL Semasa
                    </label>
                    <input
                      type="url"
                      value={drafts[p.id] ?? ''}
                      onChange={(e) =>
                        setDrafts((prev) => ({ ...prev, [p.id]: e.target.value }))
                      }
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-700 placeholder-slate-300 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-slate-50"
                      spellCheck={false}
                    />
                  </div>

                  {/* Default URL reference */}
                  <div className="text-xs text-slate-400 flex items-start gap-1.5">
                    <span className="shrink-0 font-semibold text-slate-500 mt-px">Asal:</span>
                    <span className="font-mono break-all leading-relaxed">{p.url}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                  <button
                    onClick={() => handleRestore(p.id, p.url)}
                    disabled={drafts[p.id] === p.url}
                    className="text-sm text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
                  >
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Pulihkan Asal
                  </button>

                  <div className="flex items-center gap-3 ml-auto">
                    {/* Saved indicator */}
                    {savedStates[p.id] && (
                      <div
                        id={`saved-indicator-${p.id}`}
                        className="flex items-center gap-1.5 text-green-600 text-sm font-semibold"
                        style={{ opacity: 0 }}
                      >
                        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        Disimpan!
                      </div>
                    )}

                    <button
                      onClick={() => handleSave(p.id)}
                      disabled={!isModified(p.id)}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="mt-8 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-sm text-blue-700">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>
            Pautan disimpan dalam <span className="font-semibold">localStorage</span> pelayar ini. Jika anda menggunakan pelayar atau peranti lain, pautan asal akan digunakan.
          </p>
        </div>
      </main>
    </div>
  )
}
