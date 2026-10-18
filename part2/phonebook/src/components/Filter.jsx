

const Filter = ({ filter, handleFilterChange }) => {
    return (
        <div>filter showen with:
            <input
                value={filter}
                onChange={handleFilterChange}
            />
        </div>)
}

export default Filter