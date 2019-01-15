const Credit = require('../../models/Credit')

module.exports = {
    delete(res) {
        Credit.originalCredit.deleteMany()
            .then(() => {
                console.log('deleted 2')
                res.status(200).json('Credits deleted')
            })
            .catch(err => res.status(200).json(err))
    }
}
