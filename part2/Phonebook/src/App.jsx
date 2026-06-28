import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };

    setPersons(persons.concat(newPerson));
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={persons.name}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
