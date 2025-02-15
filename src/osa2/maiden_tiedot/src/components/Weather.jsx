const Weather = ({ weather }) => {

    if (!weather)
        return (null)
    else {

        const icon =`https://openweathermap.org/img/wn/`+weather.weather[0].icon +`@2x.png`


        return (
            <>

                <h2>Weather in {weather.name}</h2>
                temperature {weather.main.temp} Celsius<br />
                <img src={icon}/> <br/>
                wind {weather.wind.speed} m/s<br />



            </>
        )
    }
}

export default Weather