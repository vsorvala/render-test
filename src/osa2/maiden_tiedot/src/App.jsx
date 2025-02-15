import { useState, useEffect } from 'react'
import List from './components/List'
import Details from './components/Details'
import Weather from './components/Weather'
import countryService from './services/countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [list, setList] = useState(null)
  const [details, setDetails] = useState(null)
  const [text, setText] = useState("")
  const [weather, setWeather] = useState(null)

  useEffect(() => {

    if (details) {
      console.log('fetching weather data')
      countryService.getWeather(details[0].capital)
        .then(data => {
          console.log("weather data ", data)
          setWeather(data)
        })
    }

  }, [details])


  useEffect(() => {
    console.log('fetching contries json')
    countryService.getAll()
      .then(data => {
        setCountries(data)
      })

  }, [])


  const handleChange = (event) => {
    const value = event.target.value
    console.log("You typed: ", value)
    setValue(value)
    //const filteredCountries = countries.filter(country => country["name"]["common"].substring(0, len) == value)
    const filteredCountries = countries.filter(country => country["name"]["common"].toLowerCase().includes(value.toLowerCase()))

    console.log(filteredCountries.length, " ", filteredCountries)
    if (filteredCountries.length <= 10) {
      setText("")
      if (filteredCountries.length > 1) {
        const c = filteredCountries.map(country => country["name"]["common"])
        setList(c)
        setDetails(null)
        setText("")
        console.log("countries: ", c)
        setWeather(null)
      }
      else if (filteredCountries.length == 1) {
        setList(null)

        const parsedData = filteredCountries.map(country => { return { "name": country["name"]["common"], "capital": country["capital"], "area": country["area"], "languages": Object.values(country["languages"]), "flag": country["flag"] } })
        setDetails(parsedData)
        console.log(parsedData)

      }
      else if (filteredCountries.length == 0) {
        setList(null)
        setDetails(null)
        setText("No matches!")
        setWeather(null)
      }
    }
    else {
      setList(null)
      setDetails(null)
      setText("Too many matches, spesify another filter")
      setWeather(null)

    }
  }


  return (
    <div>
      <form>
        find contries <input value={value} onChange={handleChange} />

      </form>
      <List list={list} countries={countries} setList={setList} setDetails={setDetails} />
      <Details details={details} />
      <Weather weather={weather} />
      {text}
    </div>
  )
}
export default App