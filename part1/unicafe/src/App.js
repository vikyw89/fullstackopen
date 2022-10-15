import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  console.log('👉StatisticLine')
  console.log({text, value})
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = ({props}) => {
  console.log('👉Statistics')
  console.log(props)
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  const average = (good*1 + neutral*0 + bad*(-1))*100/all + '%'
  const positive = (good*100)/all + '%'
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
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
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