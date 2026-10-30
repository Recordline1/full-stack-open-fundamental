import CountryDetails from './CountryDetails'

const Countries = ({ countries, selectedCountry, setSelectedCountry }) => {
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    if (countries.length === 1) {
        return (
            <CountryDetails country={countries[0]} />
        )
    }

    return (
        <div>
            <ul>
                {countries.map(country => {
                    return (
                        <li key={country.name.common}>
                            {country.name.common}
                            <button onClick={() => setSelectedCountry(country.cca3)}>Showe</button>
                        </li>
                    )
                })}
            </ul>
                {selectedCountry && <CountryDetails country={countries.find(c => c.cca3 === selectedCountry)} />}
        </div>
    )
}

export default Countries