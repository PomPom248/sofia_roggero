
const express = require('express');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.json('Hola Mundo')
})
router.use('/messages',
    require('./routes/messages/createMessage'),
    require('./routes/messages/deleteMessage'),
    require('./routes/messages/findMessage'));

router.use('/credit',
    require('./routes/credit/rechargeCredit'),
    require('./routes/credit/findCredit'),
    require('./routes/credit/deleteCredit'))

module.exports = router;