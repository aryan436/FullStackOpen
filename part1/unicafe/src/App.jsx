import { useState } from "react";
const StatisticLine = ({text, value}) => {
  return <p>{text} : { value}</p>
}
const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  const average = (good - bad) / total
  const positive = (good/total)*100
  if (total === 0) {
    return <p>No feedback given</p>
  }
    return (
      <>
        <h1>Statistics</h1>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"total"} value={total} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={`${positive}%`} />
      </>
    );
}
const Button = ({onClick, text}) => {
  return <button onClick={onClick} >{ text}</button>;
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
        onClick={() => {
          setGood(good + 1);
        }}
        text="Good"
      />
      <Button
        onClick={() => {
          setNeutral(neutral + 1);
        }}
        text="Neutral"
      />
      <Button
        onClick={() => {
          setBad(bad + 1);
        }}
        text="Bad"
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
