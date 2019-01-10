const Message = require('./models/Message')

module.exports = {
    createMessage(destination, body) {
        const newMessage = new Message({ destination, body })
        newMessage.save()
            .then(() => {
                res.status(200).json({ message: 'Message created' })
            })
            .catch(() => {
                res.status(500).json({ message: 'Error while creating the message' })
            })
    }
}
