const Message = require('../../models/Message')
const Credit = require('../../models/Credit')

var locks = require('locks');
var mutex = locks.createMutex();

module.exports = {
    create(destination, body, status, res) {
        Credit('primary')
            .find()
            .then(creditStatus => {
                if (creditStatus[0].amount <= 0) {
                    res.status(200).json("Not enough credit")
                } else {
                    const newMessage = Message('primary')
                    var messagePrimary = new newMessage({ destination, body, status })
                    if (status.includes('200')) {
                        messagePrimary.save()
                            .then(() => {
                                mutex.lock(function () {
                                    Credit('primary')
                                        .findOneAndUpdate(
                                            { amount: creditStatus[0].amount - 1 }
                                        )
                                        .then((response) => {
                                            res.status(200).json({ Message: `Remaining ${response.amount}$` })
                                            mutex.unlock()
                                        })
                                        .catch(err => {
                                            res.status(500).json({ Message: err })
                                            mutex.unlock()
                                        })
                                })
                            })
                            .catch(() => {
                                res.status(500).json('Error while creating message')
                            })
                    } else {
                        messagePrimary.save()
                            .then(response => res.status(200).json({ Message: response }))
                            .catch(err => res.status(500).json({ Message: err }))
                    }
                }
            }).catch(err => console.log(err))
    }
}