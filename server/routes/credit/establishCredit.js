const express = require('express');
const creditRouter = express.Router()
const creditService = require('../../services/credit/establishCredit')
const Credit = require('../../models/Credit')

creditRouter.post('/credit', (req, res, next) => {
    const { amount } = req.body
    creditService.establish(amount, res)
})
module.exports = creditRouter;