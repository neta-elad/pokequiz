import fs from 'fs'
import https from 'https'

const BASE_URL = 'https://pokeapi.co/api/v2'

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.request(url, response => {
      let data = ''
      response.on('data', chunk => data += chunk)
      response.on('end', () => resolve(JSON.parse(data)))
    }).on('error', reject).end()
  })
}

async function fetchPokemonData(pokemonId) {
  const url = `${BASE_URL}/pokemon/${pokemonId}`
  const data = await fetch(url)
  return {
    pokeid: data.id,
    name: data.name,
    types: data.types.map(type => type.type.name),
  }
}

async function generatePokemonJson(totalPokemons, outputPath) {
  console.log(`Fetching ${totalPokemons} pokemons`)
  const allPokemons = Object.fromEntries((await Promise.all(
    [...Array(totalPokemons).keys()]
      .map(i => i + 1)
      .map(fetchPokemonData))
  ).map(pokemon => [pokemon.pokeid, pokemon]))

  fs.writeFileSync(outputPath, JSON.stringify(allPokemons, null, 2))
  console.log(`${totalPokemons} pokemons written to ${outputPath}`)
}

async function getNumberOfPokemons() {
  const data = await fetch(`${BASE_URL}/pokedex/national`)
  return data.pokemon_entries.length
}

const totalPokemons = +process.argv[2] || await getNumberOfPokemons()
const outputPath = process.argv[3] || 'src/pokequiz/registry.json'

await generatePokemonJson(totalPokemons, outputPath)