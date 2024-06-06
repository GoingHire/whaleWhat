const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard Variable"], // 'Pretendard Variable' 폰트와 폴백 폰트로 'sans-serif'를 추가합니다.
      },
      colors: {
        main: "#006DE9",
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
