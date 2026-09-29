import type { Config } from 'tailwindcss';

// Tokens : <style> de "OVRCLK Cyber Monday v2" + _ds/modernist/styles.css
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // Rayon 0 partout (--radius-* = 0). Seuls la roue et le point radio utilisent rounded-full.
    borderRadius: { none: '0', DEFAULT: '0', full: '9999px' },
    extend: {
      colors: {
        bg: '#121111',
        surface: '#1c1b1b',
        ink: '#f8f4f4',
        divider: 'rgb(248 244 244 / 0.26)',
        accent: {
          DEFAULT: '#ec3013',
          100: '#fff2ef',
          200: '#ffe0d9',
          300: '#ffc4b8',
          400: '#ff9783',
          500: '#ff563c',
          600: '#dd2b0f',
          700: '#ae1800',
          800: '#7c1405',
          900: '#4d170e',
        },
        neutral: {
          100: '#f8f4f4',
          200: '#eae7e7',
          300: '#d7d3d3',
          400: '#bab6b6',
          500: '#9b9797',
          600: '#7d7979',
          700: '#605d5d',
          800: '#444141',
          900: '#2d2b2b',
        },
      },
      fontFamily: { sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'] },
      letterSpacing: { display: '-0.045em', title: '-0.03em', head: '-0.015em' },
      boxShadow: {
        lg: '0 0 0 1px rgb(248 244 244 / 0.14), 0 24px 60px rgb(0 0 0 / 0.6)',
        'neon-card': '0 14px 34px rgb(236 48 19 / 0.2)',
        'neon-hero': '0 0 0 1px rgb(236 48 19 / 0.4), 0 0 60px rgb(236 48 19 / 0.22)',
        'neon-bar': '0 0 12px #ec3013',
        'neon-bar-lg': '0 0 14px #ec3013',
        'neon-drawer': '-20px 0 60px rgb(236 48 19 / 0.15)',
        'neon-wheel': '0 0 50px rgb(236 48 19 / 0.35)',
      },
      dropShadow: {},
      keyframes: {
        pulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'none' } },
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        glow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgb(236 48 19 / 0)' },
          '50%': { boxShadow: '0 0 0 4px rgb(236 48 19 / .25), 0 0 28px rgb(236 48 19 / .45)' },
        },
        nudge: { '0%,100%': { transform: 'translateX(0)' }, '50%': { transform: 'translateX(5px)' } },
        fill: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        slide: { from: { transform: 'translateX(100%)' }, to: { transform: 'none' } },
        bump: { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.45)' }, '100%': { transform: 'scale(1)' } },
        tick: {
          from: { textShadow: '0 0 18px #ec3013', transform: 'translateY(-2px)' },
          to: { textShadow: 'none', transform: 'none' },
        },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(4px)' } },
      },
      animation: {
        pulse: 'pulse 1.2s infinite',
        'pulse-slow': 'pulse 1.4s infinite',
        rise: 'rise .5s cubic-bezier(.2,.8,.2,1) both',
        fade: 'fade .3s both',
        glow: 'glow 2.4s ease-in-out infinite',
        nudge: 'nudge 1.6s ease-in-out infinite',
        fill: 'fill 1.3s cubic-bezier(.2,.8,.2,1) both',
        slide: 'slide .38s cubic-bezier(.2,.8,.2,1) both',
        bump: 'bump .5s cubic-bezier(.3,1.6,.5,1)',
        tick: 'tick .8s ease-out',
        bob: 'bob 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
