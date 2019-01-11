const express = require('express');
const messageRouter = express.Router()
const validation = require('../../services/validation/validation')

messageRouter.post('/messages', (req, res, next) => {
    const { destination, body } = req.body
    validation.validation(destination, body, res)
})
module.exports = messageRouter;