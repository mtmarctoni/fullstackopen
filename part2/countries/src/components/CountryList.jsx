const CountryList = ({ countries, onShow }) => {
    if (countries.length === 1) return null
    if (countries.length > 10) return <div>Too many countries, specify another filter</div>
    if (countries.length === 0) return <div>No country found with that filter</div>
    return (
        <section>
            <h2>Country List</h2>
            <ul>
            {
                countries.map((country, i) =>
                    <li key={i} style={{margin: 5}}>
                        
                        {country}
                        <button style={{ marginLeft: 10 }} onClick={() => onShow(country)}>                        
                        Show</button>                                               
                    </li>
                )
            }
            </ul>
        </section>
    )
}

export default CountryList