const Credit = require('../../models/Credit')
var locks = require('locks');
var mutex = locks.createMutex();


module.exports = {
    recharge(id, amountCharge, res) {
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
}