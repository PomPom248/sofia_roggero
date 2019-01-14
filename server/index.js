
const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json('Hola Mundo')
})
router.use('/',
    require('./routes/messages/createMessage'),
    require('./routes/messages/deleteMessage'),
    require('./routes/messages/findMessage'),
    require('./routes/credit/establishCredit'),
    require('./routes/credit/findCredit'),
    require('./routes/credit/deleteCredit'));

module.exports = router;