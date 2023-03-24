import './App.css'
import Pokemon from './pokequiz/Pokemon'
import getPokemon from './pokequiz/registery'

function App() {
  return (
    <div className="App">
      <button>New</button> <button>Hint</button>
      <Pokemon pokemon={getPokemon(93)} />
    </div>
  )
}

export default App
