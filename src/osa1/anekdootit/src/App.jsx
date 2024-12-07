import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.header} </h1>
  )
}

const Display = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.counter}</td></tr>
  )
}

const Display2 = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.counter} % </td></tr>

  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

// oikea paikka komponentin määrittelyyn
const Statistics = (props) => {
  if (props.total == 0) {
    return (<div>
      No feedback given
    </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine value={props.good} text="good" />
        <StatisticLine value={props.neutral} text="neutral" />
        <StatisticLine value={props.bad} text="bad" />
        <StatisticLine value={props.total} text="sum" />
        <StatisticLine value={props.avarage} text="avarage" />
        <StatisticLine value={props.positive} text="positive" />
      </tbody>
    </table>
  )
}

// oikea paikka komponentin määrittelyyn
const StatisticLine = (props) => {
  if (props.text == "positive")
    return (<>

      <Display2 counter={props.value} text={props.text} />
    </>)
  return (
    <>

      <Display counter={props.value} text={props.text} />
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.'
]

// oikea paikka komponentin määrittelyyn
const ShowAnecdote = (props) => {
  const anecdote = props.anecdote
  return (
    <>
      {anecdote}
    </>
  )
}

// oikea paikka komponentin määrittelyyn
const ShowVotes = (props) => {
  return (
    <>
      has {props.votes} votes
    </>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


const App = () => {
  // tallenna napit omaan tilaansa  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avarage, setAvarage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [selected, setSelected] = useState(0)
  const n = anecdotes.length
  const a = Array(n).fill(0)
  const alku = {}
  for (let i = 0; i < a.length; i++) {
    alku[i] = a[i]
  }
  console.log("arr ", alku)
  const [points, setPoints] = useState(alku)
  const [index, setIndex] = useState(0)


  const increaseGood = () => {
    console.log('increasing, good before', good)
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedTotal = updatedGood + neutral + bad
    setTotal(updatedTotal)
    const updatedAvarage = (updatedGood - bad) / updatedTotal
    setAvarage(updatedAvarage)
    const updatedPositive = 100 * updatedGood / updatedTotal
    setPositive(updatedPositive)

  }

  const increaseNeutral = () => {
    console.log('increasing, neutral before', neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedTotal = good + updatedNeutral + bad
    setTotal(updatedTotal)
    const updatedAvarage = (good - bad) / updatedTotal
    setAvarage(updatedAvarage)
    const updatedPositive = 100 * good / updatedTotal
    setPositive(updatedPositive)
  }

  const increaseBad = () => {
    console.log('increasing, bad before', bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedTotal = good + neutral + updatedBad
    setTotal(updatedTotal)
    const updatedAvarage = (good - updatedBad) / updatedTotal
    setAvarage(updatedAvarage)
    const updatedPositive = 100 * good / updatedTotal
    setPositive(updatedPositive)
  }

  const selectAnecdote = () => {
    const random = getRandomInt(anecdotes.length - 1)
    setSelected(random)
  }

  const voteAnecdote = () => {
    
    const copy = { ...points }
    // kasvatetaan olion kentän selected arvoa yhdellä
    copy[selected] += 1
    setPoints(copy)
    console.log("äänet", points)
    if (copy[selected]>copy[index]){
      //const max=copy[selected]
      //const ind=selected
      setIndex(selected)
    }
    
  }



    return (
      <div>
        <Header header="give feedback" />
        <Button handleClick={increaseGood} text="good" />
        <Button handleClick={increaseNeutral} text="neural" />
        <Button handleClick={increaseBad} text="bad" />

        <Header header="statistics" />
        <Statistics good={good} neutral={neutral} bad={bad} total={total} avarage={avarage} positive={positive} />
        <Header header="Anecdote of the day" />
        <ShowAnecdote anecdote={anecdotes[selected]} />
        <br />
        <ShowVotes votes={points[selected]} />
        <br />
        <Button handleClick={selectAnecdote} text="next anecdote" />
        <Button handleClick={voteAnecdote} text="vote" />


        <Header header="Anecdote with most votes" />
        <ShowAnecdote anecdote={anecdotes[index]} />
        <br />
        <ShowVotes votes={points[index]} />
        <br />




      </div>

    )
  }





  export default App