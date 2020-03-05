import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => <p>{props.part} {props.exercises}</p>;

const Content = (props) => {
    return (<>
        {props.parts.map(part =>
            <Part
                key={part.id}
                part={part.name}
                exercises={part.exercises}
            />)}
    </>)
}

const Total = (props) => <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>;

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))