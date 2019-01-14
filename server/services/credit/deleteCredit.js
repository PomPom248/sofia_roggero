const Credit = require('../../models/Credit')

module.exports = {
    delete(res) {
        Credit.deleteMany()
            .then(() => res.status(200).json('Credits deleted'))
            .catch(err => res.status(200).json(err))
    }
}
