import './App.css'
import Pokemon from './pokequiz/Pokemon'

function App() {
  return (
    <div className="App">
      <button>New</button> <button>Hint</button>
      <Pokemon pokemon={{"name": "raticate", "pokeid": 20, types: ["normal", "fighting"]}} />
    </div>
  )
}

export default App
