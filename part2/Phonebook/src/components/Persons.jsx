import Person from "./Person";
const Persons = ({ personsToShow ,handleDelete}) => {
        return personsToShow.map((person) => {
            return <Person key={person.id} person={person} handleDelete={handleDelete} />

        });
    
}
export default Persons