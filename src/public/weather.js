const getWeather = () => {
    getWeatherData()
    const weatherData = store.weather
    const sol1 = weatherData.sol_keys.splice(4);
    const sol = weatherData.sol_keys
    console.log(sol);
    let temp = "<div class='col-md-6 weather'>"
    temp += `<ul class="list-group">`
    sol.forEach(d => {
        temp += `<span>${d}</span>`;
        temp += getTempInfo(weatherData[d]);
    })
    temp += `</ul>`;
    temp += `</div>`;

    return temp
}
// function that will return average temprature if it exists if not will return atmospheic temprature for the sol day
const getTempInfo = (tempInfo) => {
    if (!tempInfo.AT) {
        return ` 
        <li class= "list-group-item"> Temprature recording is pending for this sol day  </li>
            <li class="list-group-item"> Atmospheric Pressure recorded between ${tempInfo.First_UTC} - ${tempInfo.Last_UTC}: ${tempInfo.PRE.av} pascals </li>
        `
    }
    return `
        <li class="list-group-item"> Atmospheric Tempreture recorded between ${tempInfo.First_UTC} - ${tempInfo.Last_UTC}: ${tempInfo.AT.av * 1.8 + 32}°F </li>
       
    `
}
const getWeatherData = () => {
    fetch(`http://localhost:3000/marsweather`)
        .then(res => res.json())
        .then(weather => updateStore(store, weather))
}