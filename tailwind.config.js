/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		colors: {
  			background: '#09090b', // Zinc 950
  			foreground: '#fafafa', // Zinc 50
            primary: {
                DEFAULT: '#8b5cf6', // Violet 500
                foreground: '#ffffff',
            },
            secondary: {
                DEFAULT: '#27272a', // Zinc 800
                foreground: '#fafafa',
            },
            muted: {
                DEFAULT: '#27272a', // Zinc 800
                foreground: '#a1a1aa', // Zinc 400
            },
            accent: {
                DEFAULT: '#27272a', // Zinc 800
                foreground: '#fafafa',
            },
            destructive: {
                DEFAULT: '#ef4444', // Red 500
                foreground: '#ffffff',
            },
            border: '#27272a', // Zinc 800
            input: '#27272a', // Zinc 800
            ring: '#8b5cf6', // Violet 500
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
