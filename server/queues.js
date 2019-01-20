// const Queue = require('bull')
// const messageQueue = new Queue('message-queues', 'redis://127.0.0.1:6379');
// const uuidv1 = require('uuid/v1')
// const sendMessage = require('./services/messages/createMessage')
// const updateCredit = require('./services/credit/establishCredit')

// messageQueue.process(function (job, done) {
//     updateCredit.establish(done)
//         .then(result => {
//             if (result) {
//                 sendMessage.create(job.data)
//                     .then(res => { done() })
//                     .catch(err => { done() })
//             } else { done() }
//         })
// })
// function startJob(req, res) {
//     const { destination, body } = req.body
//     const msjID = uuidv1()
//     const status = 'PENDING'
//     sendMessage.create(msjID, destination, body, status, res)

//     messageQueue.add({ msjID, destination, body, status, res })
//     res.send(`Your message is on queue with id: ${msjID}`);
// }

// module.exports = startJob