module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.indigo,
        secondary: colors.gray,
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
