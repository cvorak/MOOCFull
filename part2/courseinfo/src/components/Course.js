import React from 'react'

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

export default Course