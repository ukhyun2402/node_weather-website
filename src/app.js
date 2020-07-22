const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config 
const publicDir = path.join(__dirname, '..', 'public',);
const viewsPath = path.join(__dirname,'..','templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ukhyun',
    });
});

// app.com/about
app.get('/about', (req, res) => {
    res.render('about',{
        title: "About",
        name: 'Ukhyun',
    });
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Hello How can I help you?',
        name: 'Ukhyun'
    });
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address term',
        });
    }
    geocode.geo(req.query.address, (err, {location, longitude, latitude} = {}) => {
        if (err) {
            return res.send({error:'Please check your address'});
        }
        forecast.forecast(longitude, latitude, (err, {current}) => {
            if(err) { 
                console.log('here');
                return res.send(err);
            }
            res.send({
                forecast:current.weather_descriptions[0],
                location,
                address: req.query.address,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You muse provide a search term',
        });
    }

    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page',{
        title: '404',
        msg: 'Help Articl not found',
        name:'uhykun',
    });
});

app.get('*', (req, res) => {
    res.render('404page',{
        title: '404',
        msg: 'Page not found',
        name:'uhykun',
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});