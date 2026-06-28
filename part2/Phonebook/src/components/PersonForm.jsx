import Input from "./Input";
const PersonForm = ({handleAdd,handleNewName,newName,handleNewPhone,newPhone}) => {
    return <form onSubmit={handleAdd}>
      <Input text={"name:"} onChange={handleNewName} value={newName} />
      <Input text={"number:"} onChange={handleNewPhone} value={newPhone} />
      <button type="submit">add</button>
      
    </form>;
}
export default PersonForm