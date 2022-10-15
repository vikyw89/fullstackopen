import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log(points)

  const handleVote = () => {
    console.log('handleVote')
    const newVote = [...points]
    newVote[selected] += 1
    setPoints(newVote)
  }

  const handleNextAnecdote = () => {
    console.log('nextAnectdote')
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const mostVoted = () => {
    console.log('mostVoted')
    for (let index in points) {
      console.log(Math.max(...points))
      console.log(index)
      if (Math.max(...points) === points[index]) {
        console.log(index)
        return (index)
      }
    }
  }
  return (
    <div>
      <div>
        <h1>
          Anecdote of the day
        </h1>
        <p>
          {anecdotes[selected]}
        </p>
        <p>
          has {points[selected]} votes
        </p>
      </div>
      <div>
        <button onClick={handleVote}>
          vote
        </button>
        <button onClick={handleNextAnecdote}>
          next anecdote
        </button>
      </div>
      <div>
        <h1>
          Anecdote with most votes
        </h1>
        <p>
          {anecdotes[mostVoted()]}
        </p>
        <p>
          has {Math.max(...points)} votes
        </p>
      </div>
    </div>
  )
}

export default App