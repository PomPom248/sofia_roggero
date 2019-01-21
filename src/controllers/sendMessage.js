const http = require("http");
const saveMessage = require("../clients/saveMessage");
const getCredit = require("../clients/getCredit")

// const random = n => Math.floor(Math.random() * Math.floor(n));

module.exports = function (req, res) {
  // console.log(body, 'body')
  console.log('en sendMessage')
  const body = JSON.stringify(req.body);
  console.log(body)
  console.log(req)
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
        console.log('en la respuesta del 200')
        if (postRes.statusCode === 200) {
          saveMessage(
            {
              ...req.body,
              status: "OK"
            },
            function (_result, error) {
              console.log('en el cb del 200')
              if (error) {
                res.statusCode = 500;
                res.end(error);
              } else {
                res.end(postRes.body);
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
              console.log('en el cb del 500')
              res.statusCode = 500;
              res.end("Internal server error: SERVICE ERROR");
            }
          );
        }
      });

      postReq.setTimeout((10000));

      postReq.on("timeout", () => {
        console.error("Timeout Exceeded!");
        postReq.abort();

        saveMessage(
          {
            ...req.body,
            status: "TIMEOUT"
          },
          () => {
            console.log('en el cb del timeout')
            res.statusCode = 500;
            res.end("Internal server error: TIMEOUT");
          }
        )
      });

      postReq.on("error", () => { });

      postReq.write(body);
      postReq.end();
    } else {
      res.statusCode = 500;
      res.end("No credit error");
    }
  });
}