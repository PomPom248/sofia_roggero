const express = require('express');
const messageRouter = express.Router()
const validation = require('../services/validation/validation')
const deleteMessage = require('../services/messages/deleteMessage')
const findMessage = require('../services/messages/findMessage')

messageRouter.post('/messages', (req, res, next) => {
    const { destination, body } = req.body
    validation.validation(destination, body)
})

messageRouter.get('/messages', (req, res, next) => {
    findMessage.find(res)
})

messageRouter.delete('/messages', (req, res, next) => {
    deleteMessage.delete(res)
})
module.exports = messageRouter;