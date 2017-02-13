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
				console.log('delete was successful')
			})
		}
	},

	users: {
		//login
		get: function (req, res) {
			db.User.findOne( { where: { username: req.query.username} })
			.then(function(user) {
				var inputPass = req.query.password;
				bcrypt.compare(inputPass, user.password)
			  .then( function(isAuthenticated) {
			    console.log('Is this user authenticated ? ', isAuthenticated);
			    if ( isAuthenticated  ) {
			      res.redirect('/?authenticated=' + isAuthenticated);
			    } else {
			      res.redirect('/login');
			    }
			  })
			  .catch( function(err) {
			    console.log('There is error in checkUser', err);
			    res.redirect('/map');
			  });
			})
			.catch(function(err) {
				console.log('db controller error: ', err);
			})
		},
		//signup
		post: function (req, res) {
			console.log('username: ', req.query.username)
			console.log('password: ', req.query.password)
			console.log('longitude: ', req.query.longitude)
			console.log('latitude: ', req.query.latitude)
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
				console.log('You already have an account, please login!');
				console.log('db controller error: ', err);
				res.redirect('/login');
			})
		}

	}, //end of users
	parties: {
		get: function(req, res) {
			db.Party.findAll({}).then(function(parties) {
				console.log('party in the controller')
				res.json(parties);
			})
		},
		post: function(req, res) {
			console.log('POST request for A PARTY: ', req.body);
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
			console.log('get request for a PARTYs songs: ', req.body);
			// sequelize.query("SELECT songs.src, songs.data FROM `songs` INNER JOIN `parties` ON songs.partyid=parties.id").spread(function(results, metadata) {
			// 		console.log(results);
			// 		console.log(metadata);
			// 	})
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
			console.log('POST request for a playlist to PARTY ', req.body);
			db.Playlist.create({name: req.body.name, partyId: req.body.id});
		}
	}
}