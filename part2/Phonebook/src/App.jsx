import { useState } from "react";
import Input from "./components/Input";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personsService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    })
  },[])
  const handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .updatePerson(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person,
              ),
            );
            setNewName('')
            setNewPhone('')
          });
      }
      return
    }
    personsService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("")
      setNewPhone("")
    })
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewPhone = (event) => {
    setNewPhone(event.target.value);
  }
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(person=>person.id===id).name}?`)) {
      personsService.deletePerson(id).then(() => {
        setPersons(
          persons.filter(person => person.id !== id)
        );
      });
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Input text={"filter shown with"} onChange={handleFilter} value={filter} />
      <h2>add a new</h2>
      <PersonForm handleAdd={handleAdd} handleNewName={handleNewName} newName={newName} newPhone={newPhone} handleNewPhone={handleNewPhone} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;