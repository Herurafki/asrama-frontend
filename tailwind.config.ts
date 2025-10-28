import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx}",
    "./app/(homepage)/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--color-border) / <alpha-value>)",
        input: "oklch(var(--color-input) / <alpha-value>)",
        ring: "oklch(var(--color-ring) / <alpha-value>)",
        background: "oklch(var(--color-background) / <alpha-value>)",
        foreground: "oklch(var(--color-foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--color-primary) / <alpha-value>)",
          foreground: "oklch(var(--color-primary-foreground) / <alpha-value>)",
          glow: "oklch(var(--color-primary-glow) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--color-secondary) / <alpha-value>)",
          foreground: "oklch(var(--color-secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--color-destructive) / <alpha-value>)",
          foreground: "oklch(var(--color-destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--color-muted) / <alpha-value>)",
          foreground: "oklch(var(--color-muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--color-accent) / <alpha-value>)",
          foreground: "oklch(var(--color-accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--color-popover) / <alpha-value>)",
          foreground: "oklch(var(--color-popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--color-card) / <alpha-value>)",
          foreground: "oklch(var(--color-card-foreground) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "oklch(var(--color-sidebar-background) / <alpha-value>)",
          foreground: "oklch(var(--color-sidebar-foreground) / <alpha-value>)",
          primary: "oklch(var(--color-sidebar-primary) / <alpha-value>)",
          "primary-foreground": "oklch(var(--color-sidebar-primary-foreground) / <alpha-value>)",
          accent: "oklch(var(--color-sidebar-accent) / <alpha-value>)",
          "accent-foreground": "oklch(var(--color-sidebar-accent-foreground) / <alpha-value>)",
          border: "oklch(var(--color-sidebar-border) / <alpha-value>)",
          ring: "oklch(var(--color-sidebar-ring) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
