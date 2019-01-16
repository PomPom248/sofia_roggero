const Queue = require('bull');
const messageQueue = new Queue('message-queues', 'redis://127.0.0.1:6379');

module.exports = messageQueue 
// const uuidv1 = require('uuid/v1');

// const job = await messageQueue.add({
//     destination: "destination",
//     body: 'body',
//     uuidv1();

// })
// messageQueue.add()

// messageQueue.process(function (job, data) {

// })