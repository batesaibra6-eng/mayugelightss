/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette — Deep Blue + Gold accent
        navy: {
          50: "#f1f5fb",
          100: "#e0e9f5",
          200: "#c3d4ec",
          300: "#93b4de",
          400: "#5d8bca",
          500: "#3a6bb0",
          600: "#2c5491",
          700: "#254576",
          800: "#1e3861",
          900: "#0f172a",
          950: "#080d1a",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf0cc",
          200: "#f4df95",
          300: "#edc85d",
          400: "#e7b23a",
          500: "#d99a23",
          600: "#bc7a1c",
          700: "#96591a",
          800: "#7c471c",
          900: "#693c1b",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.08)",
        card: "0 10px 40px -10px rgba(15, 23, 42, 0.15)",
        glow: "0 0 40px -5px rgba(231, 178, 58, 0.4)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0f172a 0%, #1e3861 50%, #254576 100%)",
        "gold-gradient": "linear-gradient(135deg, #edc85d 0%, #d99a23 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [],
};
