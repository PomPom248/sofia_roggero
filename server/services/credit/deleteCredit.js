const creditCheck = require('../../models/Credit')

module.exports = {
    delete(res) {
        creditCheck()
            .deleteMany()
            .then(() => {
                console.log('deleted 2')
                res.status(200).json('Credits deleted')
            })
            .catch(err => res.status(200).json(err))
    }
}
