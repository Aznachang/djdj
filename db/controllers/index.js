var db = require('../index.js');
var sequelize = require('sequelize');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'), { multiArgs: true} );

module.exports = {
	songs: {
		get: function (req, res) {
			db.Song.findAll({})
			.then(function(playlist) {
				res.json(playlist);
			});
		},

		post: function (req, res) {
			db.Song.findOrCreate( {where: { src: req.body.src, data: req.body.data, partyid: req.body.partyid}})
			.spread(function(song, created) {
				res.send(song);
			})
		},
		
		delete: function (req, res) {
			db.Song.destroy( {where: {src: req.body.src} } )
			.then(function() {
				res.send('success')
			})
		}
	},

	users: {
		// Login
		get: function (req, res) {
			db.User.findOne( { where: { username: req.query.username} })
			.then(function(user) {
				var inputPass = req.query.password;
				bcrypt.compare(inputPass, user.password)
			  .then( function(isAuthenticated) {
			    if ( isAuthenticated  ) {
			      res.redirect('/?authenticated=' + isAuthenticated);
			    } else {
			      res.redirect('/login');
			    }
			  })
			  .catch( function(err) {
			    console.log('index.js users: get: ', err);
			    res.redirect('/map');
			  });
			})
			.catch(function(err) {
				console.log('index.js users: get: ', err);
			})
		},
		// Signup
		post: function (req, res) {
			db.User.create({
				username: req.query.username,
				password: req.query.password,
				latitude: req.query.latitude,
				longitude: req.query.longitude
			})
			.then(function (user, created) {
				res.redirect('/login');
			})
			.catch(function(err) {
				console.log('index.js users: post: ', err);
				res.redirect('/login');
			})
		}
	},

	parties: {
		get: function(req, res) {
			db.Party.findAll({}).then(function(parties) {
				res.json(parties);
			});
		},

		post: function(req, res) {
			db.Party.create({latitude: req.body.latitude, longitude: req.body.longitude})
			.then(function(john) {
			  res.json(john.get({
			    plain: true
			  }));
			});
		}
	},

	party: {
		get: function(req, res) {
			db.Songs.findAll({
				where: {
					partyid: req.body.partyid
				}
			})
			.then(function(songs){
				res.json(songs);
			});
		}
	},

	playlists: {
		post: function(req, res) {
			db.Playlist.create({name: req.body.name, partyId: req.body.id});
		}
	}
}