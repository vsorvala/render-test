import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
  const request = axios
    .get(`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=` + capital + `&appid=` + api_key)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  return request.then(response => response.data)
}

export default { getWeather, getAll }