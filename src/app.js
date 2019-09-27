const express = require('express');
const path = require('path');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode').geocode;

const app = express();
const port = process.env.PORT || 3000;

// Define paths for expresion config
const novak = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('views', viewsPath);

//set up hbs to load dynamic stuff
app.set('view engine', 'hbs');

//setup static directory to serve
app.use(express.static(novak));
hbs.registerPartials(partialsPath);

// app.get('', (req, resp) => {
//   resp.send('<h1>Weather</h1>');
// });

app.get('/novak', (req, resp) => {
  resp.send('This guy is at home');
});

//rendering the hbs contents
app.get('', (req, resp) => {
  resp.render('index', {
    title: 'Weather Application',
    name: 'Kelvin Onkundi Ndemo'
  });
});

app.get('/about', (req, resp) => {
  resp.render('about', {
    title: 'About Page',
    about: 'This is about..'
  });
});

app.get('/weather', (req, resp) => {
  if (!req.query.adress) {
    return resp.send({
      error: 'You must provide a search term'
    });
  }

  adress = req.query.adress;

  geocode(adress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return resp.send({
        error
      });
    }

    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return resp.send({
          error
        });
      }
      resp.send({
        latitude,
        longitude,
        location,
        foreCastData
      });
    });
  });
});

app.get('/products', (req, resp) => {
  if (!req.query.search) {
    return resp.send({
      error: 'You must provide a search term'
    });
  }

  resp.send({
    products: []
  });
});

app.get('/help', (req, resp) => {
  resp.send('Help page...');
});

app.listen(port, () => {
  console.log('Server is running on ' + port);
});
