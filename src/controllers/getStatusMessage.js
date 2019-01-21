const express = require("express");
const messageRoute = express.Router();
const Message = require("../models/message");

messageRoute.get("/messages/:msjID/status", (req, res, next) => {
    let getMsgs = Message();
    getMsgs.find({ msjID: req.params.msjID }, (error, messagesFromDB) => {
        if (error) {
            next(error);
        } else {
            res.status(200).send(`Status: ${messagesFromDB[0].status}`);
        }
    });
});

module.exports = messageRoute;