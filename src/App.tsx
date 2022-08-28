import { FC, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

type Bracket = Record<string, Record<"a" | "b", string>>
const warriors = ["Whiplash", "Saw blaze", "Duck", "Rotator", "Witch Doctor", "Rusty", "Hypershock", "BYE"]
const builtStartingBracket = (): Bracket => {
  const bracket: Bracket = {
    "0": { a: "", b: "" },
    "1": { a: "", b: "" },
    "2": { a: "", b: "" },
    "3": { a: "", b: "" }
  }
  const randwarriors = warriors.sort(() => Math.random() - 0.5)
  Object.keys(bracket).forEach((key) => {
    const warriorA = randwarriors.pop() ?? "BYE"
    const warriorB = randwarriors.pop() ?? "BYE"
    bracket[key] = { a: warriorA, b: warriorB }
  })
  return bracket
}
function App() {
  const [count, setCount] = useState(0)
  const [bracketOne, setBracketOne] = useState<Bracket>({})
  const [bracketTwo, setBracketTwo] = useState<Bracket>({
    "0": { a: "", b: "" },
    "1": { a: "", b: "" },
  })
  const [bracketThree, setBracketThree] = useState<Bracket>({
    "0": { a: "", b: "" },
  })
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "1000px" }}>
        <h1><Bracket bracket={bracketOne} winnerSelected={(winner, index) => {
          const newBracketOne = { ...bracketOne }
          const newBracketTwo = { ...bracketTwo }

          if (newBracketOne[index].a === winner) newBracketOne[index].a = ""
          if (newBracketOne[index].b === winner) newBracketOne[index].b = ""

          const indexTwo = index < 2 ? 0 : 1
          if (!newBracketTwo[indexTwo].a) {
            newBracketTwo[indexTwo].a = winner
          }
          else {
            newBracketTwo[indexTwo].b = winner
          }
          setBracketOne(newBracketOne)
          setBracketTwo(newBracketTwo)
        }} /></h1>
        <h1><Bracket bracket={bracketTwo} winnerSelected={(winner, index) => {
          const newBracketTwo = { ...bracketTwo }
          const newBracketThree = { ...bracketThree }

          if (newBracketTwo[index].a === winner) newBracketTwo[index].a = ""
          if (newBracketTwo[index].b === winner) newBracketTwo[index].b = ""

          if (!newBracketThree[0].a) {
            newBracketThree[0].a = winner
          }
          else {
            newBracketThree[0].b = winner
          }
          setBracketTwo(newBracketTwo)
          setBracketThree(newBracketThree)
        }} /></h1>
        <h1><Bracket bracket={bracketThree} winnerSelected={() => { }} />
        </h1>
      </div>
      <div className="card">
        <button onClick={() => {
          setBracketOne(builtStartingBracket())
        }}>
          Let the bot tournament begin!
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}


interface BracketProps { bracket: Bracket, winnerSelected: (winner: string, index: number) => void }
export const Bracket: FC<BracketProps> = (props) => {

  return <>{Object.values(props.bracket).map((warrior, index) => {
    const isDone = !warrior.a || !warrior.b

    return <div key={index} style={{ paddingBottom: "20px" }}>
      <div onClick={() => {
        if (isDone) return

        props.winnerSelected(warrior.a, index)
      }}>{warrior.a}</div>
      <div onClick={() => {
        if (isDone) return

        props.winnerSelected(warrior.b, index)
      }}>{warrior.b}</div>
    </div>
  })}</>
}

export default App
