/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./src/**/*.{js,jsx,tsx}"], //.ts doesn't get compiled with nativewind.
    presets: [require("nativewind/preset")],
    theme: {
      extend: {},
    },
    plugins: [],
}