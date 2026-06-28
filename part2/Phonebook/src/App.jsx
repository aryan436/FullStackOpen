import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Aryan Tomar",phone:"7869323122" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleAdd = (event) => {
    event.preventDefault();
    const exists = persons.some((person) => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      phone:newPhone
    };
    setPersons(persons.concat(newPerson));
    setNewName("")
    setNewPhone("")
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  };
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
    console.log(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.name}>{person.name} { person.phone}</p>;
      })}
    </div>
  );
};

export default App;
