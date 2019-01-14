const Credit = require('../../models/Credit')

module.exports = {
    establish(amount, res) {
        const newCredit = new Credit({ amount })
        newCredit.save()
            .then((credit) => {
                res.status(200).json({ message: `Credit of ${credit[0].amount} established` })
            })
            .catch(() => {
                res.status(500).json('Error while establishing credit')
            })
    }
}