import { useState } from 'react'

const StatisticLine = ({name, value}) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{value}</td>
  </tr>
  )
}
const Statistics = ({ good, neutral, bad }) => {

  const allFeedback = good + neutral + bad
  const average = ((good - bad) / allFeedback).toFixed(2)
  const positive = `${((good / allFeedback) * 100).toFixed(2)}%`


  if (allFeedback === 0) return (
    <main>
      <h1>Statistics</h1>
      <p>No feedback given</p>
    </main>
  )

  return (
    <main>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="Average" value={average} />
          <StatisticLine name="Positive" value={positive} />
        </tbody>
      </table>
    </main>
  )
}

const Button = ({ type, onClick }) => {
  
  return (
    <button onClick={onClick}>
      {type}
    </button>
  )
}
const Feedback = ({good, neutral, bad, onClickGood, onClickNeutral, onClickBad}) => {

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button type='good' feedback={good} onClick={onClickGood}  />
      <Button type='neutral' feedback={neutral} onClick={onClickNeutral}/>
      <Button type='bad' feedback={bad} onClick={onClickBad}/>      
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    //console.log("click good", good)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    //console.log("click neutral", neutral)
    
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    //console.log("click bad", bad)

  }

  return (
    <div>
      <Feedback
        good={good}
        neutral={neutral}
        bad={bad}
        onClickGood={handleClickGood}
        onClickNeutral={handleClickNeutral}
        onClickBad={handleClickBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App