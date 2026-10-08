import type { IconName } from "@/data/site";

const paths: Record<IconName, React.ReactNode> = {
  drop: <path d="M12 3.5c3 4 6 7.3 6 10.5a6 6 0 0 1-12 0c0-3.2 3-6.5 6-10.5Zm-3 11a3 3 0 0 0 3 3" />,
  sparkle: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M12 8.5l1.2 2.3 2.3 1.2-2.3 1.2L12 15.5l-1.2-2.3L8.5 12l2.3-1.2Z" />
      <path d="M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6" />
    </>
  ),
  seat: <path d="M8 4h5a2 2 0 0 1 2 2l-1 8H8.5L7 6a2 2 0 0 1 1-2Zm.5 10L6 20h10l1.5-6M14 14h3.5a1.5 1.5 0 0 1 0 3H16" />,
  polish: (
    <>
      <circle cx="12" cy="15" r="5" />
      <circle cx="12" cy="15" r="1.6" />
      <path d="M12 10V4h5" />
    </>
  ),
  shield: <path d="M12 3l7 3v5.5c0 4.3-3 8-7 9.5-4-1.5-7-5.2-7-9.5V6l7-3Zm-3 9l2.2 2.2L15.5 10" />,
  wax: <path d="M5 14h14v3a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-3Zm2 0V9a5 5 0 0 1 10 0v5M9.5 7.5c.7-.6 1.5-1 2.5-1" />,
  engine: <path d="M4 10h3l2-2h5l2 2h2v2h2v4h-2v2h-3l-2 2H9l-2-2H4v-8Zm6 2v4m4-4v4" />,
};

export function ServiceIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function WhatsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.06L2 22l5.06-1.55A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .92.95-2.93-.2-.31a8.2 8.2 0 1 1 6.75 3.65Zm4.5-6.14c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.08 4.85 4.85 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.25 3.76c1.58.68 2.2.74 2.99.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="star-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E8C36A" />
          <stop offset=".5" stopColor="#C9A24A" />
          <stop offset="1" stopColor="#8C6A2A" />
        </linearGradient>
      </defs>
      <path fill="url(#star-gold)" d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 2.9 1.1-6.3L2.9 9.4l6.3-.9L12 2.8Z" />
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className={className} aria-hidden="true">
      <path d="M4 12h15m-5-5 5 5-5 5" />
    </svg>
  );
}
