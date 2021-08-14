const express = require('express');
const path = require('path')
const hbs = require('hbs');

const app = express();

const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/forecast');

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshay Chandwani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akshay Chandwani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'About Me',
        name: 'Akshay Chandwani'
    })
})


app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      foreCast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          Temperature: foreCastData.current.temperature,
          Location: location,
          Rain: foreCastData.current.cloudcover,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'     
        })
    }
    const {search, rating} = req.query;
    console.log(search, rating);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help page not found',
        title: '404',
        name: 'Akshay Chandwani'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akshay Chandwani',
        error: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

