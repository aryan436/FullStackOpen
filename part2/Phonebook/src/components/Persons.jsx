import Person from "./Person";
const Persons = ({ personsToShow }) => {
        return personsToShow.map((person) => {
            return <Person key={person.id} person={person} />
        });
    
}
export default Persons