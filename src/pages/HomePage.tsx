import { useEffect, useState } from 'react'
import { portals } from '../data/portals'
import { SchoolCrest, ArrowUpRight } from '../components/icons'

declare const anime: any

const HERO_BG =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop&auto=format&q=85'

const PRINCIPAL_IMG =
  'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=480&h=600&fit=crop&auto=format&q=80'

interface HomePageProps {
  portalUrls: Record<string, string>
  onAdminNav: () => void
}

export default function HomePage({ portalUrls, onAdminNav }: HomePageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof anime === 'undefined') return
    anime({
      targets: '.hero-animate',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(200, { start: 350 }),
      duration: 1050,
      easing: 'easeOutExpo',
    })
  }, [])

  useEffect(() => {
    const handle = () => {
      document.getElementById('topbar')?.classList.toggle('topbar-scrolled', window.scrollY > 80)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  useEffect(() => {
    if (typeof anime === 'undefined') return

    const observers: IntersectionObserver[] = []

    const addSingleReveal = (sel: string, tx: number, ty: number) => {
      const els = document.querySelectorAll(sel)
      if (!els.length) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return
            anime({
              targets: e.target,
              opacity: [0, 1],
              translateX: [tx, 0],
              translateY: [ty, 0],
              duration: 850,
              easing: 'easeOutExpo',
            })
            obs.unobserve(e.target)
          })
        },
        { threshold: 0.15 }
      )
      els.forEach((el) => obs.observe(el))
      observers.push(obs)
    }

    addSingleReveal('.pengetua-text', -50, 0)
    addSingleReveal('.pengetua-portrait', 50, 0)

    const headingEls = document.querySelectorAll('.portal-heading')
    if (headingEls.length) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          anime({
            targets: '.portal-heading',
            opacity: [0, 1],
            translateY: [40, 0],
            delay: anime.stagger(100),
            duration: 750,
            easing: 'easeOutExpo',
          })
          obs.disconnect()
        },
        { threshold: 0.1 }
      )
      obs.observe(headingEls[0])
      observers.push(obs)
    }

    const firstCard = document.querySelector('.portal-card')
    if (firstCard) {
      const cardObs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          anime({
            targets: '.portal-card',
            opacity: [0, 1],
            translateY: [64, 0],
            scale: [0.95, 1],
            delay: anime.stagger(140),
            duration: 720,
            easing: 'easeOutBack',
          })
          cardObs.disconnect()
        },
        { threshold: 0.05 }
      )
      cardObs.observe(firstCard)
      observers.push(cardObs)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const onCardEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof anime === 'undefined') return
    anime({ targets: e.currentTarget, translateY: -8, duration: 260, easing: 'easeOutQuad' })
    const arrow = e.currentTarget.querySelector('.card-arrow')
    if (arrow) anime({ targets: arrow, translateX: 5, duration: 260, easing: 'easeOutQuad' })
  }

  const onCardLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof anime === 'undefined') return
    anime({ targets: e.currentTarget, translateY: 0, duration: 320, easing: 'easeOutQuad' })
    const arrow = e.currentTarget.querySelector('.card-arrow')
    if (arrow) anime({ targets: arrow, translateX: 0, duration: 320, easing: 'easeOutQuad' })
  }

  return (
    <div className="min-h-full bg-[#f1f5f9] text-[#0d1b2a]">

      {/* ─── TOPBAR ─── */}
      <header
        id="topbar"
        className="fixed top-0 left-0 right-0 z-50 bg-[#0d1b2a] transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                <SchoolCrest />
              </div>
              <div className="leading-tight">
                <div className="text-white font-bold text-sm tracking-tight">SMK Kampung Jawa</div>
                <div className="text-blue-400 text-[11px] font-medium">SMKKJ Portal Rasmi</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: 'Portal', id: 'portal' },
                { label: 'Pengetua', id: 'pengetua' },
                { label: 'Hubungi Kami', id: 'footer' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-slate-300 hover:text-white text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('portal')}
                className="ml-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
              >
                Terokai Portal
              </button>
            </nav>

            <button
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-5 pt-3 border-t border-white/10 flex flex-col gap-1">
              {[
                { label: 'Portal', id: 'portal' },
                { label: 'Pengetua', id: 'pengetua' },
                { label: 'Hubungi Kami', id: 'footer' },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-slate-300 text-sm text-left py-2.5 px-3 rounded-lg hover:bg-white/5 hover:text-white transition-all"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        className="relative flex items-center justify-center min-h-screen bg-slate-900 overflow-hidden"
        style={{
          backgroundImage: `url('${HERO_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b2a]/80 via-[#0d1b2a]/65 to-[#0d1b2a]/90" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="hero-animate" style={{ opacity: 0 }}>
            <span className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/25 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Kementerian Pendidikan Malaysia
            </span>
          </div>

          <h1
            className="hero-animate text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] mb-5 tracking-tight"
            style={{ opacity: 0 }}
          >
            Welcome To
            <br />
            <span className="text-blue-400">SMKKJ</span>
          </h1>

          <p
            className="hero-animate text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: 0 }}
          >
            Portal rasmi SMK Kampung Jawa — pusat akses kepada semua portal
            dalaman sekolah untuk warga pendidik, pelajar, dan ibu bapa.
          </p>

          <div
            className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-3"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => scrollTo('portal')}
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Terokai Portal
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo('pengetua')}
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-medium px-7 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white/5"
            >
              Ucapan Pengetua
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { value: '4', label: 'Portal Dalaman' },
                { value: '30+', label: 'Tahun Kecemerlangan' },
                { value: 'KPM', label: 'Di Bawah Naungan' },
              ].map(({ value, label }) => (
                <div key={label} className="py-5 px-6 text-center">
                  <div className="text-white font-bold text-xl">{value}</div>
                  <div className="text-slate-400 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PENGETUA ─── */}
      <section id="pengetua" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-14 lg:gap-20 items-center">

            <div className="pengetua-text" style={{ opacity: 0 }}>
              <span className="inline-block text-blue-600 text-xs font-bold tracking-[0.15em] uppercase mb-5">
                Ucapan Pengetua
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0d1b2a] mb-5 leading-tight">
                Selamat Datang ke
                <br />
                SMK Kampung Jawa
              </h2>
              <div className="w-10 h-[3px] bg-blue-600 rounded-full mb-7" />
              <p className="text-slate-600 text-base leading-[1.85] mb-5">
                Assalamualaikum warahmatullahi wabarakatuh dan salam sejahtera
                kepada semua warga SMK Kampung Jawa. Dengan penuh rasa syukur,
                saya mengucapkan selamat datang ke portal rasmi sekolah kami yang
                telah dinaik taraf bagi memudahkan akses kepada semua maklumat dan
                perkhidmatan sekolah.
              </p>
              <p className="text-slate-600 text-base leading-[1.85] mb-9">
                Portal ini merupakan jambatan antara warga sekolah dengan pelbagai
                unit pentadbiran — Kurikulum, Hal Ehwal Murid, Kokurikulum, dan
                Pengurusan Kualiti. Bersama-sama kita tingkatkan kecemerlangan SMK
                Kampung Jawa ke tahap yang lebih tinggi demi masa depan pelajar
                yang gemilang.
              </p>
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <SchoolCrest />
                </div>
                <div>
                  <p className="text-[#0d1b2a] font-bold text-base leading-tight">
                    Puan Hjh. Norhaini binti Hamid
                  </p>
                  <p className="text-blue-600 text-sm font-semibold mt-0.5">Pengetua</p>
                  <p className="text-slate-400 text-xs mt-1">
                    SMK Kampung Jawa &middot; Kementerian Pendidikan Malaysia
                  </p>
                </div>
              </div>
            </div>

            <div className="pengetua-portrait flex justify-center lg:justify-end" style={{ opacity: 0 }}>
              <div className="relative">
                <div
                  className="absolute -inset-8 -z-10"
                  style={{
                    background: 'radial-gradient(ellipse at 55% 45%, #dbeafe 0%, #eff6ff 55%, transparent 100%)',
                    borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                  }}
                />
                <img
                  src={PRINCIPAL_IMG}
                  alt="Puan Hjh. Norhaini binti Hamid — Pengetua SMK Kampung Jawa"
                  className="w-72 lg:w-[340px] h-auto object-cover rounded-3xl"
                  style={{ filter: 'drop-shadow(0 24px 56px rgba(13, 27, 42, 0.18))' }}
                />
                <div className="absolute -bottom-5 -left-5 bg-[#0d1b2a] text-white px-4 py-3 rounded-2xl shadow-2xl">
                  <p className="text-[10px] text-blue-300 font-semibold tracking-wide uppercase">Pengetua</p>
                  <p className="text-sm font-bold leading-tight mt-0.5">SMK Kampung Jawa</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-2 rounded-xl shadow-lg tracking-wide">
                  KPM 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTAL GRID ─── */}
      <section id="portal" className="py-20 lg:py-28 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span
              className="portal-heading inline-block text-blue-600 text-xs font-bold tracking-[0.15em] uppercase mb-3"
              style={{ opacity: 0 }}
            >
              Akses Cepat
            </span>
            <h2
              className="portal-heading text-3xl lg:text-4xl font-extrabold text-[#0d1b2a] mt-1"
              style={{ opacity: 0 }}
            >
              Portal Utama SMKKJ
            </h2>
            <p
              className="portal-heading text-slate-500 mt-4 max-w-lg mx-auto text-base leading-relaxed"
              style={{ opacity: 0 }}
            >
              Pilih portal yang diperlukan untuk mengakses maklumat dan perkhidmatan berkaitan sekolah.
            </p>
          </div>

          <div id="portal-grid" className="grid sm:grid-cols-2 gap-5 lg:gap-6">
            {portals.map((p) => (
              <a
                key={p.id}
                href={portalUrls[p.id] ?? p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portal-card bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm block transition-shadow duration-300 hover:shadow-xl"
                style={{ opacity: 0, willChange: 'transform' }}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
              >
                <div className="h-1 w-full" style={{ backgroundColor: p.color }} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: p.bg }}
                    >
                      {p.icon}
                    </div>
                    <ArrowUpRight className="card-arrow text-slate-300 mt-1 shrink-0" />
                  </div>
                  <h3 className="text-[#0d1b2a] font-bold text-lg leading-snug mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{p.description}</p>
                  <div className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: p.color }}>
                    <span>Akses Portal</span>
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-slate-400 text-xs mt-8">
            Semua portal dibuka dalam tab baharu. Pastikan anda log masuk menggunakan akaun MOE anda.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="footer" className="bg-[#0d1b2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                  <SchoolCrest />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">SMK Kampung Jawa</div>
                  <div className="text-blue-400 text-[11px] font-medium">Portal Rasmi</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sekolah Menengah Kebangsaan Kampung Jawa, di bawah naungan Kementerian Pendidikan Malaysia.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-5">Portal Utama</h4>
              <ul className="space-y-3">
                {portals.map((p) => (
                  <li key={p.id}>
                    <a
                      href={portalUrls[p.id] ?? p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-5">Maklumat</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Dasar Privasi</a></li>
                <li>
                  <button onClick={() => scrollTo('footer')} className="text-slate-400 hover:text-white transition-colors">
                    Hubungi Kami
                  </button>
                </li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Peta Laman</a></li>
                <li>
                  <a href="https://www.moe.gov.my" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                    Portal KPM Rasmi
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; 2025 SMK Kampung Jawa. Hak Cipta Terpelihara.</p>
            <p>Kementerian Pendidikan Malaysia &middot; Portal Rasmi SMKKJ</p>
          </div>

          {/* Hidden admin entry */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onAdminNav}
              className="text-slate-700/25 hover:text-slate-500 text-[11px] transition-colors duration-300"
            >
              Panel Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
