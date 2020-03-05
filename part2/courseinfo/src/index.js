import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h2>{props.course}</h2>;

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

const Total = ({ parts }) => <p><strong>Total of {parts.reduce((sum, el) => sum += el.exercises, 0)} exercises</strong></p>;

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Courses = ({ courses }) => {
    return (
        <>
            {courses.map(course =>
                <Course
                key={course.id}
                course={course} 
                 />
            )}
        </>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
                },
                {
                    name: 'Redus',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            <Courses courses={courses} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))