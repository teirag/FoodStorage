// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');
var path                = require('path');
const loginRouter       = require('./routes/login');
const storageRouter     = require('./routes/storage');
const recipeRouter			= require('./routes/recipe');
// const emailRouter      = require('./routes/email');

var app = express();





//******************* Cron Job with Nodemailer ******************************

const nodemailer        = require('nodemailer');
var smtpTransport       = require('nodemailer-smtp-transport');
var cron                = require('node-cron');
var email               = require('./controllers/email');





//mails specified email every minute
var task = cron.schedule('30 * * * * *', function(){
    
    var d = new Date(); //today's date
		var maxDistance = 30;
		console.log("In the mailer");
		//get each user, check to see if today is 1 month before any expiration dates, send email to their email if it is.
		email.getAllUsers()
			.then(dbResult => {
			console.log("storage units");
			console.log(dbResult[0].storageUnits);
				if(dbResult[0].user){
					for(let i = 0; i < dbResult.length; i++){
						if(dbResult[i].storageUnits.length !== 0){
						var expiringFood = [];
						for(let j = 0; j < dbResult[i].storageUnits.length; j++){
							if(dbResult[i].storageUnits[j].items.length !== 0){
								for(let k = 0; k < dbResult[i].storageUnits[j].items.length; k++){
									var expdate = new Date(dbResult[i].storageUnits[j].items[k].expdate + 'Z');
									var timeDiff = Math.abs(expdate - d);
									const diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
									if(diffDays < maxDistance && diffDays > 0){
										expiringFood.push({item: dbResult[i].storageUnits[j].items[k].name, expire_in: diffDays, storage_place: dbResult[i].storageUnits[j].name })
									}
								}
							}
						}
					console.log("expiring food array");
					console.log(expiringFood);
					if(expiringFood.length !== 0){
					let userEmail = dbResult[i].user.email;
					let to = userEmail;
					let from = '"ストーレジ 👻" <sottochoro@gmail.com>';
					let subject = 'Your Food will expire soon! ✔';	
					let site = "http://localhost:3000"					
						
					let finalArr = [];
					for(let i = 0; i < expiringFood.length; i++){
						finalArr.push(`
							<tr>
							<td style="text-align: center; border: black solid 1px;">`
							+expiringFood[i].storage_place+
							`</td>
							<td style="text-align: center; border: black solid 1px;">`
							+expiringFood[i].item+
							`</td>
							<td style="text-align: center; border: black solid 1px;">`
							+expiringFood[i].expire_in+
							`</td>
							</tr>
						`);
					}
						
					let html = `
						<h2>Your FoodStorage items listed below will expire within 30 days</h2>
						<br>
						<table style="border: solid black 2px;">
							<thead>
								<tr>
									<th style="border: solid black 1px;">Storage Unit</th>
									<th style="border: solid black 1px;">Storage Item</th>
									<th style="border: solid black 1px;">Days till Expired</th>
								</tr>
							</thead>
							<tbody>
							`
							+finalArr.join("")+
							`
							</tbody>
						</table>

						<h3>Take a look at some of these <a href="`+site+`">recipes</a> that use the items above.</h3>
					`;

						// create reusable transporter object using the default SMTP transport
						let transporter = nodemailer.createTransport(smtpTransport({
								service: 'gmail',
								auth: {
										user: 'sottochoro@gmail.com',
										pass: 'Mitcheri22go'
								},
								tls: {
										rejectUnauthorized: false
								}
						}));

						// setup email data with unicode symbols
							let mailOptions = {
									from: from, // sender address
									to: to, // list of receivers
									subject: subject, // Subject line
									//text: 'Hello world ?', // plain text body
									html: html // html body
							};

							// send mail with defined transport object
							transporter.sendMail(mailOptions, (error, info) => {
									if (error) {
											return console.log(error);
									}
									console.log('Message %s sent: %s', info.messageId, info.response);
							});
						
						
						
						}
						}
					}
					
					
					
					
				}
			});      
});
console.log("bob");
task.start();
	




//********************* Middleware *************************************




// tell the express app what middleware to use
//from bytes to useable data.
app.use(bodyParser.urlencoded({ extended: true }));

//turns cookies into objects with key value pairs
app.use(cookieParser());

//keeps track of who is logged in.
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));

//allow access to static files
app.use(express.static("www"));
//app.use(express.static("www/html/Family"));

//runs req, res, and next through middleware (serialize, etc.)
app.use(passport.initialize());
app.use(passport.session());








//********************* Routes ****************************************






app.get('/api/', function (req, res) {
  res.send('Hello World!')
});

app.use('/api/login', loginRouter);

app.use('/api/storage', storageRouter);

app.get('/api/family', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/html/Family/', 'family.html'));
});

app.use('/api/recipe', recipeRouter);

app.get('/api/budget', function (req, res) {
  res.send('Hello World!')
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
	//	req.session.destroy(function(){
//	});
});



app.get('*', function(req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../www/') }); 
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
