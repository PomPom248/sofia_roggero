const express = require('express');
const creditRouter = express.Router()
const deleteService = require('../../services/credit/deleteCredit')

creditRouter.delete('/credit', (req, res, next) => {
    deleteService.delete(res)
})
module.exports = creditRouter;