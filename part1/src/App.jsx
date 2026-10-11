
import { useState } from 'react'
// const App = () => {

//   const [counter, setCounter] = useState(0)
//   console.log('rendering...', counter)
//   console.log('rendering with counter value', counter)


//   const incrementCounter = () => {
//     setCounter(counter + 1)
//   }
//   const decrementCounter = () => {
//     console.log('decreasing, value before', counter)
//     if (counter <= 0) return
//     setCounter(counter - 1)
//   }

//   const setZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }


//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }
//   return (
//     <div>
//       <Header course={course} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//       <div>
//         <Button onClick={incrementCounter} text="increment counter" />
//         <Button onClick={setZero} text="set zero" />
//         <Button onClick={decrementCounter} text="decrement counter" />
//         <Display counter={counter} />
//       </div>
//     </div>
//   )
// }

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updateleft = left + 1
    setLeft(updateleft)
    setTotal(updateleft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left" />
      <Button onClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  )
}
export default App


const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' , ')}
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}
