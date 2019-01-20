const creditCheck = require('../../models/Credit')

module.exports = {
    recharge(amountCharge, res) {
        creditCheck()
            .findOneAndUpdate({ $inc: { amount: amountCharge } })
            .then(() => {
                return creditCheck('replica')
                    .findOneAndUpdate({ $inc: { amount: amountCharge } })
                    .then(() => {
                        res.status(200).json(`${amountCharge}$ re-established in both dbs`)
                    })
                    .catch((err) => {
                        res.status(500).json(err)
                    })
            })
            .catch(err => {
                console.log('chau', err)
                res.status(200).json(err)
            })
    }
}