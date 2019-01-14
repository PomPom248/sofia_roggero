const express = require('express');
const messageRouter = express.Router()
const deleteMessage = require('../../services/messages/deleteMessage')

messageRouter.delete('/', (req, res, next) => {
    deleteMessage.delete(res)
})
module.exports = messageRouter;