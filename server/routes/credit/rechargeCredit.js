const express = require('express');
const creditRouter = express.Router()
const validation = require('../../services/validation/validationCredit')
const creditCheck = require('../../models/Credit')
const establishCredit = require('../../services/credit/establishCredit')

creditRouter.post('/', (req, res, next) => {
    let { amount } = req.body
    creditCheck()
        .find()
        .then(credit => {
            if (credit.length === 0) {
                establishCredit.establish(amount, res)
            } else {
                validation.validate(amount, res)
            }
        })
        .catch(err => res.status(200).json(err))
})

module.exports = creditRouter;