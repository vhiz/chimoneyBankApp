/** @type {import('tailwindcss').Config} */
const { withAnimations } = require("animated-tailwindcss");
export default withAnimations({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["bumblebee", "business"],
  },
});
