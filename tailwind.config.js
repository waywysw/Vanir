/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html',   "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}", './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        'px': '1px',
        '0': '0rem',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      colors: {
        black: "#000",
        lime: {
          "100": "rgba(3, 179, 0, 0.25)",
          "200": "rgba(0, 255, 26, 0.25)",
        },
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
      "fontFamily": {
        "inter": ["Inter", "sans-serif"],
      },
      "borderRadius": {
        "6xl": "25px",
        "81xl": "100px",
      },
      "fontSize": {
        "lg": "18px"
      },
      width: {
        '5vw': '5vw',
        '10vw': '10vw',
        '15vw': '15vw',
        '20vw': '20vw',
        '25vw': '25vw',
        '30vw': '30vw',
        '35vw': '35vw',
        '40vw': '40vw',
        '45vw': '45vw',
        '50vw': '50vw',
        '55vw': '55vw',
        '60vw': '60vw',
        '65vw': '65vw',
        '70vw': '70vw',
        '75vw': '75vw',
        '80vw': '80vw',
        '85vw': '85vw',
        '90vw': '90vw',
        '95vw': '95vw',
        '100vw': '100vw',
      },
      height: {
        '5vh': '5vh',
        '10vh': '10vh',
        '15vh': '15vh',
        '20vh': '20vh',
        '25vh': '25vh',
        '30vh': '30vh',
        '35vh': '35vh',
        '40vh': '40vh',
        '45vh': '45vh',
        '50vh': '50vh',
        '55vh': '55vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '75vh': '75vh',
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',
        '100vh': '100vh',
        
        // 1/8 to 8/8 fractions
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '8/8': '100%',

        // 1/12 to 12/12 fractions
        '1/12': '8.33%',
        '2/12': '16.66%',
        '3/12': '25%',
        '4/12': '33.33%',
        '5/12': '41.66%',
        '6/12': '50%',
        '7/12': '58.33%',
        '8/12': '66.66%',
        '9/12': '75%',
        '10/12': '83.33%',
        '11/12': '91.66%',
        '12/12': '100%',

        // 1/14 to 14/14 fractions
        '1/14': '7.14%',
        '2/14': '14.28%',
        '3/14': '21.42%',
        '4/14': '28.57%',
        '5/14': '35.71%',
        '6/14': '42.85%',
        '7/14': '50%',
        '8/14': '57.14%',
        '9/14': '64.28%',
        '10/14': '71.42%',
        '11/14': '78.57%',
        '12/14': '85.71%',
        '13/14': '92.85%',
        '14/14': '100%',

        // 1/16 to 16/16 fractions
        '1/16': '6.25%',
        '2/16': '12.5%',
        '3/16': '18.75%',
        '4/16': '25%',
        '5/16': '31.25%',
        '6/16': '37.5%',
        '7/16': '43.75%',
        '8/16': '50%',
        '9/16': '56.25%',
        '10/16': '62.5%',
        '11/16': '68.75%',
        '12/16': '75%',
        '13/16': '81.25%',
        '14/16': '87.5%',
        '15/16': '93.75%',
        '16/16': '100%',
      },
      backgroundColor: {
        'primary': 'oklch(var(--p))',
        'primary-content': 'oklch(var(--pc))',
        'secondary': 'oklch(var(--s))',
        'secondary-content': 'oklch(var(--sc))',
        'accent': 'oklch(var(--a))',
        'accent-content': 'oklch(var(--ac))',
        'neutral': 'oklch(var(--n))',
        'neutral-content': 'oklch(var(--nc))',
        'base-100': 'oklch(var(--b1))',
        'base-200': 'oklch(var(--b2))',
        'base-300': 'oklch(var(--b3))',
        'base-content': 'oklch(var(--bc))',
        'info': 'oklch(var(--in))',
        'info-content': 'oklch(var(--inc))',
        'success': 'oklch(var(--su))',
        'success-content': 'oklch(var(--suc))',
        'warning': 'oklch(var(--wa))',
        'warning-content': 'oklch(var(--wac))',
        'error': 'oklch(var(--er))',
        'error-content': 'oklch(var(--erc))',
      },
      textColor: {
        'primary': 'oklch(var(--p))',
        'primary-content': 'oklch(var(--pc))',
        'secondary': 'oklch(var(--s))',
        'secondary-content': 'oklch(var(--sc))',
        'accent': 'oklch(var(--a))',
        'accent-content': 'oklch(var(--ac))',
        'neutral': 'oklch(var(--n))',
        'neutral-content': 'oklch(var(--nc))',
        'base-100': 'oklch(var(--b1))',
        'base-200': 'oklch(var(--b2))',
        'base-300': 'oklch(var(--b3))',
        'base-content': 'oklch(var(--bc))',
        'info': 'oklch(var(--in))',
        'info-content': 'oklch(var(--inc))',
        'success': 'oklch(var(--su))',
        'success-content': 'oklch(var(--suc))',
        'warning': 'oklch(var(--wa))',
        'warning-content': 'oklch(var(--wac))',
        'error': 'oklch(var(--er))',
        'error-content': 'oklch(var(--erc))',
      },
      borderColor: {
        'primary': 'oklch(var(--p))',
        'primary-content': 'oklch(var(--pc))',
        'secondary': 'oklch(var(--s))',
        'secondary-content': 'oklch(var(--sc))',
        'accent': 'oklch(var(--a))',
        'accent-content': 'oklch(var(--ac))',
        'neutral': 'oklch(var(--n))',
        'neutral-content': 'oklch(var(--nc))',
        'base-100': 'oklch(var(--b1))',
        'base-200': 'oklch(var(--b2))',
        'base-300': 'oklch(var(--b3))',
        'base-content': 'oklch(var(--bc))',
        'info': 'oklch(var(--in))',
        'info-content': 'oklch(var(--inc))',
        'success': 'oklch(var(--su))',
        'success-content': 'oklch(var(--suc))',
        'warning': 'oklch(var(--wa))',
        'warning-content': 'oklch(var(--wac))',
        'error': 'oklch(var(--er))',
        'error-content': 'oklch(var(--erc))',
      },
      backdropBlur: {
      },
      borderWidth: {
      },
    },
  },
  variants: {
      extend: {
        backdropBlur: ['responsive'],
      },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwindcss-textshadow'),
    require('flowbite/plugin')({
      charts: true,
    }),
    require('flowbite-typography'),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "coffee",
      "winter",
      "nord",
      "sunset",
      {
        night: {
          ...require("daisyui/src/theming/themes")["night"],
          accent: "#4c22c4",
          warning: "#d22a3a",
          neutral: "#b080f7",
        },
        dim: {
          ...require("daisyui/src/theming/themes")["dim"],
          primary: "#e64919",
          secondary: "#e6af19",
          accent: "#19b6e6",
        },
      }
    ],
    utils: true,
    logs: true,
    prefix: "dy-",
    base: false,
  },
});