const Message = require('../../models/Message')
const Credit = require('../../models/Credit')
var locks = require('locks');
var mutex = locks.createMutex();

module.exports = {
    create(destination, body, status, res) {
        Credit.find()
            .then(creditStatus => {
                if (creditStatus[0].amount <= 0) {
                    res.status(200).json("Not enough credit")
                } else {
                    const newMessage = new Message({ destination, body, status })
                    if (status.includes('200')) {
                        newMessage.save()
                            .then(() => {
                                mutex.lock(function () {
                                    Credit.findOneAndUpdate(
                                        { amount: creditStatus[0].amount - 1 }
                                    )
                                        .then((response) => {
                                            console.log("OK")
                                            console.log(response)
                                            mutex.unlock()
                                            res.status(200)
                                            res.send('mutex')
                                            // .json({ Message: response })
                                        })
                                        .catch(err => {
                                            console.log("error")
                                            console.log(err)
                                            mutex.unlock()
                                            res.status(500)
                                            res.send('no muyex')
                                            // .json({ Message: err })
                                        })
                                })
                            })
                            .catch(() => {
                                res.status(500).json('Error while creating message')
                            })
                    } else {
                        newMessage.save()
                            .then(response => res.status(200).json({ Message: response }))
                            .catch(err => res.status(500).json({ Message: err }))
                    }
                }
            }).catch(err => console.log(err))
    }
}