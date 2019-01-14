const express = require('express');
const messageRouter = express.Router()
const validation = require('../../services/validation/validation')
const Credit = require('../../models/Credit')
const establishCredit = require('../../services/credit/establishCredit')

messageRouter.post('/', (req, res, next) => {
    const { destination, body } = req.body
    Credit.find()
        .then((credit) => {
            if (credit.length === 0) {
                const amount = 10
                establishCredit.establish(amount, res)
            } else {
                validation.validation(destination, body, res, credit[0].amount)
            }
        })
        .catch(err => res.status(500).json(err))
})
module.exports = messageRouter;