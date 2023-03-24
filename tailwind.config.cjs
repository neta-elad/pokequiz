/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,tx,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /bg-poke.+/,
    },
  ],
  theme: {
    extend: {
      colors: {
        "pokenormal": "#A8A878",
        "pokefire": "#F08030",
        "pokefighting": "#C03028",
        "pokewater": "#6890F0",
        "pokeflying": "#A890F0",
        "pokegrass": "#78C850",
        "pokepoison": "#A040A0",
        "pokeelectric": "#F8D030",
        "pokeground": "#E0C068",
        "pokepsychic": "#F85888",
        "pokerock": "#B8A038",
        "pokeice": "#98D8D8",
        "pokebug": "#A8B820",
        "pokedragon": "#7038F8",
        "pokeghost": "#705898",
        "pokedark": "#705848",
        "pokesteel": "#B8B8D0",
        "pokefairy": "#EE99AC",
      }
    },
  },
  plugins: [],
}
