const App = () => {



  const Header = (props) => {
    console.log("header ",props.course)
    return (
      <div>
        <h1>{props.course.name}</h1>
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

  const Content = (props) => {
    const parts1=props.parts.parts;
    console.log("parts1 ",props.parts.parts)
    return (
      <>
        <Part part={parts1[0].name} exercises={parts1[0].exercises} />
        <Part part={parts1[1].name} exercises={parts1[1].exercises} />
        <Part part={parts1[2].name} exercises={parts1[2].exercises} />
      </>
    )

  }
  const Total = (props) => {
    console.log(props.parts.parts)
    const parts1=props.parts.parts
    return (
      <>
        <p>Number of exercises {parts1[0].exercises + parts1[1].exercises + parts1[2].exercises}</p>
      </>

    )
  }

   const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (

    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />

    </div>
  )
}

export default App