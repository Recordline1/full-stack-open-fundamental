const Persons = ({ persons }) => {

    
    return (
        <div>
            {persons.length > 0 ? (
                <div>
                    {persons.map(person => (
                        <p key={person.id}>
                            name: {person.name} <br /> 
                            number: {person.number}</p>
                    ))}
                </div>
            ) : (
                <p>No persons in phonebook</p>
            )}
        </div>)
}


export default Persons