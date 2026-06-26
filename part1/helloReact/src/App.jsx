const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        {" "}
        Hello {props.name} , you are {props.age} years old
      </p>
    </div>
  );
}
const App = () => {
  const name = "Aryan"
  const age = 19
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age= {age} />
      <Hello name="Vanshika" age ={18}/>
    </div>
  );
}

export default App;
