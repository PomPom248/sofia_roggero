const Queue = require('bull');
const messageQueue = new Queue('message-queues', 'redis://127.0.0.1:6379');
const sendMessage = require('./controllers/sendMessage')
const uuidv1 = require('uuid/v1')

messageQueue.on('completed', function (job, result) {
    console.log(`Job completed with result ${result}`);
})
messageQueue.on('progess', function (job, result) {
    console.log(`Job's progress ${result}`);
})

messageQueue.on('failed', function (job, result) {
    console.log(`Job failed ${result}`);
})

messageQueue.process(function (job, done) {
    // console.log('in process before')
    sendMessage(job.data, done)
})
const addQueue = (req, res) => {

    const msjID = uuidv1()

    let job = {
        msjID,
        body: req.body.body,
        destination: req.body.destination,
        status: "PENDING"
    }
    // console.log(job, 'job in addqueue')
    messageQueue.add(job)
        .then(() => res.send(`Message sent with this id: ${job.msjID}`))
        .catch(() => res.send(`Problem sending message`))
}

module.exports = addQueue