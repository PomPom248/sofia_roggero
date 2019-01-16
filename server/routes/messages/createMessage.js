const express = require('express');
const messageRouter = express.Router()
const validation = require('../../services/validation/validationMessage')
const creditCheck = require('../../models/Credit')
// ccpm
const establishCredit = require('../../services/credit/establishCredit')
// Credit.creditCheck()
messageRouter.post('/', (req, res, next) => {
    const { destination, body } = req.body
    creditCheck()
        .find()
        .then((credit) => {
            // console.log(credit)
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