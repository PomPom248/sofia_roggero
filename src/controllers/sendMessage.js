const http = require("http");
const saveMessage = require("../clients/saveMessage");
const getCredit = require("../clients/getCredit");

const messageQueues = require('../queues')
const uuidv1 = require('uuid/v1');

const random = n => Math.floor(Math.random() * Math.floor(n));

module.exports = function (req, res) {
  const body = JSON.stringify(req.body);

  let job = {
    destination: req.body.destination,
    body: req.body.body,
    msj_id: uuidv1()
  }
  messageQueues.add(job)
    .then(() => {
      res.status(200).json(`Your message was sent to the queue, id${job.msj_id}`)
    })
    .catch(() => {
      res.status(500).json("Your message wasn't sent to the queue")
    })
  messageQueues.process(function (job) {

    var query = getCredit();

    query.exec(function (err, credit) {
      if (err) return console.log(err);

      current_credit = credit[0].amount;

      if (current_credit > 0) {
        const postOptions = {
          // host: "exercise5_messageapp_1",
          // host: "messageapp",
          host: "localhost",
          port: 3000,
          path: "/message",
          method: "post",
          json: true,
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
          }
        };

        let postReq = http.request(postOptions);

        postReq.on("response", postRes => {
          if (postRes.statusCode === 200) {
            saveMessage(
              {
                ...req.body,
                status: "OK"
              },
              function (_result, error) {
                if (error) {
                  // res.statusCode = 500;
                  // res.end(error);
                } else {
                  // res.end(postRes.body);
                }
              }
            );
          } else {
            console.error("Error while sending message");

            saveMessage(
              {
                ...req.body,
                status: "ERROR"
              },
              () => {
                // res.statusCode = 500;
                // res.end("Internal server error: SERVICE ERROR");
              }
            );
          }
        });

        postReq.setTimeout(random(6000));

        postReq.on("timeout", () => {
          console.error("Timeout Exceeded!");
          postReq.abort();

          saveMessage(
            {
              ...req.body,
              status: "TIMEOUT"
            },
            () => {
              // res.statusCode = 500;
              // res.end("Internal server error: TIMEOUT");
            }
          );
        });

        postReq.on("error", () => { });

        postReq.write(body);
        postReq.end();
      } else {
        // res.statusCode = 500;
        // res.end("No credit error");
      }
    });
  })
};