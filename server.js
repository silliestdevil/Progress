const express = require("express");
const bodyParser = require('body-parser');
const app = express()
let state = "waiting..."
let colours = {R:0, B:0, G:0}
let DecideColours = {R:0, B:0, G:0}
let complete = {R:false, G:false, B:false}
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Handling GET /hello request
app.get("/waiting", (req, res, next) => { //waiting not currently in use but will incorporate for knowing when three players have joined
   console.log('waiting...', req.socket.remoteAddress);
  res.send(state);
 })

app.get('/colour', (req, res) => { //get request
  res.send(JSON.stringify(colours));
});

app.post('/colour', (req, res) => { //post request 
  colours[req.body.colour] = req.body.value;
  res.send(JSON.stringify(colours));
});

app.get('/Decidecolour', (req, res) => { //get request
  res.send(JSON.stringify(colours));
});

app.post('/Decidecolour', (req, res) => { //post request 
  DecideColours[req.body.DecideColour] = req.body.value;
  res.send(JSON.stringify(DecideColours));
});

app.post('/complete', (req, res) => { //post request 
  console.log("got here");
  complete[req.body.colour] = true;
  console.log("complete", complete); 
  res.send(state);
});

app.get('/complete', (req, res) => { //post request 
  res.send(state);
});

// Server setup
app.listen(3000, () => {
    console.log("Server is Running")
})