import fs from "fs";
import https from "https";

const BASE_URL = "https://pokeapi.co/api/v2";

function fetch(url) {
  return new Promise((resolve, reject) => {
    https
      .request(url, (response) => {
        let data = "";
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject)
      .end();
  });
}

async function fetchPokemonData(pokemonId) {
  const data = await fetch(`${BASE_URL}/pokemon/${pokemonId}`);
  return {
    pokeid: data.id,
    name: data.name,
    types: data.types.map((type) => type.type.name),
  };
}

async function fetchRegions() {
  const summaries = await fetch(`${BASE_URL}/generation`);
  return Object.fromEntries(
    (await Promise.all(summaries.results.map(({ url }) => fetch(url)))).map(
      ({ id, main_region: { name }, pokemon_species: species }) => {
        const ids = species.map((item) => {
          const urlParts = item.url.split("/");
          return urlParts[urlParts.length - 2];
        });
        const first = Math.min(...ids);
        const last = Math.max(...ids);
        return [name, { id, name, first, last }];
      },
    ),
  );
}

async function fetchPokemons(totalPokemons) {
  return Object.fromEntries(
    (
      await Promise.all(
        [...Array(totalPokemons).keys()]
          .map((i) => i + 1)
          .map(fetchPokemonData),
      )
    ).map((pokemon) => [pokemon.pokeid, pokemon]),
  );
}

async function generatePokemonJson(totalPokemons, outputPath) {
  const [pokemons, regions] = await Promise.all([
    fetchPokemons(totalPokemons),
    fetchRegions(),
  ]);

  fs.writeFileSync(outputPath, JSON.stringify({ pokemons, regions }, null, 2));
  console.log(`${totalPokemons} pokemons written to ${outputPath}`);
}

async function getNumberOfPokemons() {
  const data = await fetch(`${BASE_URL}/pokedex/national`);
  return data.pokemon_entries.length;
}

const totalPokemons = +process.argv[2] || (await getNumberOfPokemons());
const outputPath = process.argv[3] || "src/models/registry.json";

await generatePokemonJson(totalPokemons, outputPath);
