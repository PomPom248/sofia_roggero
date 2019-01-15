const Credit = require('../../models/Credit')

module.exports = {
    establish(amount, res) {
        const newCredit = Credit('primary')
        var creditPrimary = new newCredit({ amount })
        creditPrimary.save()
            .then((credit) => {
                res.status(200).json(`Credit of ${credit.amount}$ established`)
                // const copyCredit = new Credit.copyCredit({ amount })
                // copyCredit.save()
                //     .then(() => { console.log('dentro del then') })
                //     .catch(() => console.log('dentro del catch'))
            })
            .catch((err) => {
                // console.log('no se ha salvado')
                res.status(500).json('Error while establishing credit', err)
            })
    }
    // }
}
