const Message = require('../../models/Message')

module.exports = {
    delete(res) {
        Message.deleteMany()
            .then(() => res.status(200).json({ message: 'Messages deletes' }))
            .catch(err => res.status(500).json({ message: err }))
    }
}