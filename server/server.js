var express = require('express');
//const bodyParser = require('body-parser');
//const peopleRoutes = require('./routes/people');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
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