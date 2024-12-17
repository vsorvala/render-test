const Header = ({ name }) => {
  console.log("name", name)
  return (
    <h1>{name} </h1>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>

  )
}

const Content = ({ parts }) => {

  console.log("parts ", parts)
  const osiot = parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)
  return (
    <>
      {osiot}

    </>
  )

}

const Total = ({ parts }) => {
  console.log(parts)
  var total = parts.reduce((sum, part) => {return sum + part.exercises}, 0)
  return (
    <>
      <b>Total of {total} exercises</b>
    </>

  )
}

const Course = ({ name, parts}) => {
    return (
      <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
    )
  }

  export default Course