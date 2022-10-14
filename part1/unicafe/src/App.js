import { useState } from 'react'

const Statistics = ({props}) => {
  console.log('👉Statistics')
  console.log(props)
  return (
    <div>
      <h1>
        statistics
      </h1>
      <p>
        good {props.good}
      </p>
      <p>
        neutral {props.neutral}
      </p>
      <p>
        bad {props.bad}
      </p>
      <p>
        all {props.good + props.neutral + props.bad}      
      </p>
      <p>
        average {((props.good + props.neutral*0 + props.bad*(-1))*100)/(props.good + props.neutral + props.bad)}%
      </p>
      <p>
        positive {props.good*100/(props.good+props.neutral+props.bad)}%
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