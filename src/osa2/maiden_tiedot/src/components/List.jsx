const List = ({ list, countries, setList, setDetails }) => {

    const select = (id) => {
        console.log(id + ' selected')
        const filteredCountries = countries.filter(country => country["name"]["common"].toLowerCase() === id.toLowerCase())
        setList(null)

        const parsedData = filteredCountries.map(country => { return { "name": country["name"]["common"], "capital": country["capital"], "area": country["area"], "languages": Object.values(country["languages"]), "flag": country["flag"] } })
        setDetails(parsedData)
        console.log(parsedData)
    }

    const label = 'show'

    if (!list)
        return (null)
    else
        return (
            <table >
                <tbody>
                    {list.map(l => <tr key={l}><td>{l}</td><td><button onClick={() => select(l)}>{label}</button></td></tr>)}
                </tbody>
            </table>
        )
}

export default List