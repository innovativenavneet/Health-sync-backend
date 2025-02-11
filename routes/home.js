const express = require('express');
const router = express.Router();

// Home Route
router.get('/', (req, res) => {
    res.send('Welcome to the Home Route Navneet!');
});

module.exports = router;
