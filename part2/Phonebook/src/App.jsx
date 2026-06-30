import { useState } from "react";
import Input from "./components/Input";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({message:null,status:null});
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
            setMessage({ message: `Changed ${existingPerson.name}'s number` ,status:"success"});
            setTimeout(() => {
              setMessage({
                message: null,
                status: null,
              });

            },5000);
          }).catch((error) => {
            setMessage({ message: `Information of ${existingPerson.name} has already been removed from server` ,status:"error"})
            setTimeout(() => {
              setMessage({message:null,status:null})
            },5000)
          });
      }
      return
    }
    personsService.create(newPerson).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("")
      setNewPhone("")
      setMessage({ message: `Added ${newPerson.name}` ,status:"success"});
      setTimeout(() => {
        setMessage({
          message: null,
          status: null,
        });
      }, 5000);
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
  console.log(message);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} status={message.status} />
      <Input
        text={"filter shown with"}
        onChange={handleFilter}
        value={filter}
      />
      <h2>add a new</h2>
      <PersonForm
        handleAdd={handleAdd}
        handleNewName={handleNewName}
        newName={newName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;