const Message = require('../../models/Message')
module.exports = {
    find(res) {
        Message.find()
            .then((messages) => res.status(200).json({ message: messages }))
            .catch(err => res.status(500).json({ message: err }))
    }
}