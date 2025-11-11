/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./common/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-light": ["Poppins_300Light"],
        "poppins-regular": ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semi-bold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
        "poppins-extra-bold": ["Poppins_800ExtraBold"],
      },
      colors: {
        primary: {
          100: "#932537",
          200: "#fae8eb",
          // 200: "#faf5f0",
        },
        lightGray: "#FBFBFD",
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
