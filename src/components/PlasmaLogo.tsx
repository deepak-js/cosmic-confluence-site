export function PlasmaLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plasmaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 200)" />
          <stop offset="100%" stopColor="oklch(0.55 0.26 300)" />
        </linearGradient>
      </defs>
      <path
        d="M16 2C16 2 22 8 22 14C22 18 19 20 19 23C19 26 21 28 21 28C21 28 16 26 13 22C10 18 10 14 12 11C14 8 16 6 16 2Z"
        fill="url(#plasmaGrad)"
      />
      <circle cx="16" cy="20" r="3" fill="oklch(0.98 0.005 260)" opacity="0.9" />
    </svg>
  );
}
