import { useState, useEffect } from 'react'

const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>


const Statistics = ({ statistics }) => {
  if (statistics.allfeedback === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={statistics.good} />
        <StatisticLine text="neutral" value={statistics.neutral} />
        <StatisticLine text="bad" value={statistics.bad} />
        <StatisticLine text="all" value={statistics.allfeedback} />
        <StatisticLine text="average" value={statistics.average} />
        <StatisticLine text="positive" value={statistics.positive + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const allfeedback = good + neutral + bad
  const average = allfeedback === 0 ? 0 : (good - bad) / allfeedback
  const positive = allfeedback === 0 ? 0 : (good / allfeedback) * 100
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }


  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    allfeedback: allfeedback,
    average: average,
    positive: positive
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App