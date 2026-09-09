/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF7F2',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F4EFE6',
          muted: '#EAE2D3',
          dark: '#1C1413',
          burgundy: '#2B060E',
        },
        burgundy: {
          50: '#FDF6F7',
          100: '#FBF0F2',
          200: '#F4D9DF',
          300: '#E8B6C2',
          400: '#D5869B',
          500: '#B85570',
          600: '#8E233B',
          700: '#72192D',
          800: '#5A1222',
          900: '#420B17',
          950: '#2B060E',
        },
        beige: {
          50: '#FDFBF7',
          100: '#FAF7F2',
          200: '#F4EFE6',
          300: '#EAE2D3',
          400: '#DDD2BF',
          500: '#C7B79E',
          600: '#9E8C73',
          700: '#796A54',
          800: '#564A39',
          900: '#322A1F',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FBEDE6',
          200: '#F5D7C9',
          500: '#C75D35',
          700: '#99411F',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E8EFEA',
          200: '#D2DFD6',
          500: '#477A5B',
          700: '#2C543D',
        },
        gold: {
          50: '#FCF9F0',
          100: '#F8F1DE',
          200: '#EEDDAF',
          500: '#B88A34',
          700: '#8A631E',
        },
        // Inverted-fix mono palette: 50 is light cream, 950 is deep espresso black
        mono: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#EAE3DC',
          300: '#D8CDC3',
          400: '#B5A599',
          500: '#7A6B62',
          600: '#5C4E46',
          700: '#453831',
          800: '#2E231E',
          900: '#1F1613',
          950: '#140C0A',
        },
        // Fallback overrides to eliminate blue/purple from legacy classes
        midnight: '#1C1413',
        navy: {
          900: '#1C1413',
          800: '#2A1A1C',
          700: '#3D1A22',
          600: '#52202A',
        },
        cyber: {
          blue: '#72192D',
          cyan: '#8E233B',
          emerald: '#2C543D',
          orange: '#C75D35',
          amber: '#B88A34',
          purple: '#5A1222',
        }
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}
