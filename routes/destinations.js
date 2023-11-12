const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');


// GET /flights
router.get('/flights/:id/destinations', destinationsCtrl.index);
// POST /flights/:id/destinations 
router.post('/flights/:id/destinations', destinationsCtrl.create);

module.exports = router;