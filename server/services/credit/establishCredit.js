const Credit = require('../../models/Credit')

module.exports = {
    establish(amount, res) {
        const newCredit = new Credit({ amount })
        newCredit.save()
            .then((credit) => {
                res.status(200).json(`Credit of ${credit.amount}$ established`)
            })
            .catch((err) => {
                res.status(500).json('Error while establishing credit', err)
            })
    }
}
