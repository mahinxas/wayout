import { useId } from 'react';

interface WayoutLogoProps {
  size?: number;
  textColor?: string;
}

export default function WayoutLogo({
  size = 36,
  textColor = '#0D1B2A',
}: WayoutLogoProps) {
  const rawId = useId();
  const gradId = `wg${rawId.replace(/\W/g, '_').replace(/^_+|_+$/g, '')}`;

  const iconSize = Math.round(size * 1.2);
  const fontSize = Math.round(size * 0.52);
  const gap = Math.round(size * 0.18);

  return (
    <span
      className="select-none"
      role="img"
      aria-label="Wayout"
      style={{ display: 'inline-flex', alignItems: 'center', gap, lineHeight: 1 }}
    >
      {/* Globe with escape arrow */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="5" y1="43" x2="43" y2="5" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#0077B6" />
            <stop offset="50%"  stopColor="#0096C7" />
            <stop offset="100%" stopColor="#48CAE4" />
          </linearGradient>
        </defs>

        {/* Globe ring */}
        <circle
          cx="24" cy="24" r="16"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
        />

        {/* Latitude arcs — subtle world grid */}
        <path
          d="M8,19 Q24,14 40,19"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M9,30 Q24,35 39,30"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Meridian arc — right-leaning for 3-D globe feel */}
        <path
          d="M24,8 Q31,16 31,24 Q31,32 24,40"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Escape arrow — starts inside the globe, bursts out upper-right */}
        <line
          x1="20" y1="31"
          x2="36" y2="10"
          stroke={`url(#${gradId})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Arrowhead */}
        <path
          d="M34,17 L36,10 L30,13"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark: "Way" in brand colour + "out" in teal */}
      <span
        style={{
          fontWeight: 800,
          fontSize: `${fontSize}px`,
          fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: textColor, transition: 'color 300ms ease' }}>Way</span>
        <span style={{ color: '#00B4D8' }}>out</span>
      </span>
    </span>
  );
}
