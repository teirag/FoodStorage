var express = require('express');
//const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');
var app = express();
var path = require('path');

app.use(express.static("www"));
//app.use(express.static("www/html/Family"));

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/storage', function (req, res) {
  res.send('Hello World!')
});

app.use('/api/people', peopleRoutes)




app.get('/family', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/html/Family/', 'family.html'));
});






app.get('/recipes', function (req, res) {
  res.send('Hello World!')
});

app.get('/budget', function (req, res) {
  res.send('Hello World!')
});

app.post('/user', function(req, res) {
    res.send('Got a POST request on user page');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});













//app.use(bodyParser.json());

//app.use(express.static('./www'));


//app.use('/api', bodyParser.json());
//app.use('/api/people', peopleRoutes);
//
//app.post('/', function(req, res) {
//	res.json(req.body);
//});
//
//app.listen(3000, function () {
//  console.log('Example app listening on port 3000!')
//})