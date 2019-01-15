var rechargeCredit = require('../credit/rechargeCredit')

module.exports = {
    validate(id, amountCharge, res) {
        if (amountCharge == '') {
            res.status(400).json("Amount is missing")
        }
        else if (!amountCharge) {
            res.status(400).json("Amount is required")
        }
        else if (typeof amountCharge != 'number') {
            res.status(400).json("Amount must be a number")
        } else if (amountCharge < 1 || amountCharge > 500) {
            res.status(400).json("Amount needs to be between 1 and 500")
        } else {
            rechargeCredit.recharge(id, amountCharge, res)
        }
    }
}