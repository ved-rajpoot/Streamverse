/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  plugins: [require("@tailwindcss/forms")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'chat-light' : "url('/src/ChatBox/ChatWallpaperLight.jpeg')",
        'chat-dark' : "url('/src/ChatBox/ChatWallpaper.jpeg')",
      }
    },
  }
}
