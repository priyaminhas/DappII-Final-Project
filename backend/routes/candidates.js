var express = require('express');
var router = express.Router();
const candidateController = require('../controllers/candidateController');

/* GET vaccines listing. */
router.get('/all', candidateController.all);
router.post('/vote', candidateController.vote);
router.post('/add', candidateController.add);
module.exports = router;