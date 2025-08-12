/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/utils/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'mixed-primary': '#0C111D', // Deep navy for dark theme background
        'mixed-accent': '#4A90E2', // Professional blue accent for highlights
        'mixed-secondary': '#1A2236', // Darker navy for secondary elements
        'mixed-light': '#F5F7FA', // Soft off-white for light theme background
        'mixed-accent-light': '#4A90E2', // Same blue accent for consistency
        'mixed-secondary-light': '#EAF0F6', // Light blue-gray for secondary elements
        'text-mixed': '#DDE3EE', // Light blue-gray text for dark theme
        'text-mixed-light': '#2D3E50', // Dark navy text for light theme
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'xs': '0 2px 8px rgba(74, 144, 226, 0.1)',
        'mixed': '0 3px 15px rgba(74, 144, 226, 0.2)',
        'mixed-light': '0 3px 15px rgba(74, 144, 226, 0.15)',
      },
      animation: {
        'mixed-fade': 'mixedFade 0.6s ease-out',
        'mixed-slide': 'mixedSlide 0.6s ease-out',
      },
      keyframes: {
        mixedFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        mixedSlide: {
          '0%': { transform: 'translateY(15px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};