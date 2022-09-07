import { Children, FC, ReactNode, useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import background from "./assets/radical.png";

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
  const [bracketOne, setBracketOne] = useState<Bracket | null>(null)
  const [bracketTwo, setBracketTwo] = useState<Bracket>({
    "0": { a: "", b: "" },
    "1": { a: "", b: "" },
  })
  const [bracketThree, setBracketThree] = useState<Bracket>({
    "0": { a: "", b: "" },
  })

  if (!bracketOne) return (
    <div>
      <button onClick={() => {
        setBracketOne(builtStartingBracket())
      }}>
        Let the bot tournament begin!
      </button>
    </div>

  )

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", width: "1000px", height: "800px", alignItems: "center", backgroundImage: `url(${background})`
        , backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
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
    </div>
  )
}


interface BracketProps { bracket: Bracket, winnerSelected: (winner: string, index: number) => void }
export const Bracket: FC<BracketProps> = (props) => {

  return <>{Object.values(props.bracket).map((warrior, index) => {
    const isDone = !warrior.a || !warrior.b

    return <div key={index} style={{ paddingBottom: "20px" }}>
      <BracketBox>
        <div onClick={() => {
          if (isDone) return

          props.winnerSelected(warrior.a, index)
        }}>{warrior.a}</div>
      </BracketBox>
      <BracketBox>
        <div onClick={() => {
          if (isDone) return

          props.winnerSelected(warrior.b, index)
        }}>{warrior.b}</div>
      </BracketBox>
    </div>
  })}</>
}
interface BracketBoxProps { children?: ReactNode }
const BracketBox: FC<BracketBoxProps> = ({ children }) => {
  return <div style={{
    display: "flex", justifyContent: "center",
    alignItems: "center", width: "200px", height: "50px", borderWidth: "5px",
    borderColor: "#3f91a7", backgroundColor: "#306993", margin: "20px", color: "white",
    borderStyle: "solid",
    borderRadius: "5px",
    boxShadow: '1px 2px 9px #0ff'
  }} >
    {children}
  </div>
}

export default App
