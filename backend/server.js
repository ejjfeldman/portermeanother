const express = require("express");
const app = express();
const request = require('request');
const axios = require('axios');
const bodyParser = require('body-parser');
const keys = require('./key');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json 
app.use(bodyParser.json())

app.use(cors());


app.listen(8080, () => {
    console.log("8080 is listening")
})

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
          jwksUri: "https://{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
      }),
      // This is the identifier we set when we created the API
      audience: '{YOUR-API-AUDIENCE-ATTRIBUTE}',
      issuer: '{YOUR-AUTH0-DOMAIN}',
      algorithms: ['RS256']
  });

// var randombeer_routes = require("./routes/randombeer_routes");

// app.use('/randombeer', randombeer_routes);

// app.listen(PORT, ()=>{
//     console.log("server started" + PORT)
// })
var newBeer = {};
var localBeer = {};
var availability = false;


app.get('/randombeer', (req, response) => {
    request({ url: 'http://api.brewerydb.com/v2/beer/random?key=' + keys.breweryKey, json: true }, (err, res, body) => {
        if (err) {
            throw err
        }
        newBeer = body
        // console.log(newBeer)
        response.send(newBeer.data)
        console.log('beer was grabbed')
        //calling the lcbo api to see if the beer is available [returns full list...need to narrow]
        let chosenBeer = newBeer.data.name;
        console.log(chosenBeer)
        request({ url: "http://lcboapi.com/products?q="+chosenBeer+"&access_key=" + keys.lcboKey, json: true }, (error, respons, bod) => {
            if (error) {
                throw error
            }
            else if (bod.pager && bod.pager.total_record_count === 0){
                availbility = false;
                console.log(respons.body)
                console.log('that wasn"t at LCBO')
                console.log("try "+ bod.suggestion + " instead")
            }
            else {
                console.log("It is available at the lcbo")
            }

        }
    )
    }) 
})

//FIX ME!!
//work in progress finding a specific beer
app.post('/specificbeer', (req, response) => {
    let formResults = req.body.formResults;
    // console.log(formResults);
    request({ url: 'http://api.brewerydb.com/v2/beers/?key=' +keys.breweryKey + '&abv=' +formResults.abv+ '&ibu='+formResults.ibu, json: true }, (err, res, body) => {
        if (err) {
            throw err
        }
        console.log(body)
        newBeer = body
        
        response.send(newBeer.data)
        console.log('beer was grabbed')
        
    }) 
})

// app.post('randombeer', (req, res) => {
//     res.json({ msg: newBeer.data })
// })