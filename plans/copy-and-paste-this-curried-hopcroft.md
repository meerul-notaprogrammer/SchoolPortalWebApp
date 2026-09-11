# SMKKJ School Portal — Admin Panel Feature Plan

## Context

The user wants a complete, production-ready school portal for SMK Kampung Jawa (SMKKJ) built inside the existing React+Vite+Tailwind project. The portal serves as a centralized gateway for staff, students, and parents (ages 12–70) directing them to four internal Google Sites. The brief specifies exact colors, typography (Plus Jakarta Sans), section layout, Anime.js animations, and all four destination URLs. There is no existing UI to preserve — App.tsx is an empty shell.

---

## Approach

Build the entire portal in `src/App.tsx` as a single-page React component with inline Anime.js via a CDN `<script>` loaded through a `useEffect`-injected approach, or via `useEffect` + direct `anime()` calls after importing from CDN via a dynamic script tag. Since the project uses Vite (no CDN `<script>` injection needed via `index.html`), we'll add the Anime.js CDN `<script>` tag to `index.html` and call `window.anime()` from React refs. Alternatively, install `animejs` as an npm package.

**Chosen approach:** Install `animejs` npm package (cleaner for Vite/TypeScript) and import it directly. This avoids CDN complexity.

---

## Files to Modify

### 1. `src/index.css`
- Add Google Fonts `@import` for **Plus Jakarta Sans** (weights 400, 500, 600, 700, 800) at the very top, before the Tailwind import.
- Add Tailwind v4 `@theme` block with design tokens:
  - `--color-navy: #0d1b2a` (topbar)
  - `--color-slate-bg: #f1f5f9` (page background)
  - `--color-card: #ffffff`
  - `--color-border: #e2e8f0`
  - `--color-accent: #2563eb` (blue CTA)
- Set `font-family: 'Plus Jakarta Sans', sans-serif` on `body`.

### 2. `src/App.tsx`
Full single-page portal with these sections (all in one file, sub-components defined inline or as named functions in the same file):

#### Section 1: Sticky Topbar
- `position: sticky; top: 0; z-50`
- Deep navy background (`#0d1b2a`) with `backdrop-blur`
- Left: School logo mark (SVG crest placeholder) + "SMK Kampung Jawa" wordmark
- Right: Nav links — Portal, Pengetua, Hubungi Kami — smooth-scroll anchors
- Mobile: hamburger collapses into drawer or stacked menu

#### Section 2: Hero (100vh)
- Full-viewport hero with Unsplash school/campus image as background
- Dark navy overlay (`rgba(13,27,42,0.65)`)
- Centered content: bold headline "Welcome To SMKKJ", subtitle copy, CTA button "Terokai Portal"
- **Anime.js entrance:** staggered `opacity 0→1` + `translateY 40→0` on headline, subtitle, CTA (triggered on mount via `useEffect`)

#### Section 3: Pengetua Welcome
- `id="pengetua"` anchor
- 2-column CSS Grid layout (text left ~55%, portrait right ~45%)
- Left: Formal welcome text, principal name ("Puan Hjh. Norhaini binti Hamid" as placeholder), title, school credentials
- Right: Floating portrait — `<img>` with `filter: drop-shadow(...)`, no card/box wrapper, object-fit cover
- Unsplash placeholder for portrait (professional headshot crop)
- **Anime.js IntersectionObserver:** triggers `opacity 0→1` + `translateX -30→0` on left column, `translateX 30→0` on right column when section scrolled into view

#### Section 4: Portal Redirection Grid
- `id="portal"` anchor
- Section heading "Portal SMKKJ"
- Responsive CSS Grid: 2×2 on desktop, 1 column on mobile
- 4 portal cards, each an `<a>` wrapping the entire card (`target="_blank" rel="noopener noreferrer"`)
- Card structure: colored icon strip (unique color per portal), portal title, description, external arrow icon
  - Kurikulum: academic/blue icon
  - HEM: student welfare/green icon  
  - Kokurikulum: activity/orange icon
  - SKPM: quality/purple icon
- **Anime.js hover:** `translateY -6px`, box-shadow deepen, arrow `translateX +4px`
- Cards animate in with stagger on IntersectionObserver scroll

#### Section 5: Footer
- Deep navy background matching topbar
- School name, "Kementerian Pendidikan Malaysia" affiliation
- Copyright © 2025 SMK Kampung Jawa
- Three footer links: Dasar Privasi, Hubungi Kami, Peta Laman

### 3. `package.json` (via install command)
- Add `animejs` dependency

---

## Key Implementation Details

### Anime.js v4 Scroll Animation Strategy

The project uses **Anime.js v4** (`animejs@latest`) which has a native **Scroll Observer API** — no manual IntersectionObserver needed. Named imports are used throughout:

```typescript
import { animate, stagger, onScroll, createTimeline } from 'animejs'
```

#### Animation inventory

**1. Hero entrance — fires on mount**
```typescript
useEffect(() => {
  animate('.hero-animate', {
    opacity: [0, 1],
    translateY: [50, 0],
    delay: stagger(180, { start: 300 }),
    duration: 1000,
    ease: 'outExpo',
  })
}, [])
```

