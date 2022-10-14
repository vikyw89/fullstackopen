import { useState } from 'react'

const Statistics = ({props}) => {
  console.log('👉Statistics')
  console.log(props)
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1))*100/all
  const positive = (good*100)/all
  if (all === 0) {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>
        statistics
      </h1>
      <p>
        good {good}
      </p>
      <p>
        neutral {neutral}
      </p>
      <p>
        bad {bad}
      </p>
      <p>
        all {all}      
      </p>
      <p>
        average {average}%
      </p>
      <p>
        positive {positive}%
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <>
      <div>
        <h1>
          give feedback
        </h1>
        <button onClick={()=>setGood(good + 1)}>
          good
        </button>
        <button onClick={()=>setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={()=>setBad(bad + 1)}>
          bad
        </button>
      </div>
      <Statistics props={{good, neutral, bad}}/>
    </>
  )
}

export default App