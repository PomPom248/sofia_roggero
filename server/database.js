require('dotenv').config();

const mongoose = require('mongoose')
let connection1 = datebaseConnection(process.env.MONGO_LOCAL)
let connection2 = datebaseConnection(process.env.MONGO_TWO)

function datebaseConnection(dbURL) {
    return mongoose.createConnection(dbURL, { useNewUrlParser: true })
}

function getConnection(db, connection1, connection2) {
    if (connection1.on('connected', () => { })) {
        db.db1.primary = true;
        db.db1.connected = true;
        db.db2.primary = false;
    } else if (connection1.on("disconnected", () => { })) {
        db.db1.primary = false;
        db.db1.connected = false;
        db.db2.primary = true;
    } else if (connection1.on('reconnect', () => { })) {
        db.db1.primary = false;
        db.db1.connected = true;
        // db.db2.primary = true;
    } else if (connection2.on("disconnected", () => { })) {
        db.db1.primary = true;
        db.db2.connected = false;
    } else if (connection2.on('reconnect', () => { })) {
        db.db2.connected = true;
    } else {
        db.db1.primary = true;
        db.db2.connected = true;
    }
    return db
}
function getPrimary(key) {
    if (key == undefined || key == 'primary') {
        console.log(db.db1.database)
        return db.db1.database
    } else if(key == 'replica'){

    }
    else {
        // console.log(db.db2, 'secondary')
        return db.db2.database
    }
}
let db = {
    db1: {
        primary: true,
        connected: true,
        database: connection1
    },
    db2: {
        primary: false,
        connected: true,
        database: connection2
    }
}
getConnection(db, connection1, connection2)

module.exports = {
    datebaseConnection,
    getConnection,
    getPrimary
}
