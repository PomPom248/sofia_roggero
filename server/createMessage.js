const Message = require('./models/Message')

module.exports = {
    create(destination, body, status, res) {
        const newMessage = new Message({ destination, body, status })
        newMessage.save()
            .then(() => {
                console.log('Message created')
                // res.status(200).json({ message: 'Message created' })
            })
            .catch(() => {
                console.log('Error while creating message')
                // res.status(500).json({ message: 'Error while creating the message' })
            })
    }
    ,
    find(res) {
        Message.find()
            .then((messages) => res.status(200).json({ message: messages }))
            .catch(err => res.status(500).json({ message: err }))
    },
    delete(res) {
        Message.deleteMany()
            .then(() => res.status(200).json({ message: 'Messages deletes' }))
            .catch(err => res.status(500).json({ message: err }))
    }
}
