const Persons = ({ persons, removePerson }) => {


    return (
        <div>
            {persons.length > 0 ? (
                <div>
                    {persons.map(person => (
                        <p key={person.id}>
                            <span>name: {person.name}</span> <span>number: {person.number}</span> <button  onClick={() => removePerson(person.id)}>delete</button>
                        </p>
                    ))}

                </div>
            ) : (
                <p>No persons in phonebook</p>
            )}
        </div>)
}


export default Persons