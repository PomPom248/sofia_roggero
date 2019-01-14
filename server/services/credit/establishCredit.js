const Credit = require('../../models/Credit')

module.exports = {
    establish(amount, res) {
        const newCredit = new Credit({ amount })
        // if (typeof amount !== 'number') {
        //     res.status(400).json("Amount must be a number")
        // } else if (!amount) {
        //     res.status(400).json("Amount is requires")
        // } else if (amount === '') {
        //     res.status(400).json("Amount is missing")
        // } else if (amount < 1 || amount > 500) {
        //     res.status(400).json("Amount needs to be between 1 and 500")
        // } else {
        newCredit.save()
            .then((credit) => {
                res.status(200).json(`Credit of ${credit.amount}$ established`)
            })
            .catch((err) => {
                res.status(500).json('Error while establishing credit', err)
            })
        // }
    }
}
