const Credit = require('../../models/Credit')
const createCredit = require('../../services/credit/establishCredit')
module.exports = {
    validation(amount, res) {
        const newCredit = new Credit({ amount })
        if (typeof amount !== 'number') {
            res.status(400).json("Amount must be a number")
        } else if (!amount) {
            res.status(400).json("Amount cannot be missing")
        }
        else if (amount === '') {
            res.status(400).json('Amount cannot be empty')
        }
        else {
            newCredit.save()
                .then((credit) => {
                    res.status(200).json(`Credit of ${credit.amount}$ established`)
                })
                .catch((err) => {
                    res.status(500).json('Error while establishing credit', err)
                })
        }
    }
}