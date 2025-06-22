/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',       // blue-500
        secondary: '#1e40af',     // blue-800
        accent: '#06b6d4',        // cyan-500
        background: '#0f172a',    // slate-900
        card: '#1e293b',          // slate-800
        text: '#f8fafc',          // slate-50
        'text-secondary': '#cbd5e1', // slate-300
        border: '#334155',        // slate-700
        muted: '#475569',         // slate-600
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "slide-up": "slide-up 0.5s ease-in-out forwards",
        "slide-down": "slide-down 0.5s ease-in-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "glow": {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" },
        },
      },
    },
  },
  plugins: [],
}