**2. Topbar scroll state — CSS class toggle on scroll**
```typescript
useEffect(() => {
  const handleScroll = () => {
    document.getElementById('topbar')
      ?.classList.toggle('scrolled', window.scrollY > 80)
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```
The `.scrolled` class adds `bg-[#0d1b2a]/95 shadow-lg` via CSS.

**3. Pengetua section — scroll-triggered slide-in using `onScroll`**
```typescript
useEffect(() => {
  animate('.pengetua-text', {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    ease: 'outExpo',
    autoplay: onScroll({ target: '.pengetua-text', enter: 'bottom 85%' }),
  })
  animate('.pengetua-portrait', {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    ease: 'outExpo',
    autoplay: onScroll({ target: '.pengetua-portrait', enter: 'bottom 85%' }),
  })
}, [])
```

**4. Portal section heading — scroll-triggered fade up**
```typescript
animate('.portal-heading', {
  opacity: [0, 1],
  translateY: [40, 0],
  ease: 'outExpo',
  autoplay: onScroll({ target: '.portal-heading', enter: 'bottom 90%' }),
})
```

**5. Portal cards — staggered scroll-reveal**
```typescript
animate('.portal-card', {
  opacity: [0, 1],
  translateY: [60, 0],
  scale: [0.95, 1],
  delay: stagger(120),
  duration: 700,
  ease: 'outBack(1.2)',
  autoplay: onScroll({ target: '.portal-card', enter: 'bottom 90%' }),
})
```

**6. Card hover micro-interactions — `animate()` called on mouse events**
```typescript
// onMouseEnter
animate(card, { translateY: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.15)', duration: 250, ease: 'outQuad' })
animate(cardArrow, { translateX: 6, duration: 250, ease: 'outQuad' })

// onMouseLeave  
animate(card, { translateY: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', duration: 300, ease: 'outQuad' })
animate(cardArrow, { translateX: 0, duration: 300, ease: 'outQuad' })
```

All scroll-animated elements are pre-hidden with `opacity: 0` in CSS (via a `.pre-hide` utility class) so there's no flash before Anime.js takes over.

### Unsplash Images
- Hero background: school / education / campus photo — `https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&h=900&fit=crop&auto=format` (school hallway)
- Principal portrait placeholder: professional headshot crop

### Responsive Breakpoints
- Mobile-first, 320px minimum
- md (768px): 2-column grid for portal cards  
- lg (1024px): 2-column layout for Pengetua section
- Topbar collapses nav links at < md

---

## Verification

1. Visual check: all 5 sections render correctly in the preview panel
2. Click all 4 portal cards — each opens correct Google Sites URL in a new tab
3. Smooth-scroll CTA scrolls to portal section
4. Resize to 320px — single-column layout, readable text
5. Scroll through page — Anime.js entrance animations fire for Pengetua section and portal grid
6. Hover portal cards — subtle lift + shadow + arrow shift

---

# Admin Panel — Feature Addition

## Context

Portal card URLs may change over time (e.g. when Google Sites are moved or reorganized). Without a way to update them, the admin would need to touch source code each time. This feature adds a password-protected admin panel ("Editor Mode") where the school admin can log in, see all 4 portal cards, and edit each URL directly in the browser. Changes are saved to `localStorage` so they survive page reloads without any backend.

---

## Architecture

No new packages needed. No React Router required — view routing is handled with a simple `view` state string in `App.tsx`. No backend; credentials are hardcoded in source (acceptable for a school intranet portal with no sensitive data).

```
view state: 'home' | 'login' | 'admin'
```

