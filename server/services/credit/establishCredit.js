const Credit = require('../../models/Credit')

module.exports = {
    establish(globalCredit, remainingCredit) {
        const newCredit = new Credit({ globalCredit, remainingCredit })
        newCredit.save()
            .then(() => {
                res.status(200).json('Credit establiched')
            })
            .catch(() => {
                res.status(500).json('Error while establishing credit')
            })
    }
}