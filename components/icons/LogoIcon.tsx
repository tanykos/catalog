interface ILogoIconProps {
  className?: string;
  gradientId?: string;
}

export default function LogoIcon({ className, gradientId = "logoGradient" }: ILogoIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 2L4 8v16l12 6 12-6V8L16 2z"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M16 8l-6 3v6l6 3 6-3v-6l-6-3z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4dc2ff" />
          <stop offset="100%" stopColor="#2ee5dc" />
        </linearGradient>
      </defs>
    </svg>
  );
}
