import React from 'react';

/** Small inline icons for Contact & Footer. No icon package or remote CDN required. */
export default function ContactIcon({ name, size = 18, ...props }) {
  const shapes = {
    'arrow-up': <path d="m12 19 0-14m-7 7 7-7 7 7" />,
    'arrow-up-right': (
      <>
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </>
    ),
    'copy': (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    'check': <path d="m5 12 4 4L19 6" />,
    'mail': (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    'phone': (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19 19 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.5A2 2 0 0 1 4.4 2h3a2 2 0 0 1 2 1.7l.6 3a2 2 0 0 1-.5 1.7L8.2 9.7a16 16 0 0 0 6.1 6.1l1.3-1.3a2 2 0 0 1 1.7-.5l3 .6a2 2 0 0 1 1.7 2Z" />
    ),
    'pin': (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    'send': (
      <>
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </>
    ),
    'shield': (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    'spark': <path d="m12 3 1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9Z" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {shapes[name] || null}
    </svg>
  );
}
