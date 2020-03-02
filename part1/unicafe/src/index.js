import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad, count, getAvg, getPos }) => {
    if (count === 0) {
        return (
            <>
                <h1>statistics</h1>
                <div>no feedback given</div>
            </>
        )
    }

    return (
        <>
            <h1>statistics</h1>
            <Statistic text={'good'} value={good} />
            <Statistic text={'neutral'} value={neutral} />
            <Statistic text={'bad'} value={bad} />
            <Statistic text={'all'} value={count} />
            <Statistic text={'average'} value={getAvg()} />
            <Statistic text={'positive'} value={getPos()} />
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