**Entry point to admin:** A small "Panel Admin" link at the very bottom of the footer (subtle, visible only to those who know it's there). Clicking it sets `view = 'login'`.

**Session:** `sessionStorage.getItem('smkkj-admin')` — clears when the tab closes.

**URL persistence:** `localStorage.getItem('smkkj-portal-urls')` stores a JSON object `{ kurikulum, hem, kokurikulum, skpm }` mapping portal IDs to their current URL. The home page reads from this on mount and falls back to the original hardcoded defaults.

**Credentials (hardcoded):**
- Username: `admin`
- Password: `smkkj@admin2025`

---

## Files to Create / Modify

### 1. `src/App.tsx` — refactored to view router + state manager

The monolithic component becomes a thin shell that:
- Holds `view`, `portalUrls`, and `isLoggedIn` state
- Reads `portalUrls` from `localStorage` on mount (JSON parse, fallback to defaults)
- Checks `sessionStorage` on mount to restore login across HMR
- Renders `<HomePage>`, `<LoginPage>`, or `<AdminPage>` based on `view`
- Passes `onAdminNav`, `onLogin`, `onLogout`, `portalUrls`, `onSaveUrls` as props

```tsx
const [view, setView] = useState<'home' | 'login' | 'admin'>('home')
const [isLoggedIn, setIsLoggedIn] = useState(() =>
  sessionStorage.getItem('smkkj-admin') === '1'
)
const [portalUrls, setPortalUrls] = useState<Record<string, string>>(() => {
  try {
    const saved = localStorage.getItem('smkkj-portal-urls')
    return saved ? JSON.parse(saved) : {}
  } catch { return {} }
})

const handleSaveUrls = (updated: Record<string, string>) => {
  setPortalUrls(updated)
  localStorage.setItem('smkkj-portal-urls', JSON.stringify(updated))
}
```

### 2. `src/pages/HomePage.tsx` — extracted from current App.tsx

Receives:
- `portalUrls: Record<string, string>` — overrides default URLs per portal ID
- `onAdminNav: () => void` — called when the footer admin link is clicked

The `portals` constant stays here. Each card's `href` becomes:
```tsx
href={portalUrls[p.id] ?? p.url}
```

The footer gets a subtle admin entry at the bottom:
```tsx
<button onClick={onAdminNav} className="text-slate-700/30 hover:text-slate-500 text-[11px] transition-colors">
  Panel Admin
</button>
```

All Anime.js `useEffect` hooks stay in this file (they were in App.tsx, now move to HomePage.tsx).

### 3. `src/pages/LoginPage.tsx` — new file

Clean, branded login screen. Full-page layout with school navy background. Center card with:
- School crest + "Editor Mode" heading  
- Username input
- Password input (type="password")
- "Log Masuk" submit button
- Error message on wrong credentials: "Nama pengguna atau kata laluan salah."
- "Kembali ke Laman Utama" back link

On successful login:
```tsx
sessionStorage.setItem('smkkj-admin', '1')
onLogin()
// parent sets view = 'admin'
```

No external form library needed — `useState` for field values and error.

### 4. `src/pages/AdminPage.tsx` — new file

Editor mode dashboard. Full-page layout with slate-50 background. Structure:

**Header bar** (navy, matches topbar style):
- School crest + "SMK Kampung Jawa"
- "Editor Mode" amber badge
- "Lihat Laman" button (→ sets view back to 'home', keeps session)
- "Log Keluar" button (clears sessionStorage, sets view to 'home')

**Content area** (`max-w-4xl mx-auto`):
- Section title "Urus Pautan Portal"
- Subtitle explaining the purpose
- 4 edit cards, one per portal, laid out in a single column

**Each edit card:**
```
[Color strip][Portal icon] Portal Title
Current URL: [input field — full width, monospace-ish]
Default URL: [small greyed-out text showing the original hardcoded URL]
[Pulihkan Asal button] [Simpan button]
```

State inside AdminPage:
```tsx
const [drafts, setDrafts] = useState<Record<string, string>>({
  kurikulum: portalUrls.kurikulum ?? portals[0].url,
  hem: portalUrls.hem ?? portals[1].url,
  ...
})
const [saved, setSaved] = useState<Record<string, boolean>>({})
```

On "Simpan" for a card: call `onSaveUrls({ ...portalUrls, [id]: drafts[id] })`, flash a "Disimpan!" green checkmark for 2 seconds.

On "Pulihkan Asal": reset that card's draft to the original hardcoded default URL.

---

## Shared utilities

The `portals` array (the static metadata — title, color, icon, default URL) will be moved to `src/data/portals.tsx` so both `HomePage.tsx` and `AdminPage.tsx` can import it without circular dependency.

The `SchoolCrest` and `ArrowUpRight` SVG components will be moved to `src/components/icons.tsx`.

---

## Visual design of new screens

**Login page:**
- Full-screen `#0d1b2a` navy background with subtle radial gradient glow
- Centered white card (`rounded-2xl shadow-2xl p-10 max-w-sm`)
- School crest on blue circle at top
- "Editor Mode" in amber badge
- Inputs: `border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500`
- Submit button: full-width blue-600
- Error state: red-50 bg, red-600 text, with an X icon

**Admin dashboard:**
- Slate-50 background, matches the portal page aesthetic
- Each portal card: white bg, `rounded-2xl border border-slate-200 shadow-sm`
- URL input: `font-mono text-sm` so URLs are easy to read and edit
- "Disimpan!" success feedback: animate a green checkmark (Anime.js `scale: [0, 1]`) next to the Simpan button

---

## File structure after this change

```
src/
  App.tsx                  ← view router, state
  main.tsx                 ← unchanged
  index.css                ← unchanged
  data/
    portals.tsx            ← portals[] array + PortalDef type
  components/
    icons.tsx              ← SchoolCrest, ArrowUpRight
  pages/
    HomePage.tsx           ← current portal page, receives portalUrls prop
    LoginPage.tsx          ← new
    AdminPage.tsx          ← new
```

---

## Verification

1. Home page: all 4 portal cards load with correct default URLs
2. Footer admin link visible — clicks opens login screen
3. Wrong credentials: error message shown, form not submitted
4. Correct credentials (`admin` / `smkkj@admin2025`): redirects to admin dashboard
5. Admin dashboard: 4 edit cards rendered, inputs pre-populated with current URLs
6. Edit a URL → Simpan → green checkmark flashes
7. Log Keluar: returns to home, sessionStorage cleared
8. Reload page: changed URLs still used (read from localStorage)
9. "Pulihkan Asal" resets single card to original hardcoded URL
10. "Lihat Laman" from admin returns to home without logging out
