const creditCheck = require('../../models/Credit')

module.exports = {
    establish( amount, res) {
        const newCredit = creditCheck()
        var creditPrimary = new newCredit({ amount })
        creditPrimary.save()
            .then(() => {
                const copyCredit = creditCheck('replica')
                let creditReplica = new copyCredit({ amount })
                return creditReplica.save()
                    .then(() => res.status(200).json(`Credit of ${amount}$ established in both dbs`))
                    .catch(() => {
                        return creditCheck()
                            .findOneAndUpdate({
                                $inc: {
                                    amount: -1
                                }
                            })
                            .then(() => res.status(200).json('There was a problem saving in the 2nd db so the action went back'))
                            .catch(() => res.status(500).json('There was a problem while going back'))
                    })
            })
            .catch((err) => {
                res.status(500).json('Error while establishing credit', err)
            })
    }
}
