const Credit = require('../../models/Credit')

module.exports = {
    find(res) {
        Credit()
            .find()
            .then(response => res.status(200).json(response))
            .catch(err => res.status(500).json(err))
    }
}