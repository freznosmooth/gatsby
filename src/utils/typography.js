import Typography from 'typography'
import colors from './colors'

// All config options can be found at http://kyleamathews.github.io/typography.js/

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.4,
  scaleRatio: 2,
  googleFonts: [
    {
      name: 'Roboto',
      styles: [
        '400',
        '500',
        '700',
      ],
    },
  ],
  headerFontFamily: [
    'Roboto',
    'sans-serif',
  ],
  bodyFontFamily: [
    'Roboto',
    'sans-serif',
  ],
  headerWeight: '500',
  bodyWeight: '400',
  boldWeight: '700',
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'a, a:visited, a:active': {
      color: colors.primary,
    },
    'a:hover': {
      color: colors.secondary,
    }
  })
})

export default typography
