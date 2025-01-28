import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text} :</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, bad, neutral }) => {
    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticsLine text={"Good"} value={good} />
                    <StatisticsLine text={"Neutral"} value={neutral} />
                    <StatisticsLine text={"Bad"} value={bad} />
                    <StatisticsLine text={"All"} value={good + neutral + bad} />
                    <StatisticsLine
                        text={"Average"}
                        value={(good - bad) / (neutral + bad + good)}
                    />
                    <StatisticsLine
                        text={"Average"}
                        value={` ${(good / (neutral + bad + good)) * 100}% `}
                    />
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Give Feedback</h1>
            <div>
                <button onClick={() => setGood(good + 1)}>Good</button>
                <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
                <button onClick={() => setBad(bad + 1)}>Bad</button>
            </div>
            {good || bad || neutral ? (
                <Statistics good={good} bad={bad} neutral={neutral} />
            ) : (
                <p>No Feedback given</p>
            )}
        </div>
    );
};

export default App;
