//Calling packages to App
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const restaurant = require(`${__dirname}/restaurant.js`);

const app = express();
const port = process.env.PORT || 3000

//Defining directories to app
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

//Setting up View engine and Views 
app.set('view engine', 'pug');
app.set('views', viewsPath);

//Setting up parameters and public directory
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({extended: true}));

//Home page
app.get('/', (req, res) => {
    res.render('index',{
        name: 'Issac Timothy',
        title: 'Home'
    });
});

//Restaurants List Page
app.post('/restaurantsList', async (req, res) => {
    let city_Id = await restaurant.getCity(req.body.city)
    let restaurantDetails = await restaurant.getRestaurants(city_Id)
    res.render('restaurantsList', {
        name: 'Issac Timothy',
        restaurantDetails,
        title: 'Restaurants Available'
    });
});

//Specific Restaurant Details page
app.get('/restaurant', async (req, res) => {
    let res_detail = await restaurant.res_details(req.query.res_Id)
    res.render('resDetails', {
        res_detail,
        name: 'Issac Timothy',
        title: 'Restaurant Details'
    });
});

//Booking Conformation Page
app.get('/booked', (req, res) => {
    res.render('booked', {
        name: 'Issac Timothy',
        tilte: 'Booked'
    });
});

//Help Page
app.get('/help', (req, res)=> {
    res.render('help', {
        name: 'Issac Timothy',
        title: 'help'
    });
});

//About Page
app.get('/about', (req, res)=> {
    res.render('about', {
        name: 'Issac Timothy',
        title: 'About'
    });
});

//Other Help Articles
app.get('/help/*', (req, res)=> {
    res.render('404error', {
        Message: 'The Help Arcticle is not Found',
        title: 'Error 404'
    });
});

//Unknown Pages
app.get('*', (req, res) => {
    res.render('404error', {
        Message: 'Error. Page Doest Exist',
        title: 'Error 404'
    });
});


//Setting up server port
app.listen(port, () => {
    console.log('Server is up in port ' + port + '!')
});

