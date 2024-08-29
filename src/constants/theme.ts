import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    darkGrey: string
    background: string
    lightGrey: string
  }
}

export const theme = extendTheme({
  typography: {
    allVariants: {
      fontFamily: 'sans-serif',
      textTransform: 'none',
    },
    h2: {
      fontSize: '24px',
      lineHeight: '24px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '22px',
      lineHeight: '22px',
      fontWeight: 'bold',
    },

    button: {
      textTransform: 'none',
    },
  },
  colorSchemes: {
    light: {
      palette: {
        common: {
          black: '#000',
          white: '#fff',
          lightGrey: '#474747',
          darkGrey: '#555',
          background: '#f5f6fe',
        },
        primary: {
          main: '#5863FF',
        },
        secondary: {
          main: '#27C59A',
        },
      },
    },
  },
})

export type Theme = typeof theme
