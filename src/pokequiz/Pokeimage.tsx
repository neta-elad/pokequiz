import PokeID from "./PokeID"

export interface PokeimageProps {
    pokeid: PokeID,
}

function Pokeimage({pokeid}: PokeimageProps) {
    return (
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("" + pokeid).padStart(3, "0")}.png`} />
    )
}

export default Pokeimage