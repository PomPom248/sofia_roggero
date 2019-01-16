require('dotenv').config();

const mongoose = require('mongoose')

function datebaseConnection(name, dbURL) {
    return {
        name,
        primary: false,
        connected: true,
        conn: mongoose.createConnection(dbURL, {
            useNewUrlParser: true,
            autoReconnect: true
        })
    }
}

function setupConnection(connection, backup) {
    connection.conn.on('disconnected', () => {
        console.log('db down', connection.name)
        connection.primary = false;
        if (connection.primary) {
            connection.primary = false;
            backup.primary = backup.connected
        }
    })
    connection.conn.on('reconnected', () => {
        console.log('db up', connection.name)
        connection.connected = true;
        connection.primary = !backup.isPrimary;
    })
}
const connections = [
    datebaseConnection('Primary', process.env.MONGO_LOCAL),
    datebaseConnection('Replica', process.env.MONGO_TWO)
]

connections[0].primary = true
setupConnection(connections[0], connections[1])
setupConnection(connections[1], connections[0])

module.exports = {
    get(key) {
        let conn;
        if (key == undefined || key == 'primary') {
            conn = connections.find(connection => connection.primary == true)
        } else if (key == 'replica') {
            conn = connections.find(connection => connection.primary == false)
        }
        if (conn) {
            console.log("Requested connection:", key);
            console.log("Found:", conn.name);
        }
        debugger;
        return conn.conn;
        console.log('hola')
    },
    isReplicaOn() {
        replicaOn = connections[0].connected && connections[1].connected;
        console.log(`Replica is ${replicaOn ? "ON" : "OFF"}`);
        return replicaOn;
    }
}














// function getConnection(db, connection1, connection2) {
//     if (connection1.on('connected', () => { })) {
//         db.db1.primary = true;
//         db.db1.connected = true;
//         db.db2.primary = false;
//     } else if (connection1.on("disconnected", () => { })) {
//         db.db1.primary = false;
//         db.db1.connected = false;
//         db.db2.primary = true;
//     } else if (connection1.on('reconnect', () => { })) {
//         db.db1.primary = false;
//         db.db1.connected = true;
//         // db.db2.primary = true;
//     } else if (connection2.on("disconnected", () => { })) {
//         db.db1.primary = true;
//         db.db2.connected = false;
//     } else if (connection2.on('reconnect', () => { })) {
//         db.db2.connected = true;
//     } else {
//         db.db1.primary = true;
//         db.db2.connected = true;
//     }
//     return db
// }
// function getPrimary(key) {
//     if (key == undefined || key == 'primary') {
//         console.log(db.db1.database)
//         return db.db1.database
//     } else if (key == 'replica') {

//     }
//     else {
//         // console.log(db.db2, 'secondary')
//         return db.db2.database
//     }
// }
// let db = {
//     db1: {
//         primary: true,
//         connected: true,
//         database: connection1
//     },
//     db2: {
//         primary: false,
//         connected: true,
//         database: connection2
//     }
// }
// getConnection(db, connection1, connection2)

