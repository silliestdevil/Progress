const express = require("express");
const bodyParser = require('body-parser');
const app = express()
let waitings = {R:false, G:false, B:false}
let colours = {R:0, B:0, G:0}
let TwoColours = {R:0, B:0, G:0}
let DecideColours = {R:0, B:0, G:0}
let complete = {R:false, G:false, B:false}
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get("/reset"), (req, res) => {
waitings = {R:false, G:false, B:false}
colours = {R:0, B:0, G:0}
TwoColours = {R:0, B:0, G:0}
DecideColours = {R:0, B:0, G:0}
complete = {R:false, G:false, B:false}
}

app.get("/waiting", (req, res, next) => {
  res.json(waitings);
});

app.post('/waiting', (req, res) => {
  waitings[req.body.waiting] = true;
  console.log(waitings);
  res.json(waitings);
});

app.get('/colour', (req, res) => { //get request
  res.send(JSON.stringify(colours));
});

app.post('/colour', (req, res) => { //post request 
  colours[req.body.colour] = req.body.value;
  res.send(JSON.stringify(colours));
});

app.get('/Decidecolour', (req, res) => { //get request
  res.send(JSON.stringify(DecideColours));
});

app.post('/Decidecolour', (req, res) => { //post request 
  DecideColours[req.body.Decidecolour] = req.body.value;
  console.log("Decided Colour:", DecideColours);
  res.send(JSON.stringify(DecideColours));
});

app.get('/TwoColour', (req, res) => { //get request
  res.send(JSON.stringify(TwoColours));
});

app.post('/TwoColour', (req, res) => { //post request 
  TwoColours[req.body.TwoColour] = req.body.value;
  console.log("Stage 2:", TwoColours);
  res.send(JSON.stringify(TwoColours));
});


app.post('/complete', (req, res) => { //post request 
  console.log("got here");
  complete[req.body.colour] = true;
  console.log("complete", complete); 
  res.send(complete);
});

app.get('/complete', (req, res) => { //post request 
  res.send(complete);
});

// Server setup
app.listen(3000, () => {
    console.log("Server is Running")
})