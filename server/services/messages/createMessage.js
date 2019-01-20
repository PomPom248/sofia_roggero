const Message = require('../../models/Message')
const creditCheck = require('../../models/Credit')
const uuidv1 = require('uuid/v1')


module.exports = {
    create(destination, body, statusCode, res) {
        creditCheck()
            .find()
            .then(creditStatus => {
                if (creditStatus[0].amount <= 0) {
                    res.status(200).json("Not enough credit")
                } else {
                    let msjID = uuidv1()
                    const newMessage = Message()
                    var messagePrimary = new newMessage({ msjID, destination, body, statusCode })
                    console.log(messagePrimary)
                    if (statusCode.includes('200')) {
                        messagePrimary.save()
                            .then(() => {
                                creditCheck()
                                    .findOneAndUpdate(
                                        { amount: creditStatus[0].amount - 1 }
                                    )
                                    .then(() => {
                                        // res.status(200).json({ Message: `Remaining ${response.amount}$` })
                                    })
                                    .catch(err => {
                                        // res.status(500).json({ Message: err })
                                    })
                            })
                            .then(() => {
                                const newMessageCopy = Message('replica')
                                var messageCopy = newMessageCopy({ msjID, destination, body, statusCode })
                                console.log(messageCopy)
                                if (statusCode.includes('200')) {
                                    return messageCopy.save()
                                        .then(() => {
                                            creditCheck('replica')
                                                .findOneAndUpdate(
                                                    { amount: creditStatus[0].amount - 1 }
                                                )
                                                .then((response) => {
                                                    res.status(200).send('In both dbs')
                                                })
                                                .catch(err => {
                                                    res.status(500).json({ Message: err })
                                                })
                                        })
                                }
                            })
                            .catch(() => {
                                res.status(500).json('Error while creating message')
                            })
                    } else {
                        messagePrimary.save()
                            .then(() => {
                                const newMessageCopy = Message('replica')
                                var messageCopy = newMessageCopy({ msjID, destination, body, statusCode })
                                console.log(messageCopy)
                                messageCopy.save()
                                    .then(() => res.status(200).send('Message saved in both dbs'))
                                    .catch(() => res.status(500).send('messge saved in 1st dbs'))
                            })
                            .catch(err => res.status(500).json({ Message: err }))
                    }
                }
            }).catch(err => console.log(err))
    }
}