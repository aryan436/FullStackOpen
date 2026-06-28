import { useState } from "react";
import Input from "./components/Input";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const handleAdd = (event) => {
    event.preventDefault();
    const exists = persons.some((person) => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newPhone,
      id:persons.length+1
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
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Input text={"filter shown with"} onChange={handleFilter} value={filter} />
      <h2>add a new</h2>
      <PersonForm handleAdd={handleAdd} handleNewName={handleNewName} newName={newName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  );
};

export default App;
