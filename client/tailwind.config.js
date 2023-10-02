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
        primary: '#2e4057',
        primaryhover: 'rgba(46, 64, 87, 0.6)',
        secondary:"#f5f8fa",
        sidebar:'#fffefe'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        default: ['Poppins'],
      },
      screens: {
        'sm': '350px', // Change the default width from 640px to 480px
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontSize: {
        sm: '14px', // Small font size
        base: '16px', // Default font size
        lg: '18px', // Large font size
        mini: '10px',
        minip: "13px"
      },
      
    },
  },
  plugins: [],
};
