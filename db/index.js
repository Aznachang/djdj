var Sequelize = require('sequelize');
var Promise = require('bluebird');
// bcrypt = Promise.promisifyAll(require('bcrypt'), {multiArgs:true});
var orm;
// process.env.DATABASE_URL = 'postgres://hpblhrvcoewnjp:041e28a7f451fc8fbd5ff9d92cd082db1e063ae66816a9c0b6b022947f6ef9f3@ec2-54-235-248-197.compute-1.amazonaws.com:5432/dbcghuk10tpnnm';
if (!process.env.DATABASE_URL) {
	orm = new Sequelize('djsdj', null, null, {
			dialect: "postgres",
		  port: 5432
	});
} else {
	orm = new Sequelize(process.env.DATABASE_URL, {
		dialect: "postgres"
	});
}

//Song can relate to multiple playlists. Playlists can CONTAIN may SONGS.

// Song
var Song = orm.define('song', {
	src: Sequelize.STRING,
	data: Sequelize.STRING(1000)
},
{
	timestamps: false
});

// Playlist
var Playlist = orm.define('playlist', {
	name: Sequelize.STRING
});
// Playlist.belongsTo(User);

// SongPlayList
var SongPlayList = orm.define('songplaylist', {

});
// SongPlayList.belongsTo(Song);
// SongPlaylist.belongsTo(Playlist);

// USER
var User = orm.define('user', {
	username: {type: Sequelize.STRING, unique: true},
	password: Sequelize.STRING,
	location: Sequelize.STRING
},
{
	timestamps: false
});

// party location tied to a user
var Party = orm.define('party', {
	latitude: Sequelize.STRING,
	longitude: Sequelize.STRING
});
// Party.belongsTo(User);
// Party.belongsTo(Playlist);

module.exports.con = orm;
module.exports.Song = Song;
module.exports.User = User;
module.exports.Playlist = Playlist;
module.exports.SongPlayList = SongPlayList;
module.exports.Party = Party;