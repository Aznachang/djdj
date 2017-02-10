var controller = require('../db/controllers/index.js');
var router = require('express').Router();

//routes for user
router.get('/login', controller.users.get);
router.get('/signup', controller.users.post);


//routes for songs
router.get('/songs', controller.songs.get);
router.post('/songs', controller.songs.post);
router.delete('/songs', controller.songs.delete);

//routes for party
router.get('/parties', controller.parties.get);
router.post('/parties', controller.parties.post);

module.exports = router;