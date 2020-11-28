require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))

// API call to NASA for Image of the day
app.get('/apod', async (req, res) => {

    try {
        let todaysdate = new Date();
        let date = todaysdate.getFullYear() + "-" + `${todaysdate.getMonth() + 1}` + "-" + todaysdate.getDate();
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}&date=${date}`)
            .then(res => res.json())
        // send nasa data back to client    
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
app.get('/marsweather', async (req, res) => {
    try {
        // get today's weather data from nasa 
        let weather = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`)
            .then(r => r.json())
        //send nasa weather data back to client
        res.send({ weather })
    } catch (err) {
        console.log('error:', err);

    }
})
app.get('/roverinfo', async (req, res) => {
    try {
        // to get most recent pictures taken by the rover we need the last day photos were taken by rover from NASA's rover manifest API
        let roverName = req.query.rname;
        let roverData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        // Using the Date data from NASA's rover manifest API, make a call to get most recent photos by each rover.
        let recentDate = roverData.photo_manifest.max_date;
        let photoData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${recentDate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        // Send both data i.e facts about rover along with picture data
        res.send({ info: roverData, photoInfo: photoData })
    } catch (err) {
        console.log('error:', err)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))