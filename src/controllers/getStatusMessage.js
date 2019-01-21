const Message = require("../models/message");

module.exports = (req, res, next) => {
    let getMsgs = Message();
    getMsgs.find({ msjID: req.params.msjID }, (error, messagesFromDB) => {
        console.log(messagesFromDB)
        if (error) {
            next(error);
        } else {
            res.status(200).send(`Status: ${messagesFromDB[0].status}`);
        }
    });
}
