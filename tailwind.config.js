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
        // Deep Navy Blue (Brand Primary)
        navy: {
          50: '#F0F4FA',
          100: '#D9E3F1',
          200: '#B3C7E3',
          300: '#8CABCB',
          400: '#5F88B0',
          500: '#386694',
          600: '#234B76',
          700: '#173659',
          800: '#0F233D',
          900: '#0A1728',
          950: '#060E1A',
        },
        // Medical Blue (Secondary)
        medical: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B9DDFF',
          300: '#7CC2FF',
          400: '#36A2FF',
          500: '#0C83EB',
          600: '#0066C7',
          700: '#0051A1',
          800: '#044585',
          900: '#0A3B6F',
          950: '#07254A',
        },
        // Clinical Teal (Accent)
        teal: {
          50: '#EDFDF8',
          100: '#D3FAF0',
          200: '#ABF2E1',
          300: '#71E4CC',
          400: '#35CDB1',
          500: '#14B196',
          600: '#0B8F7B',
          700: '#0D7264',
          800: '#0F5B51',
          900: '#114B44',
          950: '#042C28',
        },
        // Healthcare State / Feedback Colors
        emergency: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        // Dark theme surfaces
        dark: {
          bg: '#080E1A',
          surface: '#0F1829',
          card: '#152238',
          border: '#1F314F',
          muted: '#8A99AD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
        display: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'card': '0 8px 30px rgba(15, 23, 42, 0.06)',
        'card-hover': '0 18px 40px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.04)',
        'elevated': '0 24px 60px -12px rgba(15, 23, 42, 0.18)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glow-medical': '0 0 25px -3px rgba(0, 102, 199, 0.28)',
        'glow-teal': '0 0 25px -3px rgba(20, 177, 150, 0.28)',
        'glow-emergency': '0 0 24px -2px rgba(220, 38, 38, 0.35)',
        'glass': '0 8px 32px 0 rgba(15, 35, 61, 0.08)',
        'glass-hover': '0 16px 40px 0 rgba(15, 35, 61, 0.14)',
      },
      borderRadius: {
        'hospital': '1rem',
        'hospital-lg': '1.5rem',
        'hospital-xl': '2rem',
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

