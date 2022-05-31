module.exports = {
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#97C73E",

          "primary-content": "#FFFFFF",

          secondary: "#0a4563",

          "secondary-content": "#FFFFFF",

          accent: "#2b556e",

          neutral: "#3D4451",

          "neutral-content": "#FFFFFF",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#97C73E",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
}
