const Filter = ({filter, onFilter}) => {

    return (
        <header>
            <h3>Filter</h3>
            <p>Find country: <input value={filter} onChange={onFilter}/></p>
        </header>
    )
}

export default Filter