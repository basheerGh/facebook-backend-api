const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const configAuth = require('./config/auth');
const session = require('express-session');
const request = require('request-promise');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const sy = require('./controller/fbStrategy')



//CORS - Error Handling
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		return res.status(200).json({});
	}
	next();
});
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(session({
// 	secret: 'what',
// 	resave: true,
// 	saveUninitialized: true
// }))



app.get('/', (req, res) => {
	const modulefbRes = require('./controller/fbStrategy')
		res.json(modulefbRes.fbRes)
		
})

app.get('/oauth/facebook', passport.authenticate('facebook'))


app.get('/oauth/facebook/callback',
	passport.authenticate('facebook', { successRedirect: '/' ,failureRedirect: '/' }), function (req, res) {

		 return res.redirect('/')
	})



module.exports = app;




// const options = {
// 	method: 'GET',
// 	uri: `https://graph.facebook.com/v2.8/${cb.id}/accounts`,
// 	qs: {
// 		access_token: accessToken,
// 		fields: 'name, full_picture, posts{admin_creator,message,full_picture,likes{id},id}'
// 	}
// }

// request(options)
// 	.then(fbRes => {
// 		console.log(fbRes)
// 	})