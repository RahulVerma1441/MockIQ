import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", ".flowbite-react\\class-list.json"],
  theme: {
    extend: {},
  },
  plugins: [flowbiteReact],
}