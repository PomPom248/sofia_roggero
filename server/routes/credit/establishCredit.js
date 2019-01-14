const express = require('express');
const creditRouter = express.Router()
const creditService = require('../../services/credit/establishCredit')
const Credit = require('../../models/Credit')

creditRouter.post('/credit', (req, res, next) => {
    const { globalCredit } = req.body
    creditService.establish(globalCredit, globalCredit, res)
})
creditRouter.get('/credit', (req, res, next) => {
    Credit.find()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json(err))
})
module.exports = creditRouter;