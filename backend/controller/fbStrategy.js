const configAuth = require('../config/auth');
const request = require('request-promise');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

exports.sy = passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL,
	enableProof: true
},
	function (accessToken, profile, cb, done) {

		const options = {
			method: 'GET',
			uri: `https://graph.facebook.com/v2.8/${cb.id}/accounts`,
			qs: {
				access_token: accessToken,
				fields: 'name, full_picture, posts{admin_creator,message,full_picture,likes{id},id}'
			}
		}

		request(options)
			.then(fbRes => {
				let fbResParse =	JSON.parse(fbRes)
				exports.fbRes = fbResParse

				
			})
	
		done(null)
	}

));