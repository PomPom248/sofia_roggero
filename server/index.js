
const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json('Hola Mundo')
})
router.use('/', require('./routes/message'));

module.exports = router;