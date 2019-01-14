const Message = require('../../models/Message')
const Credit = require('../../models/Credit')
module.exports = {
    create(destination, body, status, res) {
        Credit.find()
            .then(creditStatus => {
                if (creditStatus[0].amount <= 0) {
                    res.status(200).json("Not enough credit")
                } else {
                    const newMessage = new Message({ destination, body, status })
                    newMessage.save()
                        .then(() => {
                            Credit.findByIdAndUpdate({ _id: creditStatus[0]._id },
                                { amount: creditStatus[0].amount - 1 }
                            )
                                .then(() => (console.log(response)))
                                .catch(err => res.status(500).json({ Message: err }))
                        })
                        .catch((error) => {
                            res.status(500).json('Error while creating message')
                        })
                }
            }).catch(err => console.log(err))
    }
}
