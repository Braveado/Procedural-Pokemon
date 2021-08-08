module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'normal': '#a8a878',
        'fire': '#f08030',
        'water': '#6890f0',
        'grass': '#78c850',
        'electric': '#f8d030',
        'ice': '#98d8d8',
        'fighting': '#c03028',
        'poison': '#a040a0',
        'ground': '#e0c068',
        'flying': '#a890f0',
        'psychic': '#f85888',
        'bug': '#a8b820',
        'rock': '#b8a038',
        'ghost': '#705898',
        'dark': '#705848',
        'dragon': '#7038f8',
        'steel': '#b8b8d0',
        'fairy': '#f0b6bc',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        enter: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '5%': { transform: 'scale(0.5)', opacity: '0' },
          '6%': { transform: 'scale(0)', opacity: '0' },
        }
      },
      animation: {
        wiggle: 'wiggle 5s ease-in-out infinite',
        enter: 'enter 200ms ease-in-out',
        leave: 'leave 4s ease-in-out',
      },
      backgroundImage: theme => ({
        'unown-pattern': "url('/src/assets/unown-pattern3.png')"
      })
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
