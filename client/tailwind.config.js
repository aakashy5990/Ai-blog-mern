/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Modern Blue
        // Alternative options (uncomment one to use):
        // primary: '#8B5CF6', // Purple
        // primary: '#06B6D4', // Cyan
        // primary: '#10B981', // Emerald Green
        // primary: '#F59E0B', // Amber
        // primary: '#EF4444', // Red
        // primary: '#EC4899', // Pink
        // primary: '#6366F1', // Indigo
        // primary: '#059669', // Dark Green
        // primary: '#DC2626', // Dark Red
        // primary: '#7C3AED', // Violet
      },
    },
  },
  plugins: [],
};
