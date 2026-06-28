const Input = ({ text, onChange, value })=>{
    return <div>
        {text}
        <input value={value} onChange={onChange} />
    </div>
}
export default Input