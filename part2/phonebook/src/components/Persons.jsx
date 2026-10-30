const Persons = ({ persons, removePerson }) => {


    return (
        <div>
            {persons.length > 0 ? (
                <ul>
                    {persons.map(person => (
                        <li key={person.id}>
                            <span>{person.name}</span> <span>{person.number}</span> <button  onClick={() => removePerson(person.id)}>delete</button>
                        </li>
                    ))}

                </ul>
            ) : (
                <p>No persons in phonebook</p>
            )}
        </div>)
}


export default Persons