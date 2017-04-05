// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');
var path                = require('path');
 const loginRouter      = require('./routes/login');
const nodemailer        = require('nodemailer');
var smtpTransport       = require('nodemailer-smtp-transport');
var cron                = require('node-cron');


var app = express();
const users = {};
const storage = {};




//******************* Cron Job with Nodemailer ******************************



//mails specified email every minute
cron.schedule('1-59 * * * *', function(){
    
    //get each user, check to see if today is 1 month before any expiration dates, send email to their email if it is.
    
    
    var d = new Date(); //today's date
    var exp =  new Date() - 5;
    var dd = exp - d;
    var maxDistance = 30;
    
    if(dd < maxDistance && dd > 0){
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



        let unit = "Storage Cuboard";
        let food = "chicken";
        let site = "http://localhost:3000"
        let to = 'sottochoro@gmail.com';
        let from = '"ストーレジ 👻" <sottochoro@gmail.com>';
        let subject = 'Hello ✔';
        let html = '<p>The '+food+ddd+' in your <a href='+site+'>'+unit+'</a> will expire one month from today. You should check out these recipes that use '+food+dd+'. Love you honey :) From, Yourself. Check the from sender.</p>';
        
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
    else if(dd <= 0){
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



        let unit = "Storage Cuboard";
        let food = "chicken";
        let site = "http://localhost:3000"
        let to = 'sottochoro@gmail.com';
        let from = '"ストーレジ 👻" <sottochoro@gmail.com>';
        let subject = 'Hello ✔';
        let html = '<p>The '+food+ddd+' in your <a href='+site+'>'+unit+'</a> has reached its expiration date.</p>';
        
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

      
});




//******************** Passport User stuff *****************************





passport.use('login', new LocalStrategy(function(username, password, done) {
    //done is a function that returns an error, then  the userobject
    if ((username && password) && !users[username]){
      users[username] = {
        'username':username,
        'password':password,
        keys: {}
      };
      //returns a promise, what do we do with this???
       app.use('/login', loginRouter);

      return done(null, { username: username, password: password, pairs: {} });
    }
    else {
      return done(null, users[username]);
    }
}));

// tell passport how to turn a user into serialized data that will be stored with the session
//user object is generated above
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(key, done) {
    done(null, users[key]);
});





//********************* Middleware *************************************




// tell the express app what middleware to use
//from bytes to useable data.
app.use(bodyParser.urlencoded({ extended: true }));

//turns cookies into objects with key value pairs
app.use(cookieParser());

//keeps track of who is logged in.
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));

//runs req, res, and next through middleware (serialize, etc.)
app.use(passport.initialize());
app.use(passport.session());

//allow access to static files
app.use(express.static("www"));
//app.use(express.static("www/html/Family"));






//********************* Routes ****************************************






app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/storage', function (req, res) {
  res.status(200).send(req.body);
});

app.post('/login', passport.authenticate('login'), function (req, res) {
    res.status(200).send(req.user);
    // res.send([{name: number},{name: "Mitch"},{name: "Bear"},{name: JSON.stringify(req.params)}]);
});

app.get('/family', function (req, res) {
    res.sendFile(path.join(__dirname, '../www/html/Family/', 'family.html'));
});

app.get('/recipes', function (req, res) {
  res.send('Hello World!')
});

app.get('/budget', function (req, res) {
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
