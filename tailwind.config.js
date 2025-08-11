export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet monokrom bervariasi untuk aksen elegan
        base: {
          900: '#0B0F19',
          800: '#111827',
          700: '#1F2937',
          600: '#374151',
          500: '#4B5563',
          400: '#6B7280',
          300: '#9CA3AF',
          200: '#D1D5DB',
          100: '#E5E7EB',
          50:  '#F8FAFC'
        },
        accent: {
          primary: '#6366F1', // indigo halus untuk highlight bila diperlukan
          secondary: '#00B894' // teal untuk CTA alternatif
        }
      }
    },
  },
  plugins: [],
}