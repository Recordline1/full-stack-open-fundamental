
const Input = ({ value, onChange, label }) => {
    return (
        <>
            <tr>
                <td>
                    <label>
                        {label}:
                    </label>
                </td>
                <td>
                    <input
                        value={value}
                        onChange={onChange}
                    />
                </td>
            </tr>
        </>
    )
}

const PersonForm = ({ name, number, handleNameChange, handleNumberChange, addPerson }) => {
    return (
        <>
            <form onSubmit={addPerson}>
                <table>
                    <tbody>
                        <Input
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            label="name"
                        />
                        <Input
                            value={number}
                            onChange={(e) => handleNumberChange(e.target.value)}
                            label="number"
                        />
                    </tbody>
                </table>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>)
}


export default PersonForm