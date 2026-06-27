import { useState } from "react";
const Display = ({ review, count }) => (
  <p>
    {review}:{count}
  </p>
);
const Total = ({total}) => {
  return <p>total feedbacks collected are :  { total}</p>
}
const Average = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  const totalScore = good - bad
  if (total === 0) {
    return <p>Average score is 0</p>
  }
  
  return <p>Average score is { totalScore/(total)}</p>
}
const Percentage = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  if (total === 0) {
    return <p>Percentage of positive review is 0%</p>;
  }
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
      <Display review="good" count={good} />
      <Display review="neutral" count={neutral} />
      <Display review="bad" count={bad} />
      <Total total={good + bad + neutral} />
      <Average good={good} bad={bad} neutral={neutral} />
      <Percentage good={good} bad={bad} neutral={neutral}/>
    </div>
  );
};

export default App;
