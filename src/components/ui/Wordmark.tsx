export function Wordmark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 28 28" width="22" height="22" fill="none">
        <defs>
          <linearGradient id="cu-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--copper-bright)" />
            <stop offset="1" stopColor="var(--copper-deep)" />
          </linearGradient>
        </defs>
        <rect x="11" y="3" width="6" height="20" rx="1.4" fill="url(#cu-grad)" />
        <rect x="6" y="23" width="16" height="2.4" rx="1" fill="var(--copper-deep)" />
        <circle cx="14" cy="9" r="1.2" fill="#14263C" />
        <circle cx="14" cy="14" r="1.2" fill="#14263C" />
        <path d="M21 6 L23 8 L20 9 L22 11" stroke="var(--copper-bright)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
