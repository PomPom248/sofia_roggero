const Credit = require('../../models/Credit')
module.exports = {
    recharge(id, amountCharge, res) {
        Credit.findByIdAndUpdate({ _id: id }, {
            $inc: {
                amount: amountCharge
            }
        }, { new: true })
            .then(() => res.status(200).json('Credit re-established'))
            .catch(err => res.status(200).json(err))
    }
}