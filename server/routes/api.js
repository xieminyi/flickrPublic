console.log('Here: routers api');

const express = require('express');
const router  = express.Router();
const search  = require('./search');

// Set routers
router.get('/api', search.request);

router.get('/', (req, res) => {
  res.status(200).end();
});

module.exports = router;