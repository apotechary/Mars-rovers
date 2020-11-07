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

// your API calls

//example API call
app.get('/apod', async (req, res) => {
    try {
        // get todays image data from nasa
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        // send nasa data back to client    
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
app.get('/currentPage', async (req, res) => {
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


// app.get('/rovers', async(req,res) => {
//     try {
//         let 
//     }
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))