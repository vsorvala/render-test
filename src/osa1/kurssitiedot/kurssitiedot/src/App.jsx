const App = () => {


  const Header = () => {
    return (
      <div>
        <h1>{course}</h1>
      </div>

    )
  }

  const Part = (props) => {
    return (
      <>
         <p>
          {props.part} {props.exercises}
        </p>
      </>

    )
  }

  const Content = () => {
    return (
      <>
        <Part part={part1} exercises={exercises1} />
        <Part part={part2} exercises={exercises2} />
        <Part part={part3} exercises={exercises3} />
      </>
    )

  }
  const Total = () => {
    return (
      <>
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
      </>

    )
  }
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (

    <div>
      <Header course={course} />
      <Content />
      <Total />

    </div>
  )
}

export default App