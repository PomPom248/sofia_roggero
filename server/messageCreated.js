const Message = require('./models/Message')

module.exports = {
    create(destination, body) {
        const newMessage = new Message({ destination, body })
        newMessage.save()
            .then(() => {
                console.log('Message created')
                res.status(200).json({ message: 'Message created' })
            })
            .catch(() => {
                console.log('Error while creating message')
                res.status(500).json({ message: 'Error while creating the message' })
            })
    }
}
