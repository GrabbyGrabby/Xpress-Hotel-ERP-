/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg)',
          text: 'var(--text)',
          secondary: 'var(--text-secondary)',
          accent: 'var(--accent)',
          light: 'var(--light)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        felix: ['"Felix Titling"', 'Cinzel', 'serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
