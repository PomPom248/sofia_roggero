const Credit = require('../../models/Credit')
var locks = require('locks');
var mutex = locks.createMutex();

module.exports = {
    recharge(id, amountCharge, res) {
        mutex.lock(function () {
            Credit.findByIdAndUpdate({ _id: id }, {
                $inc: {
                    amount: amountCharge
                }
            }, { new: true })
                .then(() => {
                    mutex.unlock()
                    res.status(200).json('Credit re-established')
                })
                .catch(err => {
                    mutex.unlock()
                    res.status(200).json(err)
                })
        })
    }
}