module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-(info|success|danger)+/,
      variants: ["dark"],
    },
    {
      pattern: /text-(info|success|danger)+/,
      variants: ["dark"],
    },
    {
      pattern: /border-(info|success|danger)+/,
      variants: ["dark"],
    },
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.indigo,
        secondary: colors.gray,
        success: colors.green,
        danger: colors.red,
        info: colors.cyan,
      }),

      animation: {
        fade: "fadeIn .3s ease-in-out",
        slide: "slideIn .3s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { opacity: 0, translate: "0 -5pt" },
          to: { opacity: 1, translate: "0 0" },
        },
      },
    },
  },
  plugins: [],
};
