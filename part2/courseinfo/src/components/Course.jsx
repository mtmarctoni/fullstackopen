const Header = ({ title }) => {
    return (
      <header>
          <h1>{title}</h1>
      </header>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <main>
        <ul>
          {parts.map((part, i) => {
            return(
            <li key={i}>
              <Part name={part.name} exercises={part.exercises} />
            </li>
            )
          }
        )}
        </ul>
        
      </main>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
        <p>
          {name} {exercises}
        </p>
    )
  }
  
  const Total = ({ totalExercises }) => {
    return (
      <div>
          <p><strong>Number of exercises {totalExercises}</strong></p>
            </div>
    )
  }

const Course = ({ course }) => {

    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <Header
            title={course.name}
            />
            <Content
            parts={course.parts}
            />
            <Total
            totalExercises={totalExercises}
            />
        </div>    
    )
}

export default Course