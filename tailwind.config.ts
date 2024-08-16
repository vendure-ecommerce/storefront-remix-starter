import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  safelist: [
    'gap-x-6',
    'gap-y-6',
    'gap-x-7',
    'gap-y-7',
    'gap-x-8',
    'gap-y-8',
    'gap-x-9',
    'gap-y-9',
    'gap-x-10',
    'gap-y-10',
    'gap-x-11',
    'gap-y-11',
    'gap-x-12',
    'gap-y-12',
    'sm:grid-cols-[repeat(auto-fill,_minmax(4rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(5rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(6rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(7rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(9rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(13rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))]',
    'sm:grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(8.333333%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(12.5%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(16.666667%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(25%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(33.333333%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(41.666667%,_1fr))]',
    'xl:grid-cols-[repeat(auto-fill,_minmax(50%,_1fr))]',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: 'clamp(1.2rem, calc(1.37vw + 0.93rem), 2.12rem)',
      screens: {
        '3xl': '120rem',
      },
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      /* xs: "clamp(0.78rem, calc(-0.01vw + 0.79rem), 0.79rem)",
      sm: "clamp(0.89rem, calc(0.07vw + 0.87rem), 0.94rem)",
      base: "clamp(1rem, calc(0.19vw + 0.96rem), 1.13rem)",
      lg: "clamp(1.13rem, calc(0.33vw + 1.06rem), 1.35rem)",
      xl: "clamp(1.27rem, calc(0.52vw + 1.16rem), 1.62rem)", */
      '2xl': 'clamp(1.42rem, calc(0.77vw + 1.27rem), 1.94rem)',
      '3xl': 'clamp(1.6rem, calc(1.08vw + 1.39rem), 2.33rem)',
      '4xl': 'clamp(1.8rem, calc(1.48vw + 1.51rem), 2.8rem)',
      '5xl': 'clamp(2.03rem, calc(1.97vw + 1.63rem), 3.36rem)',
      '6xl': 'clamp(2.28rem, calc(2.59vw + 1.76rem), 4.03rem)',
      '7xl': 'clamp(2.57rem, calc(3.37vw + 1.89rem), 4.84rem)',
      '8xl': 'clamp(2.89rem, calc(4.32vw + 2.02rem), 5.8rem)',
      '9xl': 'clamp(3.25rem, calc(5.51vw + 2.15rem), 6.97rem)',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /* STOREFRONT */

        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))',
        },
        'color-primary': {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--color-primary-foreground))',
        },
        'color-secondary': {
          DEFAULT: 'hsl(var(--color-secondary))',
          /* foreground: "hsl(var(--color-secondary-foreground))", */
        },
        'color-tertiary': {
          DEFAULT: 'hsl(var(--color-tertiary))',
          /* foreground: "hsl(var(--color-tertiary-foreground))", */
        },
        'color-in-stock': {
          DEFAULT: 'hsl(var(--color-in-stock))',
          /* foreground: "hsl(var(--color-in-stock-foreground))", */
        },
        'color-out-of-stock': {
          DEFAULT: 'hsl(var(--color-out-of-stock))',
          /* foreground: "hsl(var(--color-out-of-stock-foreground))", */
        },
        'color-new-arrival': {
          DEFAULT: 'hsl(var(--color-new-arrival))',
          foreground: 'hsl(var(--color-new-arrival-foreground))',
        },
        'color-is-favorite': {
          DEFAULT: 'hsl(var(--color-is-favorite))',
          foreground: 'hsl(var(--color-is-favorite-foreground))',
        },
        'color-in-cart': {
          DEFAULT: 'hsl(var(--color-in-cart))',
          foreground: 'hsl(var(--color-in-cart-foreground))',
        },
        'color-free-shipping': {
          DEFAULT: 'hsl(var(--color-free-shipping))',
          foreground: 'hsl(var(--color-free-shipping-foreground))',
        },
        'color-has-special-price': {
          DEFAULT: 'hsl(var(--color-has-special-price))',
          foreground: 'hsl(var(--color-has-special-price-foreground))',
        },
        'color-star-rating': {
          DEFAULT: 'hsl(var(--color-star-rating))',
          foreground: 'hsl(var(--color-star-rating-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      maxWidth: {
        'screen-3xl': '120rem',
      },
      spacing: {
        item: 'var(--item-gap)',
        /* "1": "clamp(0.19rem, calc(-0.09vw + 0.27rem), 0.25rem)",
        "2": "clamp(0.49rem, calc(0.06vw + 0.48rem), 0.53rem)",
        "4": "clamp(0.77rem, calc(0.43vw + 0.68rem), 1.06rem)",
        "6": "clamp(0.96rem, calc(0.8vw + 0.8rem), 1.5rem)",
        "8": "clamp(1.2rem, calc(1.37vw + 0.93rem), 2.12rem)", */
        '12': 'clamp(1.5rem, calc(2.22vw + 1.06rem), 3rem)',
        '16': 'clamp(2rem, calc(3.51vw + 1.17rem), 4rem)',
        '20': 'clamp(2.5rem, calc(5.41vw + 1.26rem), 6rem)',
        '32': 'clamp(3rem, calc(8.22vw + 1.28rem), 8rem)',
      },
      height: {
        '2': '0.5rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
      },
      width: {
        '2': '0.5rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar-hide') /* , nextui() */,
  ],
} satisfies Config;

export default config;
