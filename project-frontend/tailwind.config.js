// // /** @type {import('tailwindcss').Config} */
// // module.exports = {
// //   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
// //   theme: {
// //     extend: {},
// //   },
// //   plugins: [],
// // }

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     extend: {
//       animation: {
//         'bounce-custom': 'bounceCustom 2s infinite',
//       },
//       keyframes: {
//         bounceCustom: {
//           '0%, 100%': { transform: 'translateY(0)' },
//           '50%': { transform: 'translateY(-10px)' },
//         },
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        rowdies: ['Rowdies', 'cursive'],
      },
      animation: {
        'bounce-custom': 'bounceCustom 2s infinite',
      },
      keyframes: {
        bounceCustom: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
