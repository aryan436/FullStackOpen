import { useState } from "react";
const Statistics = ({ good, bad, neutral }) => {
  if (good + bad + neutral === 0) {
    return <p>No feedback given</p>
  }
    return (
      <>
        <h1>Statistics</h1>
        <Display review="good" count={good} />
        <Display review="neutral" count={neutral} />
        <Display review="bad" count={bad} />
        <Total good={good} bad={bad} neutral={neutral} />
        <Average good={good} bad={bad} neutral={neutral} />
        <Percentage good={good} bad={bad} neutral={neutral} />
      </>
    );
}
const Display = ({ review, count }) => (
  <p>
    {review}:{count}
  </p>
);
const Total = ({ good, bad, neutral}) => {
  const total= good+bad+neutral
  return <p>total feedbacks collected are :  { total}</p>
}
const Average = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  const totalScore = good - bad
  return <p>Average score is { totalScore/(total)}</p>
}
const Percentage = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  return <p>Percentage of positive feedbacks are : {(good/total)*100}%</p>
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
