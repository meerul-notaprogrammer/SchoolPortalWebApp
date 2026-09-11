export function SchoolCrest() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 2L13.5 7.5H19L14.5 10.8L16.5 16.5L11 13.2L5.5 16.5L7.5 10.8L3 7.5H8.5L11 2Z"
        fill="white"
      />
    </svg>
  )
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}
