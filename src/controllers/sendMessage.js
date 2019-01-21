const http = require("http");
const saveMessage = require("../clients/saveMessage");
const getCredit = require("../clients/getCredit")

// const random = n => Math.floor(Math.random() * Math.floor(n));

module.exports = function (req, done) {

  const body = JSON.stringify(req.body);

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
          console.log(req)
          saveMessage(
            {
              ...req,
              status: "OK"
            },
            function (_result, error) {
              if (error) {
                done
              } else {
                done
              }
            }
          );
        } else {
          console.error("Error while sending message");
          console.log(req)
          saveMessage(
            {
              ...req,
              status: "ERROR"
            },
            done
          )
        }
      });

      postReq.setTimeout((10000));

      postReq.on("timeout", () => {
        console.error("Timeout Exceeded!");
        postReq.abort();
        console.log(req)
        saveMessage(
          {
            ...req,
            status: "TIMEOUT"
          },
          done
        )
      });

      postReq.on("error", () => { });

      postReq.write(body);
      postReq.end();
    } else {
      done
    }
  });
}