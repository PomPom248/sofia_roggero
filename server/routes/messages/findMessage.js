const express = require('express');
const messageRouter = express.Router()
const findMessage = require('../../services/messages/findMessage')

messageRouter.get('/messages', (req, res, next) => {
    findMessage.find(res)
})

module.exports = messageRouter;