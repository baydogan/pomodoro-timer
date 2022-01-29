module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        main: "#42B784",
        secondary: "#4D6A8C",
        menuButton: "hsla(0,0%,100%,.2)",
        menuButtonHover: "hsla(0,0%,100%,.4)",
      },
      fontFamily: {
        roboto: "Roboto",
        acme : "Acme",
        fredoka: "Fredoka One"
      },
      spacing: {
        "10px": "10px",
      },

      boxShadow: {
        'bottom': '0 6px 3px -2px gray;'
      }
    },
  },
  plugins: [],
};


