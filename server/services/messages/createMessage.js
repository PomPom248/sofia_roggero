const Message = require('../../models/Message')

module.exports = {
    create(destination, body, status, res) {
        const newMessage = new Message({ destination, body, status })
        newMessage.save()
            .then(() => {
                console.log('Message created')
            })
            .catch(() => {
                console.log('Error while creating message')
            })
    }
}
