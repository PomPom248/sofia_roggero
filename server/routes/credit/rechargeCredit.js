const express = require('express');
const creditRouter = express.Router()
const validation = require('../../services/validation/validationCredit')
const Credit = require('../../models/Credit')
const establishCredit = require('../../services/credit/establishCredit')

creditRouter.post('/', (req, res, next) => {
    let { amount } = req.body
    Credit.find()
        .then(credit => {
            if (credit.length === 0) {
                establishCredit.establish(amount, res)
            } else {
                validation.validate(credit[0]._id, amount, res)
                // validation.recharge(credit[0]._id, amount, res)
            }
        })
        .catch(err => res.status(200).json(err))
})

module.exports = creditRouter;