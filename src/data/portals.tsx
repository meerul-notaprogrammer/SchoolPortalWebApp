export interface PortalDef {
  id: string
  title: string
  url: string
  description: string
  color: string
  bg: string
  icon: React.ReactNode
}

import type React from 'react'

export const portals: PortalDef[] = [
  {
    id: 'kurikulum',
    title: 'Site Kurikulum SMKKJ',
    url: 'https://sites.google.com/moe-dl.edu.my/site-kurikulum-smk-kg-jawa/home',
    description: 'Jadual waktu, sukatan pelajaran, pengurusan peperiksaan, dan bahan akademik.',
    color: '#2563eb',
    bg: '#eff6ff',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'hem',
    title: 'Site HEM SMKKJ',
    url: 'https://sites.google.com/moe-dl.edu.my/sitehemsmkkampungjawa/home?authuser=0',
    description: 'Hal Ehwal Murid, rekod disiplin, bantuan kebajikan, dan pendaftaran murid.',
    color: '#16a34a',
    bg: '#f0fdf4',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'kokurikulum',
    title: 'Site Kokurikulum SMKKJ',
    url: 'https://sites.google.com/moe-dl.edu.my/site-kokurikulum-smk-kampung-j/home',
    description: 'Pengurusan unit beruniform, kelab persatuan, sukan permainan, dan rekod PAJSK.',
    color: '#ea580c',
    bg: '#fff7ed',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#ea580c" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: 'skpm',
    title: 'SKPM SMKKJ',
    url: 'https://sites.google.com/moe-dl.edu.my/skpm-smkkj?usp=sharing',
    description:
      'Penilaian Standard Kualiti Pendidikan Malaysia, skor pengurusan kualiti, dan instrumen sekolah.',
    color: '#7c3aed',
    bg: '#f5f3ff',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#7c3aed" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]
