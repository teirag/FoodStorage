var express = require('express');
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');
var app = express();

app.use(bodyParser.json());

app.use(express.static('./www'));

/*app.get('/', function (req, res) {
  res.send('Hello World!')
})*/

app.use('/api', bodyParser.json());
app.use('/api/people', peopleRoutes);

app.post('/', function(req, res) {
	res.json(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})