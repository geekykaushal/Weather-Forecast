const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT  || 4000

const forecast = require('./weather/forecast');

const geocode = require('./weather/geocode');
 //seting up a directory for express
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../template/views');
const partialpath = path.join(__dirname , '../template/partials');



app.use(express.static(publicDirectory));
//setup handlebars engine and views location
app.set('views', viewsDirectory);
app.set('view engine', 'hbs');
hbs.registerPartials(partialpath);

app.get('/', (req,res) =>{
    res.render('index', {
        title: 'Weather',
        author: 'Kaushal Kumar Jha'
    })
})

app.get('/weather', (req,res) =>{
    if (!req.query.address) {
        return res.send({
            Error: 'No Search Provided'
        })
    }

    geocode(req.query.address, (error, { longitude, lattitude, location } = {}) => {
        if (error) {
            res.send({ error })
        }

        forecast(longitude, lattitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})
     


app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About me',
        author: 'Ashish Shakya'
        
    })
})

app.listen(port, () =>{
    console.log("server has started" + port);
})