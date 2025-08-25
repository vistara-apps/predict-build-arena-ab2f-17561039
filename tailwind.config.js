
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(204 70% 53%)',
        accent: 'hsl(130 50% 55%)',
        bg: 'hsl(210 36% 96%)',
        surface: 'hsl(255 100% 100%)',
        card: 'hsl(210 36% 96%)',
        text: 'hsl(210 40% 8%)',
        muted: 'hsl(210 40% 60%)',
        border: 'hsl(210 40% 80%)',
        success: 'hsl(130 50% 55%)',
        warning: 'hsl(45 93% 47%)',
        error: 'hsl(0 72% 51%)',
      },
      fontSize: {
        'display': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 4px 0 hsla(0, 0%, 0%, 0.05)',
        'hover': '0 4px 8px 0 hsla(0, 0%, 0%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
