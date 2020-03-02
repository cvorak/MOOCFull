import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad, count, getAvg, getPos}) => {
    
    if (count === 0) {
        return (
            <>
            <h1>sttistics</h1>
            <div>no feedback given</div>
            </>
        )
    }

    return (
        <>
            <h1>statistics</h1>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <div>all {count}</div>
            <div>average {getAvg()}</div>
            <div>positive {getPos()}%</div>
        </>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [count, setCount] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setCount(count + 1)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setCount(count + 1)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setCount(count + 1)
    }

    const getAverage = () => (good - bad) / count
    const getPositive = () => good / count * 100
    
    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} count={count} getAvg={getAverage} getPos={getPositive} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)