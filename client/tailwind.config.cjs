module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'on-secondary-fixed': '#2e150c',
        'tertiary': '#efbf70',
        'on-tertiary-fixed': '#281900',
        'surface-tint': '#efbf70',
        'secondary-fixed': '#ffdbd0',
        'primary-fixed': '#ffe2b7',
        'inverse-surface': '#efdfd9',
        'background': '#19120f',
        'on-secondary-fixed-variant': '#603f34',
        'tertiary-container': '#291a00',
        'tertiary-fixed': '#ffdead',
        'secondary-fixed-dim': '#ebbcad',
        'on-secondary': '#46291f',
        'error': '#ffb4ab',
        'surface': '#19120f',
        'primary': '#efbf70',
        'surface-bright': '#413733',
        'on-primary': '#281900',
        'on-error-container': '#ffdad6',
        'on-error': '#690005',
        'outline': '#9c8e89',
        'on-surface': '#efdfd9',
        'surface-container': '#261e1a',
        'on-surface-variant': '#d3c3be',
        'primary-container': '#4d320f',
        'on-background': '#efdfd9',
        'secondary-container': '#624136',
        'outline-variant': '#4f4440',
        'surface-dim': '#19120f',
        'on-tertiary-container': '#a77e36',
        'surface-container-low': '#221a17',
        'on-primary-fixed': '#2a170f',
        'surface-container-lowest': '#140d0a',
        'surface-container-high': '#312825',
        'inverse-primary': '#73584e',
        'on-primary-container': '#ffdfac',
        'primary-fixed-dim': '#efbf70',
        'surface-variant': '#3c332f',
        'on-tertiary': '#432c00',
        'tertiary-fixed-dim': '#efbf70',
        'error-container': '#93000a'
      },
      fontFamily: {
        headline: ['Epilogue'],
        body: ['Plus Jakarta Sans'],
        label: ['Plus Jakarta Sans']
      },
      borderRadius: { DEFAULT: '1rem', lg: '2rem', xl: '3rem', full: '9999px' }
    }
  },
  plugins: [
    // Add official Tailwind plugins here when available in your environment
  ]
};
