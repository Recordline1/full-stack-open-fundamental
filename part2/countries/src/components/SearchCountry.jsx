

const SearchCountry = ({ heandlechange, name }) => (
    <div>
        <p>Find countries</p>
        <input value={name} onChange={heandlechange} />
    </div>
)

export default SearchCountry