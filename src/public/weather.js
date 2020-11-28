const getWeather = () => {
    getWeatherData()
    const weatherData = store.weather
    const sol = weatherData.sol_keys
    // const sol = weatherData.sol_keys
    let temp = "<div class='col-md-3'>"
    temp += `<ul class="list-group">`
    sol.forEach(d => {
        temp += `<span>${d}</span>`;
        temp += getTempInfo(weatherData[d]);
    })
    temp += `</ul>`;
    temp += `</div>`;

    return temp
}
const getTempInfo = (tempInfo) => {
    if (!tempInfo.AT) {
        return `
            <li class="list-group-item"> Atmospheric Pressure ${tempInfo.PRE.av} pascals </li>
        `
    }
    return `
        <li class="list-group-item"> Atmospheric Tempreture ${tempInfo.AT.av * 1.8 + 32}°F </li>
    `
}
const getWeatherData = () => {
    fetch(`http://localhost:3000/marsweather`)
        .then(res => res.json())
        .then(weather => updateStore(store, weather))
}