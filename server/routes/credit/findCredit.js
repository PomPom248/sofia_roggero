const express = require('express');
const creditRouter = express.Router()
const findCredit = require('../../services/credit/findCredit')

creditRouter.get('/credit', (req, res, next) => {
    findCredit.find(res)
})
module.exports = creditRouter;