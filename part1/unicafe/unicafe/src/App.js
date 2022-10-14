import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    console.log('handleClickGood')
    setGood(good + 1)
  }
  const handleClickNeutral = () => {
    console.log('handleClickNeutral')
    setNeutral(neutral + 1)
  }
  const handleClickBad = () => {
    console.log('handleClickBad')
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>
        give feedback
      </h1>
      <button onClick={handleClickGood}>
        good
      </button>
      <button onClick={handleClickNeutral}>
        neutral
      </button>
      <button onClick={handleClickBad}>
        bad
      </button>
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
      all {good + neutral + bad}      
    </p>
    <p>
      average {((good*1 + neutral*0 + bad*(-1))*100)/(good + neutral + bad)}%
    </p>
    <p>
      positive {good*100/(good+neutral+bad)}%
    </p>
    </div>
  )
}

export default App