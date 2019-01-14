const Credit = require('../../models/Credit')

module.exports = {
    establish(amount, res) {
        const newCredit = new Credit({ amount })
        newCredit.save()
            .then((credit) => {
                res.status(200).json({ credit })
            })
            .catch(() => {
                res.status(500).json('Error while establishing credit')
            })
    }
}