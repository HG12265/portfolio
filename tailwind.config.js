/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: '#F8FAFC',        // Slate-50 canvas
        surfaceDark: '#FFFFFF',   // Pure white card surfaces
        surfaceCard: '#FFFFFF',   // Pure white card
        surfaceSubtle: '#F1F5F9', // Slate-100
        primaryBlue: '#4F46E5',   // Royal Indigo
        accentSky: '#2563EB',     // Electric Cobalt
        indigoBrand: '#4F46E5',
        textLight: '#0F172A',     // Deep Slate-900 high contrast text
        textMuted: '#64748B',     // Slate-500 secondary text
        borderSubtle: '#E2E8F0',  // Slate-200 border
        borderHover: '#C7D2FE',   // Indigo-200 hover border
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card-subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
