/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: "minmax(18rem, 20rem) 1fr",
        profile: "max-content 1fr min-content",
        card: "max-content 1fr min-content",
        main: "1fr minmax(18rem, 24rem)",
      },
      colors: {
        purple: "#a34532",
      },
    },
  },
  plugins: [],
};
